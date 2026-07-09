'use client'

import { useState } from 'react'
import styles from './ProductosClient.module.css'
import FiltroCategoria from './FiltroCategoria'
import TarjetaProducto from './TarjetaProducto'
import { Categoria, ProductoEnGrilla, Subcategoria } from '@/types'

const POR_PAGINA = 12

interface ProductosClientProps {
  productos: ProductoEnGrilla[]
  categorias: Categoria[]
  subcategorias: Subcategoria[]
}

export default function ProductosClient({ categorias, subcategorias, productos }: ProductosClientProps) {
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null)
  const [subcategoriaActiva, setSubcategoriaActiva] = useState<string | null>(null)
  const [pagina, setPagina] = useState(1)

  const productosFiltrados = productos.filter((p) => {
    if (subcategoriaActiva) return p.subcategoria_id === subcategoriaActiva
    if (categoriaActiva) return p.categoria_id === categoriaActiva
    return true
  })

  const totalPaginas = Math.ceil(productosFiltrados.length / POR_PAGINA)
  const inicio = (pagina - 1) * POR_PAGINA
  const productosPagina = productosFiltrados.slice(inicio, inicio + POR_PAGINA)

  function cambiarCategoria(id: string | null) {
    setCategoriaActiva(id)
    setSubcategoriaActiva(null)
    setPagina(1)
  }

  function cambiarSubcategoria(id: string | null) {
    setSubcategoriaActiva(id)
    setPagina(1)
  }

  return (
    <div className={styles.page}>
       <aside className={styles.sidebar}>
        <FiltroCategoria
          categorias={categorias}
          subcategorias={subcategorias}
          categoriaActiva={categoriaActiva}
          subcategoriaActiva={subcategoriaActiva}
          onCategoriaChange={cambiarCategoria}
          onSubcategoriaChange={cambiarSubcategoria}
        />
      </aside>

      <main className={styles.main}>
        {productosPagina.length === 0 ? (
          <div className={styles.empty}>
            <p>No hay productos en esta categoría.</p>
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {productosPagina.map((producto) => (
                <TarjetaProducto key={producto.id} producto={producto} />
              ))}
            </div>

            {totalPaginas > 1 && (
              <div className={styles.paginado}>
                <button
                  className={styles.paginaBtn}
                  onClick={() => setPagina((p) => p - 1)}
                  disabled={pagina === 1}
                >
                  ←
                </button>

                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    className={`${styles.paginaBtn} ${n === pagina ? styles.paginaBtnActivo : ''}`}
                    onClick={() => setPagina(n)}
                  >
                    {n}
                  </button>
                ))}

                <button
                  className={styles.paginaBtn}
                  onClick={() => setPagina((p) => p + 1)}
                  disabled={pagina === totalPaginas}
                >
                  →
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}