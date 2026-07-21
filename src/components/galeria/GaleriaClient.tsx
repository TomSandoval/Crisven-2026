'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './GaleriaClient.module.css'
import { GaleriaItem } from '@/types'

interface GaleriaClientProps {
  fotos: GaleriaItem[]
  titulo: string
  descripcion: string
}

export default function GaleriaClient({ fotos, titulo, descripcion }: GaleriaClientProps) {
  const [fotoActiva, setFotoActiva] = useState<GaleriaItem | null>(null)
  console.log(fotos)

  function handleAnterior() {
    if (!fotoActiva) return
    const index = fotos.indexOf(fotoActiva)
    setFotoActiva(fotos[(index - 1 + fotos.length) % fotos.length])
  }

  function handleSiguiente() {
    if (!fotoActiva) return
    const index = fotos.indexOf(fotoActiva)
    setFotoActiva(fotos[(index + 1) % fotos.length])
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowLeft') handleAnterior()
    if (e.key === 'ArrowRight') handleSiguiente()
    if (e.key === 'Escape') setFotoActiva(null)
  }

  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerTexto}>
          <h1 className={styles.titulo}>{titulo}</h1>
          <p className={styles.descripcion}>{descripcion}</p>
        </div>
      </div>

      {/* Masonry grid */}
      {fotos.length === 0 ? (
        <div className={styles.empty}>
          <p>Próximamente...</p>
        </div>
      ) : (
        <div className={styles.masonry}>
          {fotos.map((foto) => (
            <div
              key={foto.id}
              className={styles.item}
              onClick={() => setFotoActiva(foto)}
            >
              <Image
                src={foto.imagen_url}
                alt={foto.descripcion ?? 'Instalación Crisven'}
                width={600}
                height={400}
                className={styles.imagen}
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {foto.descripcion && (
                <div className={styles.overlay}>
                  <p className={styles.overlayTexto}>{foto.descripcion}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {fotoActiva && (
        <div
          className={styles.lightbox}
          onClick={() => setFotoActiva(null)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
        >
          <button
            className={styles.lightboxCerrar}
            onClick={() => setFotoActiva(null)}
            aria-label="Cerrar"
          >
            ✕
          </button>

          <button
            className={`${styles.lightboxNav} ${styles.lightboxAnterior}`}
            onClick={(e) => { e.stopPropagation(); handleAnterior() }}
            aria-label="Anterior"
          >
            ‹
          </button>

          <div
            className={styles.lightboxImagen}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={fotoActiva.imagen_url}
              alt={fotoActiva.descripcion ?? 'Instalación Crisven'}
              fill
              className={styles.lightboxImg}
              sizes="90vw"
              priority
            />
            {fotoActiva.descripcion && (
              <p className={styles.lightboxDescripcion}>{fotoActiva.descripcion}</p>
            )}
          </div>

          <button
            className={`${styles.lightboxNav} ${styles.lightboxSiguiente}`}
            onClick={(e) => { e.stopPropagation(); handleSiguiente() }}
            aria-label="Siguiente"
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}