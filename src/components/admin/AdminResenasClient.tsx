'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import styles from './AdminResenasClient.module.css'
import { Resena } from '@/types'

export default function AdminResenasClient({ resenas: resenasIniciales }: { resenas: Resena[] }) {
  const [resenas, setResenas] = useState<Resena[]>(resenasIniciales)
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState<string | null>(null)
  const supabase = createClient()

  async function handleAgregar() {
    const { data } = await supabase
      .from('resenas')
      .insert({ nombre: '', texto: '', estrellas: 5, orden: resenas.length })
      .select()
      .single()
    if (data) setResenas([...resenas, data])
  }

  async function handleEliminar(id: string) {
    const confirmar = window.confirm('¿Eliminás esta reseña?')
    if (!confirmar) return
    await supabase.from('resenas').delete().eq('id', id)
    setResenas(resenas.filter((r) => r.id !== id))
  }

  function handleChange(id: string, campo: keyof Resena, valor: string | number) {
    setResenas(resenas.map((r) => r.id === id ? { ...r, [campo]: valor } : r))
  }

  async function handleGuardar() {
    setGuardando(true)
    setMensaje(null)
    for (const r of resenas) {
      await supabase.from('resenas').update({
        nombre: r.nombre,
        texto: r.texto,
        estrellas: r.estrellas,
      }).eq('id', r.id)
    }
    setGuardando(false)
    setMensaje('Reseñas guardadas.')
    setTimeout(() => setMensaje(null), 3000)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.titulo}>Reseñas</h1>
        <button className={styles.btnAgregar} onClick={handleAgregar}>+ Agregar reseña</button>
      </div>

      <div className={styles.lista}>
        {resenas.map((resena) => (
          <div key={resena.id} className={styles.card}>
            <div className={styles.cardBody}>
              <input
                type="text"
                placeholder="Nombre del cliente"
                value={resena.nombre}
                onChange={(e) => handleChange(resena.id, 'nombre', e.target.value)}
                className={styles.input}
              />
              <div className={styles.estrellas}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    className={`${styles.estrella} ${n <= resena.estrellas ? styles.estrellaActiva : ''}`}
                    onClick={() => handleChange(resena.id, 'estrellas', n)}
                  >
                    ★
                  </button>
                ))}
              </div>
              <textarea
                placeholder="Texto de la reseña"
                value={resena.texto}
                onChange={(e) => handleChange(resena.id, 'texto', e.target.value)}
                className={styles.textarea}
                rows={3}
              />
            </div>
            <button className={styles.btnEliminar} onClick={() => handleEliminar(resena.id)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14H6L5,6"/>
                <path d="M10,11v6"/><path d="M14,11v6"/>
                <path d="M9,6V4a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1V6"/>
              </svg>
            </button>
          </div>
        ))}
      </div>

      {resenas.length === 0 && (
        <div className={styles.empty}>
          <p>No hay reseñas todavía. Hacé clic en "+ Agregar reseña" para comenzar.</p>
        </div>
      )}

      {resenas.length > 0 && (
        <div className={styles.footer}>
          {mensaje && <p className={styles.mensaje}>{mensaje}</p>}
          <button className={styles.btnGuardar} onClick={handleGuardar} disabled={guardando}>
            {guardando ? 'Guardando...' : 'Guardar reseñas'}
          </button>
        </div>
      )}
    </div>
  )
}