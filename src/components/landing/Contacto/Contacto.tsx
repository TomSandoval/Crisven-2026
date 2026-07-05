'use client'

import { useState } from 'react'
import styles from './Contacto.module.css'

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' })
  const [estado, setEstado] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setEstado('loading')
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setEstado('ok')
        setForm({ nombre: '', email: '', mensaje: '' })
      } else {
        setEstado('error')
      }
    } catch {
      setEstado('error')
    }
  }

  return (
    <section id="contacto" className={styles.section}>
      <div className={styles.mapWrapper}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.9!2d-58.4!3d-34.76!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDQ1JzM2LjAiUyA1OMKwMjQnMDAuMCJX!5e0!3m2!1ses!2sar!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación Crisven"
        />
      </div>

      <div className={styles.formWrapper}>
        <p className={styles.eyebrow}>Contacto</p>
        <h2 className={styles.title}>
          Contactanos y recibí el mejor asesoramiento para tu próximo proyecto
        </h2>
        <p className={styles.desc}>
          Crisven, con 15 años de experiencia, nos dedicamos a la fabricación de ventanas para
          casas rodantes, carrocerías y obradores. Destacamos por la calidad y adaptabilidad de
          nuestros productos.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Nombre</label>
              <input
                type="text"
                required
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Mensaje</label>
            <textarea
              required
              rows={3}
              value={form.mensaje}
              onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
              className={styles.textarea}
            />
          </div>

          <button
            type="submit"
            disabled={estado === 'loading'}
            className={styles.submit}
          >
            {estado === 'loading' ? 'Enviando...' : 'Enviar'}
          </button>

          {estado === 'ok' && (
            <p className={styles.successMsg}>¡Mensaje enviado! Te contactamos a la brevedad.</p>
          )}
          {estado === 'error' && (
            <p className={styles.errorMsg}>Ocurrió un error. Intentá de nuevo o escribinos por WhatsApp.</p>
          )}
        </form>
      </div>
    </section>
  )
}