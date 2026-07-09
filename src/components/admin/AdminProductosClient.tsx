'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import styles from './AdminProductosClient.module.css'

interface Producto {
  id: string
  nombre: string
  categorias: { nombre: string } | null
  producto_imagenes: { imagen_url: string }[]
}

export default function AdminProductosClient({ productos: productosIniciales }: { productos: Producto[] }) {
  const [productos, setProductos] = useState(productosIniciales)
  const router = useRouter()
  const supabase = createClient()

  async function handleEliminar(id: string) {
    const confirmar = window.confirm('¿Seguro que querés eliminar este producto?')
    if (!confirmar) return
    await supabase.from('productos').delete().eq('id', id)
    setProductos(productos.filter((p) => p.id !== id))
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.titulo}>Productos</h1>

      <div className={styles.grid}>
        {productos.map((producto) => {
          const imagen = producto.producto_imagenes?.[0]?.imagen_url ?? null

          return (
            <div key={producto.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                {imagen ? (
                  <Image
                    src={imagen}
                    alt={producto.nombre}
                    fill
                    className={styles.image}
                    sizes="20vw"
                  />
                ) : (
                  <div className={styles.placeholder} />
                )}
              </div>
              <p className={styles.nombre}>{producto.nombre}</p>
              <button
                className={styles.btnEditar}
                onClick={() => router.push(`/admin/productos/editar/${producto.id}`)}
              >
                Editar
              </button>
              <button
                className={styles.btnEliminar}
                onClick={() => handleEliminar(producto.id)}
              >
                Eliminar
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}