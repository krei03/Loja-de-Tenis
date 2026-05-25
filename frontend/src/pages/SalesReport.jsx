import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, Filter, Mail, MapPin, PackageCheck, Phone, ReceiptText } from 'lucide-react'
import { api } from '../services/api'

const money = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const monthFormatter = new Intl.DateTimeFormat('pt-BR', {
  month: 'long',
  year: 'numeric',
})

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
})

const orderStatuses = [
  { value: 'created', label: 'Criado' },
  { value: 'paid', label: 'Pago' },
  { value: 'separating', label: 'Em separacao' },
  { value: 'shipped', label: 'Enviado' },
  { value: 'delivered', label: 'Entregue' },
  { value: 'canceled', label: 'Cancelado' },
]

function getStoredAdminSession() {
  try {
    const stored = localStorage.getItem('vertex-admin-session')
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export function SalesReport() {
  const [orders, setOrders] = useState([])
  const [filters, setFilters] = useState({ status: 'all', q: '', from: '', to: '' })
  const [session] = useState(getStoredAdminSession)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!session?.token) {
      return
    }

    api
      .getOrders(session.token, filters)
      .then((result) => {
        setOrders(result)
        setMessage('')
      })
      .catch(() => setMessage('Entre novamente no admin para ver os pedidos.'))
  }, [filters, session?.token])

  const monthlyReports = useMemo(() => {
    const grouped = orders.reduce((reports, order) => {
      const createdAt = new Date(order.created_at || order.createdAt || 0)
      const monthKey = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, '0')}`
      const current = reports.get(monthKey) || {
        key: monthKey,
        label: monthFormatter.format(createdAt),
        orders: [],
        orderCount: 0,
        itemCount: 0,
        customerCount: new Set(),
        total: 0,
      }

      current.orders.push(order)
      current.orderCount += 1
      current.itemCount += (order.items || []).reduce((sum, item) => sum + Number(item.quantity || 0), 0)
      current.customerCount.add(order.customer?.email || order.customer?.phone || order.customer?.name || order.id)
      current.total += Number(order.total || 0)

      reports.set(monthKey, current)
      return reports
    }, new Map())

    return [...grouped.values()]
      .map((report) => ({
        ...report,
        customerTotal: report.customerCount.size,
      }))
      .sort((first, second) => second.key.localeCompare(first.key))
  }, [orders])

  const totals = useMemo(
    () => ({
      orders: orders.length,
      items: orders.reduce(
        (sum, order) => sum + (order.items || []).reduce((itemSum, item) => itemSum + Number(item.quantity || 0), 0),
        0,
      ),
      sales: orders.reduce((sum, order) => sum + Number(order.total || 0), 0),
    }),
    [orders],
  )

  const updateFilter = (event) => {
    const { name, value } = event.target
    setFilters((current) => ({ ...current, [name]: value }))
  }

  const updateStatus = async (orderId, status) => {
    if (!session?.token) {
      return
    }

    const updatedOrder = await api.updateOrderStatus(orderId, status, session.token)
    setOrders((current) => current.map((order) => (order.id === orderId ? updatedOrder : order)))
    setMessage('Status do pedido atualizado.')
  }

  if (!session?.token) {
    return (
      <main className="sales-report-page">
        <Link className="back-link" to="/admin">
          <ChevronLeft size={18} />
          Voltar ao admin
        </Link>
        <div className="empty-cart">
          <ReceiptText size={40} />
          <p>Faca login no painel admin para acessar o historico de pedidos.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="sales-report-page">
      <Link className="back-link" to="/admin">
        <ChevronLeft size={18} />
        Voltar ao admin
      </Link>

      <div className="section-heading">
        <p>Relatorio de vendas</p>
        <h1>Detalhes para envio e acompanhamento</h1>
      </div>

      <section className="sales-summary">
        <article>
          <ReceiptText size={24} />
          <span>Pedidos</span>
          <strong>{totals.orders}</strong>
        </article>
        <article>
          <PackageCheck size={24} />
          <span>Itens vendidos</span>
          <strong>{totals.items}</strong>
        </article>
        <article>
          <ReceiptText size={24} />
          <span>Total vendido</span>
          <strong>{money.format(totals.sales)}</strong>
        </article>
      </section>

      <section className="sales-filters" aria-label="Filtros de pedidos">
        <label>
          <Filter size={16} />
          <select name="status" value={filters.status} onChange={updateFilter}>
            <option value="all">Todos os status</option>
            {orderStatuses.map((status) => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
        </label>
        <input name="q" placeholder="Buscar cliente, email, telefone ou pedido" value={filters.q} onChange={updateFilter} />
        <input name="from" type="date" value={filters.from} onChange={updateFilter} />
        <input name="to" type="date" value={filters.to} onChange={updateFilter} />
      </section>

      {message && <p className="admin-message">{message}</p>}

      <section className="monthly-report-list">
        {monthlyReports.map((report) => (
          <article className="monthly-report" key={report.key}>
            <div className="monthly-report-heading">
              <div>
                <span>Registro mensal</span>
                <h2>{report.label}</h2>
              </div>
              <strong>{money.format(report.total)}</strong>
            </div>
            <div className="monthly-report-metrics">
              <span>{report.orderCount} pedido(s)</span>
              <span>{report.itemCount} item(ns)</span>
              <span>{report.customerTotal} cliente(s)</span>
            </div>
          </article>
        ))}
      </section>

      <section className="sales-order-list">
        {orders.map((order) => (
          <article className="sales-order-card" key={order.id}>
            <div className="sales-order-header">
              <div>
                <span>Pedido</span>
                <h2>{order.id}</h2>
              </div>
              <strong>{money.format(Number(order.total || 0))}</strong>
            </div>

            <div className="sales-customer-grid">
              <span><ReceiptText size={16} /> {order.customer?.name || 'Cliente sem nome'}</span>
              <span><Mail size={16} /> {order.customer?.email || 'Email nao informado'}</span>
              <span><Phone size={16} /> {order.customer?.phone || 'Telefone nao informado'}</span>
              <span><MapPin size={16} /> {[order.customer?.cep, order.customer?.address].filter(Boolean).join(' / ') || 'Endereco nao informado'}</span>
            </div>

            <div className="sales-items-table">
              {(order.items || []).map((item) => (
                <div className="sales-item-row" key={`${order.id}-${item.id}-${item.selectedSize || 'sem-tamanho'}`}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>
                      {[item.brand, item.color, item.selectedSize ? `Tam. ${item.selectedSize}` : 'Sem tamanho']
                        .filter(Boolean)
                        .join(' / ')}
                    </p>
                  </div>
                  <span>{Number(item.quantity || 0)}x</span>
                  <span>{money.format(Number(item.price || 0))}</span>
                  <strong>{money.format(Number(item.total || item.price * item.quantity || 0))}</strong>
                </div>
              ))}
            </div>

            <div className="sales-order-footer">
              <label className="sales-status-select">
                Status
                <select
                  value={order.status || 'created'}
                  onChange={(event) => updateStatus(order.id, event.target.value)}
                >
                  {orderStatuses.map((status) => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
              </label>
              <span>Data: {formatOrderDate(order.created_at || order.createdAt)}</span>
            </div>
          </article>
        ))}

        {orders.length === 0 && (
          <div className="empty-cart">
            <ReceiptText size={40} />
            <p>Nenhuma venda registrada ainda.</p>
          </div>
        )}
      </section>
    </main>
  )
}

function formatOrderDate(value) {
  if (!value) {
    return 'Data nao informada'
  }

  return dateFormatter.format(new Date(value))
}
