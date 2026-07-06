import Image from 'next/image'
import styles from './Marcas.module.css'
import Marquee from '@/components/ui/marquee'
import { LogoMarca } from '@/types'

interface MarcasProps {
  logos: LogoMarca[]
}

export default function Marcas({ logos }: MarcasProps) {
  if (logos.length === 0) return null

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>Marcas</p>
        <h2 className={styles.title}>Confían en nosotros</h2>
      </div>

      <Marquee pauseOnHover className={styles.marquee}>
        {logos.map((logo) => (
          <div key={logo.id} className={styles.logo}>
            <Image
              src={logo.imagen_url}
              alt={logo.nombre ?? 'Logo de marca cliente'}
              width={140}
              height={60}
              className={styles.logoImg}
            />
          </div>
        ))}
      </Marquee>
    </section>
  )
}