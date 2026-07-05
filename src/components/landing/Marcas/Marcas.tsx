import Image from 'next/image'
import styles from './Marcas.module.css'
import { LogoMarca } from '@/types'

interface MarcasProps {
  logos: LogoMarca[]
}

export default function Marcas({ logos }: MarcasProps) {
  // Si no hay logos aún, mostramos placeholders
  const items = logos.length > 0 ? logos : []

  if (items.length === 0) return null

  // Duplicamos para el efecto de scroll infinito
  const doubled = [...items, ...items]

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>Marcas</p>
        <h2 className={styles.title}>Confían en nosotros</h2>
      </div>

      <div className={styles.track}>
        <div className={styles.inner}>
          {doubled.map((logo, i) => (
            <div key={`${logo.id}-${i}`} className={styles.logo}>
              <Image
                src={logo.imagen_url}
                alt={logo.nombre ?? 'Logo de marca cliente'}
                width={140}
                height={60}
                className={styles.logoImg}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}