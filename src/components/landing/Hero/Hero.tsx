import Link from 'next/link'
import Image from 'next/image'
import styles from './Hero.module.css'

interface HeroProps {
  imagenUrl: string | null
  titulo: string
}

export default function Hero({ imagenUrl, titulo }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.bgWrapper}>
        {imagenUrl ? (
          <Image
            src={imagenUrl}
            alt="Ventanas Crisven instaladas en motorhome"
            fill
            priority
            className={styles.bgImage}
          />
        ) : (
          <div className={styles.bgPlaceholder} />
        )}
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>{titulo}</h1>
        <Link href="/productos" className={styles.cta}>
          Conoce nuestros productos
        </Link>
      </div>
    </section>
  )
}