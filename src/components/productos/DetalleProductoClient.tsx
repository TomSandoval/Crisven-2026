'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './DetalleProductoClient.module.css'
import TarjetaProducto from './TarjetaProducto'
import { ProductoCompleto, ProductoEnGrilla } from '@/types'

interface Props {
  producto: ProductoCompleto
  similares: ProductoEnGrilla[]
}

export default function DetalleProductoClient({ producto, similares }: Props) {
  const imagenes = producto.producto_imagenes ?? []
  const [imagenActiva, setImagenActiva] = useState(0)

  const whatsappUrl = `https://wa.me/5491100000000?text=${encodeURIComponent(
    `Hola! Me interesa el producto: ${producto.nombre}`
  )}`


  return (
    <div className={styles.page}>

      {/* Sección principal */}
      <div className={styles.container}>

        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/" className={styles.breadcrumbLink}>Inicio</Link>
          <span className={styles.breadcrumbSep}>-</span>
          <Link href="/productos" className={styles.breadcrumbLink}>Productos</Link>
        </nav>

        <div className={styles.layout}>

          {/* Columna izquierda — info */}
          <div className={styles.info}>
            <h1 className={styles.nombre}>{producto.nombre}</h1>
            {producto.descripcion && (
              <p className={styles.descripcion}>{producto.descripcion}</p>
            )}
            <Link href={whatsappUrl} target="_blank" className={styles.ctaWhatsapp}>
              Consulta por Whatsapp
              <svg className={styles.whatsappSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="36" height="36">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </Link>
          </div>

          {/* Columna derecha — galería */}
          <div className={styles.galeria}>
            <div className={styles.imagenPrincipal}>
              {imagenes.length > 0 ? (
                <Image
                  src={imagenes[imagenActiva].imagen_url}
                  alt={producto.nombre}
                  fill
                  className={styles.imagen}
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority
                />
              ) : (
                <div className={styles.placeholder} />
              )}
            </div>

            {imagenes.length > 1 && (
              <div className={styles.thumbnails}>
                {imagenes.map((img, i) => (
                  <button
                    key={img.id}
                    className={`${styles.thumb} ${i === imagenActiva ? styles.thumbActivo : ''}`}
                    onClick={() => setImagenActiva(i)}
                  >
                    <Image
                      src={img.imagen_url}
                      alt={`${producto.nombre} imagen ${i + 1}`}
                      fill
                      className={styles.thumbImg}
                      sizes="100px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Productos similares */}
      {similares.length > 0 && (
        <div className={styles.similares}>
          <div className={styles.container}>
            <h2 className={styles.similaresTitulo}>Productos similares</h2>
            <div className={styles.similaresGrid}>
              {similares.map((p) => (
                <TarjetaProducto key={p.id} producto={p} />
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}