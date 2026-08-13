'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './ProductosDestacados.module.css'
import { ProductoEnGrilla } from '@/types'

interface ProductosDestacadosProps {
  productos: ProductoEnGrilla[]
}

const POR_PAGINA = 4

export default function ProductosDestacados({ productos }: ProductosDestacadosProps) {
  const [paginaActual, setPaginaActual] = useState(0)
  const startXRef = useRef<number | null>(null)
  const totalPaginas = Math.ceil(productos.length / POR_PAGINA)

  if (productos.length === 0) return null

  const productosPagina = productos.slice(
    paginaActual * POR_PAGINA,
    paginaActual * POR_PAGINA + POR_PAGINA
  )

  function siguiente() {
    setPaginaActual((p) => Math.min(p + 1, totalPaginas - 1))
  }

  function anterior() {
    setPaginaActual((p) => Math.max(p - 1, 0))
  }

  // Soporte para arrastre táctil
  function handleTouchStart(e: React.TouchEvent) {
    startXRef.current = e.touches[0].clientX
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (startXRef.current === null) return
    const diff = startXRef.current - e.changedTouches[0].clientX
    if (diff > 50) siguiente()
    if (diff < -50) anterior()
    startXRef.current = null
  }

  // Soporte para arrastre con mouse
  function handleMouseDown(e: React.MouseEvent) {
    startXRef.current = e.clientX
  }

  function handleMouseUp(e: React.MouseEvent) {
    if (startXRef.current === null) return
    const diff = startXRef.current - e.clientX
    if (diff > 50) siguiente()
    if (diff < -50) anterior()
    startXRef.current = null
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Productos</p>
          <h2 className={styles.titulo}>Conocé nuestros productos</h2>
        </div>
        {totalPaginas > 1 && (
          <div className={styles.flechas}>
            <button
              className={styles.flecha}
              onClick={anterior}
              disabled={paginaActual === 0}
              aria-label="Anterior"
            >
              ‹
            </button>
            <button
              className={styles.flecha}
              onClick={siguiente}
              disabled={paginaActual === totalPaginas - 1}
              aria-label="Siguiente"
            >
              ›
            </button>
          </div>
        )}
      </div>

      {/* Grid de productos */}
      <div
        className={styles.grid}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {productosPagina.map((producto) => {
          const imagen = producto.imagen_principal
          return (
            <Link key={producto.id} href={`/productos/${producto.id}`} className={styles.card}>
              <div className={styles.imageWrapper}>
                {imagen ? (
                  <Image
                    src={imagen.imagen_url}
                    alt={producto.nombre}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 50vw, 25vw"
                    draggable={false}
                  />
                ) : (
                  <div className={styles.placeholder} />
                )}
              </div>
              <p className={styles.nombre}>{producto.nombre}</p>
            </Link>
          )
        })}
      </div>

      {/* Puntos de navegación */}
      {totalPaginas > 1 && (
        <div className={styles.puntos}>
          {Array.from({ length: totalPaginas }, (_, i) => (
            <button
              key={i}
              className={`${styles.punto} ${i === paginaActual ? styles.puntoActivo : ''}`}
              onClick={() => setPaginaActual(i)}
              aria-label={`Página ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}