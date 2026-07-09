import Link from 'next/link'
import styles from './Footer.module.css'

function WhatsappIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="22" height="22" viewBox="0 0 32 32" id="Camada_1" version="1.1">
      <g>
        <path d="M22.3,8.4c-0.8,0-1.4,0.6-1.4,1.4c0,0.8,0.6,1.4,1.4,1.4c0.8,0,1.4-0.6,1.4-1.4C23.7,9,23.1,8.4,22.3,8.4z" />
        <path d="M16,10.2c-3.3,0-5.9,2.7-5.9,5.9s2.7,5.9,5.9,5.9s5.9-2.7,5.9-5.9S19.3,10.2,16,10.2z M16,19.9c-2.1,0-3.8-1.7-3.8-3.8   c0-2.1,1.7-3.8,3.8-3.8c2.1,0,3.8,1.7,3.8,3.8C19.8,18.2,18.1,19.9,16,19.9z" />
        <path d="M20.8,4h-9.5C7.2,4,4,7.2,4,11.2v9.5c0,4,3.2,7.2,7.2,7.2h9.5c4,0,7.2-3.2,7.2-7.2v-9.5C28,7.2,24.8,4,20.8,4z M25.7,20.8   c0,2.7-2.2,5-5,5h-9.5c-2.7,0-5-2.2-5-5v-9.5c0-2.7,2.2-5,5-5h9.5c2.7,0,5,2.2,5,5V20.8z" />
      </g>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>

          <div className={styles.brand}>
            <div>
              <p className={styles.logoName}>Crisven</p>
              <p className={styles.logoSub}>Windows creation</p>
            </div>
            <div className={styles.socials}>
              <Link href="https://www.instagram.com/crisvenventanas/" target="_blank" aria-label="Instagram" className={styles.socialLink}>
                <InstagramIcon />
              </Link>
              <Link href="https://wa.me/5491151314617" target="_blank" aria-label="WhatsApp" className={styles.socialLink}>
                <WhatsappIcon />
              </Link>
            </div>
          </div>

          <div className={styles.col}>
            <p className={styles.colTitle}>Sobre nosotros</p>
            <Link href="/#sobre-nosotros" className={styles.colLink}>Nuestra empresa</Link>
            <Link href="/productos" className={styles.colLink}>Productos</Link>
            <Link href="/galeria" className={styles.colLink}>Clientes</Link>
          </div>

          <div className={styles.col}>
            <p className={styles.colTitle}>Contacto</p>
            <a href="tel:1151314617" className={styles.colLink}>1151314617</a>
            <a href="mailto:info@crisven.com" className={styles.colLink}>info@crisven.com</a>
            <p className={styles.colText}>Lago Alumine 355 · Lomas de Zamora (1832)</p>
          </div>

          <div className={styles.col}>
            <p className={styles.colTitle}>Soporte</p>
            <Link href="/#faq" className={styles.colLink}>Preguntas frecuentes</Link>
          </div>

        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Crisven. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}