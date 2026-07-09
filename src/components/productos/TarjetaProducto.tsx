import Link from 'next/link'
import Image from 'next/image'
import styles from './TarjetaProducto.module.css'
import { ProductoEnGrilla } from '@/types'

interface TarjetaProductoProps {
  producto: ProductoEnGrilla
}

export default function TarjetaProducto({ producto }: TarjetaProductoProps) {
  const imagen = producto.imagen_principal

  return (
    <Link href={`/productos/${producto.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {imagen ? (
          <Image
            src={imagen.imagen_url}
            alt={producto.nombre}
            fill
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder} />
        )}
      </div>
      <p className={styles.nombre}>{producto.nombre}</p>
    </Link>
  )
}