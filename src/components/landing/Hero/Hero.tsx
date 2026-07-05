import Link from 'next/link'
import Image from 'next/image'
import styles from './Hero.module.css'
import BackgroundImage from '../../../../public/assets/background-home.jpg'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bgWrapper}>
        <Image
          src={BackgroundImage}
          alt="Ventanas Crisven instaladas en motorhome"
          fill
          priority
          className={styles.bgImage}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>
          Somos Crisven<br />
          Fábrica de ventanas para vehículos recreativos y carrocerías
        </h1>
        <Link href="/productos" className={styles.cta}>
          Conocé nuestros productos
        </Link>
      </div>
    </section>
  )
}