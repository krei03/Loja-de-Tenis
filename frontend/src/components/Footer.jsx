import { Camera, MessageCircle, Music2, Send, Smartphone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <section>
          <h2>Entre em contato</h2>
          <a href="mailto:sac@vertex.store">sac@vertex.store</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram: @vertex</a>
          <div className="app-badges">
            <span><Smartphone size={16} /> Google Play</span>
            <span><Smartphone size={16} /> App Store</span>
          </div>
        </section>

        <section>
          <h2>Ajuda</h2>
          <a href="/#launches">Quero vender</a>
          <a href="/#categories">Como a Vertex funciona?</a>
          <a href="/cart">Atendimento e suporte</a>
          <a href="/checkout">Trocas e devolucoes</a>
        </section>

        <section>
          <h2>Sobre a Vertex</h2>
          <a href="/#launches">Os produtos sao originais?</a>
          <a href="/#categories">Sobre nos</a>
          <a href="/#launches">Cupons</a>
          <span className="rating-badge">BOM ReclameAQUI</span>
        </section>

        <section>
          <h2>Social</h2>
          <div className="social-row">
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer"><Camera size={22} /></a>
            <a href="https://x.com" aria-label="X" target="_blank" rel="noreferrer"><Send size={22} /></a>
            <a href="https://tiktok.com" aria-label="TikTok" target="_blank" rel="noreferrer"><Music2 size={22} /></a>
            <a href="https://wa.me" aria-label="WhatsApp" target="_blank" rel="noreferrer"><MessageCircle size={22} /></a>
          </div>
          <h2>Formas de pagamento</h2>
          <div className="payment-row">
            <span>Master</span>
            <span>Visa</span>
            <span>Elo</span>
            <span>Pix</span>
          </div>
        </section>
      </div>

      <div className="footer-bottom">
        <span>Portugues - BR</span>
        <strong>VERTEX</strong>
        <span>2026 (c) Vertex Tecnologia e Servicos SA</span>
      </div>
    </footer>
  )
}
