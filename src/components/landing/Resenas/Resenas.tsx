import Marquee from '@/components/ui/marquee'
import styles from './Resenas.module.css'
import { Resena } from '@/types'

interface ResenasProps {
  resenas: Resena[]
}

function Estrellas({ cantidad }: { cantidad: number }) {
  return (
    <div className={styles.estrellas}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < cantidad ? styles.estrella : styles.estrellaVacia}>
          ★
        </span>
      ))}
    </div>
  )
}

export default function Resenas({ resenas }: ResenasProps) {
  if (resenas.length === 0) return null

  return (
    <section className={styles.section}>
      <div className={styles.scrollWrapper}>
        <Marquee pauseOnHover speed={30} reverse className={styles.track}>
          {resenas.map((resena) => (
            <div key={resena.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <p className={styles.nombre}>{resena.nombre}</p>
                <Estrellas cantidad={resena.estrellas} />
              </div>
              <p className={styles.texto}>{resena.texto}</p>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  )
}