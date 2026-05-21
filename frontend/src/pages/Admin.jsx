import { PackagePlus, Tags } from 'lucide-react'

export function Admin({ products }) {
  const totalInventory = products.length
  const totalValue = products.reduce((sum, product) => sum + product.price, 0)

  return (
    <main className="admin-page">
      <div className="section-heading">
        <p>Painel admin</p>
        <h1>Controle rapido dos drops</h1>
      </div>

      <section className="admin-metrics">
        <article>
          <PackagePlus size={24} />
          <span>Produtos ativos</span>
          <strong>{totalInventory}</strong>
        </article>
        <article>
          <Tags size={24} />
          <span>Valor de vitrine</span>
          <strong>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(totalValue)}
          </strong>
        </article>
      </section>

      <section className="admin-table">
        {products.map((product) => (
          <article key={product.id}>
            <img src={product.image} alt={product.name} />
            <div>
              <h3>{product.name}</h3>
              <p>{product.category}</p>
            </div>
            <span>{product.badge}</span>
          </article>
        ))}
      </section>
    </main>
  )
}
