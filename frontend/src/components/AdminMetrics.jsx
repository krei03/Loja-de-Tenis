import { Link } from 'react-router-dom'
import { PackagePlus, ReceiptText, Tags } from 'lucide-react'

export function AdminMetrics({ brandCount, formatMoney, totalInventory, totalSales, totalValue }) {
  return (
    <section className="admin-metrics">
      <article>
        <PackagePlus size={24} />
        <span>Produtos ativos</span>
        <strong>{totalInventory}</strong>
      </article>
      <article>
        <Tags size={24} />
        <span>Valor de vitrine</span>
        <strong>{formatMoney(totalValue)}</strong>
      </article>
      <article>
        <Tags size={24} />
        <span>Marcas</span>
        <strong>{brandCount}</strong>
      </article>
      <Link className="admin-metric-link" to="/admin/sales">
        <ReceiptText size={24} />
        <span>Total de vendas</span>
        <strong>{formatMoney(totalSales)}</strong>
      </Link>
    </section>
  )
}
