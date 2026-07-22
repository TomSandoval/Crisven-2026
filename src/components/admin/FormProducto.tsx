'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AdminPanelLayout from './AdminPanelLayout'
import styles from './FormProducto.module.css'
import { Categoria, Subcategoria, ProductoCompleto } from '@/types'
import { comprimirImagen } from '@/lib/comprimirImagen'

interface Props {
  categorias: Categoria[]
  subcategorias: Subcategoria[]
  producto?: ProductoCompleto
}

export default function FormProducto({ categorias, subcategorias, producto }: Props) {
  const router = useRouter()
  const supabase = createClient()
  const inputImagenRef = useRef<HTMLInputElement>(null)

  const [nombre, setNombre] = useState(producto?.nombre ?? '')
  const [categoriaId, setCategoriaId] = useState(producto?.categoria_id ?? '')
  // Agregá este estado arriba junto a los otros
  const [nuevaCategoria, setNuevaCategoria] = useState('')
  const [creandoCategoria, setCreandoCategoria] = useState(false)
  const [nuevaSubcategoria, setNuevaSubcategoria] = useState('')
  const [subcategoriaId, setSubcategoriaId] = useState(producto?.subcategoria_id ?? '')
  const [descripcion, setDescripcion] = useState(producto?.descripcion ?? '')
  const [imagenes, setImagenes] = useState<{ id?: string; url: string; es_principal: boolean }[]>(
    producto?.producto_imagenes.map((img) => ({ id: img.id, url: img.imagen_url, es_principal: img.es_principal })) ?? []
  )
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const subcategoriasFiltradas = subcategorias.filter((s) => s.categoria_id === categoriaId)

  async function subirImagen(file: File): Promise<string | null> {
    // Comprimimos antes de subir
    const fileComprimido = await comprimirImagen(file)

    const ext = 'webp'
    const nombre = `${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('productos').upload(nombre, fileComprimido)
    if (error) return null
    const { data } = supabase.storage.from('productos').getPublicUrl(nombre)
    return data.publicUrl
  }

  async function handleAgregarImagen(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    for (const file of files) {
      const url = await subirImagen(file)
      if (url) {
        setImagenes((prev) => [...prev, { url, es_principal: prev.length === 0 }])
      }
    }
  }

  function handleEliminarImagen(index: number) {
    setImagenes((prev) => {
      const nuevas = prev.filter((_, i) => i !== index)
      if (nuevas.length > 0 && !nuevas.some((img) => img.es_principal)) {
        nuevas[0].es_principal = true
      }
      return nuevas
    })
  }

  function handleSetPrincipal(index: number) {
    setImagenes((prev) => prev.map((img, i) => ({ ...img, es_principal: i === index })))
  }

  async function handleGuardar() {
    if (!nombre.trim()) { setError('El título es obligatorio.'); return }
    if (imagenes.length === 0) { setError('Agregá al menos una foto.'); return }

    setGuardando(true)
    setError(null)

    // Si eligió crear categoría nueva, la creamos primero
    let categoriaFinal = categoriaId
    if (categoriaId === '__nueva__') {
      if (!nuevaCategoria.trim()) {
        setError('Escribí el nombre de la nueva categoría.')
        setGuardando(false)
        return
      }
      const { data: catCreada } = await supabase
        .from('categorias')
        .insert({ nombre: nuevaCategoria.trim(), orden: categorias.length })
        .select()
        .single()

      if (!catCreada) {
        setError('Error al crear la categoría.')
        setGuardando(false)
        return
      }
      categoriaFinal = catCreada.id
    }

    // Si eligió crear subcategoría nueva, la creamos
    let subcategoriaFinal = subcategoriaId  // ← declarada acá arriba

    if (subcategoriaId === '__nueva__') {
      if (!nuevaSubcategoria.trim()) {
        setError('Escribí el nombre de la nueva subcategoría.')
        setGuardando(false)
        return
      }
      const { data: subCreada, error: subError } = await supabase
        .from('subcategorias')
        .insert({
          nombre: nuevaSubcategoria.trim(),
          categoria_id: categoriaFinal,
          orden: subcategoriasFiltradas.length,
        })
        .select()
        .single()

      console.log('subCreada:', subCreada)
      console.log('subError:', subError)

      if (!subCreada) {
        setError('Error al crear la subcategoría.')
        setGuardando(false)
        return
      }
      subcategoriaFinal = subCreada.id  // ← se actualiza acá
    }

    // El resto del guardado igual que antes pero usando categoriaFinal
    let productoId = producto?.id

    if (producto) {
      await supabase.from('productos').update({
        nombre,
        categoria_id: categoriaFinal || null,
        subcategoria_id: subcategoriaFinal || null,
        descripcion: descripcion || null,
      }).eq('id', producto.id)

      await supabase.from('producto_imagenes').delete().eq('producto_id', producto.id)
    } else {
      const { data } = await supabase.from('productos').insert({
        nombre,
        categoria_id: categoriaFinal || null,
        subcategoria_id: subcategoriaFinal || null,
        descripcion: descripcion || null,
        orden: 0,
      }).select().single()
      productoId = data?.id
    }

    if (productoId) {
      await supabase.from('producto_imagenes').insert(
        imagenes.map((img, i) => ({
          producto_id: productoId,
          imagen_url: img.url,
          es_principal: img.es_principal,
          orden: i,
        }))
      )
    }

    setGuardando(false)
    router.push('/admin/productos')
    router.refresh()
  }

  return (
    <AdminPanelLayout>
      <div className={styles.page}>
        <h1 className={styles.titulo}>{producto ? 'Editar producto' : 'Agregar producto'}</h1>

        <div className={styles.formGrid}>
          <input
            type="text"
            placeholder="Titulo producto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={styles.input}
          />

          <div className={styles.categoriaWrapper}>
            <select
              value={categoriaId}
              onChange={(e) => {
                setCategoriaId(e.target.value)
                setSubcategoriaId('')
                setNuevaCategoria('')
              }}
              className={styles.input}
            >
              <option value="">Seleccionar categoría</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
              <option value="__nueva__">+ Crear nueva categoría</option>
            </select>

            {categoriaId === '__nueva__' && (
              <input
                type="text"
                placeholder="Nombre de la nueva categoría"
                value={nuevaCategoria}
                onChange={(e) => setNuevaCategoria(e.target.value)}
                className={styles.input}
              />
            )}
          </div>

          {/* Si la categoría es nueva, input directo. Si es existente, select + opción nueva */}
          {categoriaId === '__nueva__' ? (
            <input
              type="text"
              placeholder="Subcategoría (opcional)"
              value={nuevaSubcategoria}
              onChange={(e) => {
                setNuevaSubcategoria(e.target.value)
                setSubcategoriaId(e.target.value ? '__nueva__' : '')
              }}
              className={styles.input}
            />
          ) : (
            <div className={styles.categoriaWrapper}>
              <select
                value={subcategoriaId}
                onChange={(e) => {
                  setSubcategoriaId(e.target.value)
                  setNuevaSubcategoria('')
                }}
                className={styles.input}
                disabled={!categoriaId}
              >
                <option value="">Seleccionar subcategoría</option>
                {subcategoriasFiltradas.map((s) => (
                  <option key={s.id} value={s.id}>{s.nombre}</option>
                ))}
                <option value="__nueva__">+ Crear nueva subcategoría</option>
              </select>

              {subcategoriaId === '__nueva__' && (
                <input
                  type="text"
                  placeholder="Nombre de la nueva subcategoría"
                  value={nuevaSubcategoria}
                  onChange={(e) => setNuevaSubcategoria(e.target.value)}
                  className={styles.input}
                />
              )}
            </div>
          )}

          <input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className={styles.input}
          />
        </div>

        <p className={styles.fotosLabel}>Fotos</p>
        <div className={styles.fotosGrid}>
          {imagenes.map((img, i) => (
            <div
              key={i}
              className={`${styles.fotoItem} ${img.es_principal ? styles.fotoPrincipal : ''}`}
              onClick={() => handleSetPrincipal(i)}
              title={img.es_principal ? 'Imagen principal' : 'Clic para marcar como principal'}
            >
              <Image src={img.url} alt={`Foto ${i + 1}`} fill className={styles.fotoImg} sizes="150px" />
              <button
                className={styles.fotoEliminar}
                onClick={(e) => { e.stopPropagation(); handleEliminarImagen(i) }}
              >
                ✕
              </button>
              {img.es_principal && <span className={styles.badgePrincipal}>Principal</span>}
            </div>
          ))}
        </div>

        <input
          ref={inputImagenRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleAgregarImagen}
          className={styles.inputHidden}
        />
        <button className={styles.btnAgregar} onClick={() => inputImagenRef.current?.click()}>+</button>

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.btnGuardar} onClick={handleGuardar} disabled={guardando}>
          {guardando ? 'Guardando...' : 'Guardar producto'}
        </button>
      </div>
    </AdminPanelLayout>
  )
}