import Image from 'next/image'
import Link from 'next/link'
import styles from './SobreNosotros.module.css'

export default function SobreNosotros() {
  return (
    <section id="sobre-nosotros" className={styles.section}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>Sobre nosotros</p>
        <h2 className={styles.title}>Calidad sobre todo</h2>
        <p className={styles.text}>
          En Crisven, buscamos crecer junto a nuestros clientes, ofreciendo la mejor calidad al
          mejor precio. Contamos con un amplio stock y diseñamos ventanas especiales según sus
          necesidades.
        </p>
      </div>

      <div className={styles.imageWrapper}>
        <Image
          src="/images/sobre-nosotros.jpg"
          alt="Técnico instalando ventana Crisven en motorhome"
          fill
          className={styles.image}
        />
        <div className={styles.imageOverlay} />
        <Link href="/#contacto" className={styles.imageLink}>
          Conocé más
        </Link>
      </div>
    </section>
  )
}