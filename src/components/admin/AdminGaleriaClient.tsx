'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { comprimirImagen } from '@/lib/comprimirImagen'
import styles from './AdminGaleriaClient.module.css'
import { GaleriaItem } from '@/types'

export default function AdminGaleriaClient({ fotos: fotosIniciales }: { fotos: GaleriaItem[] }) {
  const [fotos, setFotos] = useState<GaleriaItem[]>(fotosIniciales)
  const [subiendo, setSubiendo] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  async function handleSubir(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (files.length === 0) return
    setSubiendo(true)

    for (const file of files) {
      const comprimida = await comprimirImagen(file, 1400, 0.85)
      const nombre = `${Date.now()}-${Math.random().toString(36).slice(2)}.webp`
      const { error } = await supabase.storage.from('galeria').upload(nombre, comprimida)
      if (error) continue

      const { data } = supabase.storage.from('galeria').getPublicUrl(nombre)
      const { data: foto } = await supabase
        .from('galeria')
        .insert({ imagen_url: data.publicUrl, orden: fotos.length })
        .select()
        .single()

      if (foto) setFotos((prev) => [...prev, foto])
    }

    setSubiendo(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  async function handleGuardarDescripciones() {
    setGuardando(true)
    setMensaje(null)

    for (const foto of fotos) {
      await supabase
        .from('galeria')
        .update({ descripcion: foto.descripcion })
        .eq('id', foto.id)
    }

    setGuardando(false)
    setMensaje('Descripciones guardadas.')
    setTimeout(() => setMensaje(null), 3000)
  }

  async function handleEliminar(id: string) {
    const confirmar = window.confirm('¿Eliminás esta foto de la galería?')
    if (!confirmar) return
    await supabase.from('galeria').delete().eq('id', id)
    setFotos(fotos.filter((f) => f.id !== id))
  }

  async function handleDescripcion(id: string, valor: string) {
    setFotos(fotos.map((f) => f.id === id ? { ...f, descripcion: valor } : f))
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.titulo}>Galería</h1>
        <button
          className={styles.btnAgregar}
          onClick={() => inputRef.current?.click()}
          disabled={subiendo}
        >
          {subiendo ? 'Subiendo...' : '+ Agregar fotos'}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleSubir}
        style={{ display: 'none' }}
      />

      {fotos.length === 0 ? (
        <div className={styles.empty}>
          <p>No hay fotos en la galería todavía.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {fotos.map((foto) => (
            <div key={foto.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={foto.imagen_url}
                  alt={foto.descripcion ?? 'Foto galería'}
                  fill
                  className={styles.imagen}
                  sizes="25vw"
                />
                <button
                  className={styles.btnEliminar}
                  onClick={() => handleEliminar(foto.id)}
                  aria-label="Eliminar foto"
                >
                  ✕
                </button>
              </div>
              <input
                type="text"
                placeholder="Descripción (opcional)"
                value={foto.descripcion ?? ''}
                onChange={(e) => handleDescripcion(foto.id, e.target.value)}
                className={styles.inputDescripcion}
              />
            </div>
          ))}
        </div>

      )}
      {fotos.length > 0 && (
        <div className={styles.footer}>
          {mensaje && <p className={styles.mensaje}>{mensaje}</p>}
          <button
            className={styles.btnGuardar}
            onClick={handleGuardarDescripciones}
            disabled={guardando}
          >
            {guardando ? 'Guardando...' : 'Guardar descripciones'}
          </button>
        </div>
      )}
    </div>
  )
}