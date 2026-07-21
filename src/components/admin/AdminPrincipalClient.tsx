'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import AdminPanelLayout from '@/components/admin/AdminPanelLayout'
import styles from '@/app/admin/(protected)/page.module.css'
import { createClient } from '@/lib/supabase/client'
import { comprimirImagen } from '@/lib/comprimirImagen'

interface FaqItem {
  id: string
  pregunta: string
  respuesta: string
  orden: number
}

interface LogoItem {
  id: string
  imagen_url: string
  nombre: string | null
}

interface CategoriaItem {
  id: string
  nombre: string
  orden: number
}

interface PaginaPrincipalProps {
  heroTitulo: string
  sobreNosotrosTitulo: string
  sobreNosotrosDescripcion: string
  galeriaTitulo: string
  galeriaDescripcion: string
  imagenPrincipalUrl: string | null
  imagenSecundariaUrl: string | null
  logos: LogoItem[]
  faqItems: FaqItem[]
  categoriasIniciales: CategoriaItem[]  // agregás esto
}



export default function AdminPrincipalClient({
  imagenPrincipalUrl,
  imagenSecundariaUrl,
  logos: logosIniciales,
  faqItems: faqIniciales,
  categoriasIniciales,
  heroTitulo: heroTituloInicial,
  sobreNosotrosTitulo: sobreNosotrosTituloInicial,
  sobreNosotrosDescripcion: sobreNosotrosDescripcionInicial,
  galeriaTitulo: galeriaTituloInicial,
  galeriaDescripcion: galeriaDescripcionInicial,
}: PaginaPrincipalProps) {
  const supabase = createClient()

  const [heroTitulo, setHeroTitulo] = useState(heroTituloInicial)
  const [sobreNosotrosTitulo, setSobreNosotrosTitulo] = useState(sobreNosotrosTituloInicial)
  const [sobreNosotrosDescripcion, setSobreNosotrosDescripcion] = useState(sobreNosotrosDescripcionInicial)
  const [galeriaTitulo, setGaleriaTitulo] = useState(galeriaTituloInicial)
  const [galeriaDescripcion, setGaleriaDescripcion] = useState(galeriaDescripcionInicial)
  const [imagenPrincipal, setImagenPrincipal] = useState<string | null>(imagenPrincipalUrl)
  const [imagenSecundaria, setImagenSecundaria] = useState<string | null>(imagenSecundariaUrl)
  const [logos, setLogos] = useState<LogoItem[]>(logosIniciales)
  const [faq, setFaq] = useState<FaqItem[]>(faqIniciales)
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState<string | null>(null)
  const [categorias, setCategorias] = useState<CategoriaItem[]>(categoriasIniciales)
  const [nuevaCategoria, setNuevaCategoria] = useState('')

  const inputPrincipalRef = useRef<HTMLInputElement>(null)
  const inputSecundariaRef = useRef<HTMLInputElement>(null)
  const inputLogoRef = useRef<HTMLInputElement>(null)

  async function subirImagen(file: File, bucket: string): Promise<string | null> {
    const fileComprimido = await comprimirImagen(
      file,
      bucket === 'logos' ? 400 : 1200,  // logos más chicos
      0.8
    )

    const nombre = `${Date.now()}.webp`
    const { error } = await supabase.storage.from(bucket).upload(nombre, fileComprimido)
    if (error) return null
    const { data } = supabase.storage.from(bucket).getPublicUrl(nombre)
    return data.publicUrl
  }

  async function handleImagenPrincipal(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = await subirImagen(file, 'pagina-principal')
    if (url) setImagenPrincipal(url)
  }

  async function handleImagenSecundaria(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = await subirImagen(file, 'pagina-principal')
    if (url) setImagenSecundaria(url)
  }

  async function handleAgregarLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = await subirImagen(file, 'logos')
    if (!url) return
    const { data } = await supabase
      .from('logos_marcas')
      .insert({ imagen_url: url, orden: logos.length })
      .select()
      .single()
    if (data) setLogos([...logos, data])
  }

  async function handleEliminarLogo(id: string) {
    await supabase.from('logos_marcas').delete().eq('id', id)
    setLogos(logos.filter((l) => l.id !== id))
  }

  function handleFaqChange(id: string, campo: 'pregunta' | 'respuesta', valor: string) {
    setFaq(faq.map((f) => (f.id === id ? { ...f, [campo]: valor } : f)))
  }

  async function handleAgregarFaq() {
    const { data } = await supabase
      .from('faq')
      .insert({ pregunta: '', respuesta: '', orden: faq.length })
      .select()
      .single()
    if (data) setFaq([...faq, data])
  }

  async function handleEliminarFaq(id: string) {
    await supabase.from('faq').delete().eq('id', id)
    setFaq(faq.filter((f) => f.id !== id))
  }


  async function handleAgregarCategoria() {
    if (!nuevaCategoria.trim()) return
    const { data } = await supabase
      .from('categorias')
      .insert({ nombre: nuevaCategoria.trim(), orden: categorias.length })
      .select()
      .single()
    if (data) {
      setCategorias([...categorias, data])
      setNuevaCategoria('')
    }
  }

  async function handleEliminarCategoria(id: string) {
    const confirmar = window.confirm('¿Seguro? Se desvinculará de todos los productos asociados.')
    if (!confirmar) return
    await supabase.from('categorias').delete().eq('id', id)
    setCategorias(categorias.filter((c) => c.id !== id))
  }

  async function handleGuardar() {
    setGuardando(true)
    setMensaje(null)

    // Guardar imágenes principales
    await supabase
      .from('pagina_principal')
      .update({
        imagen_principal_url: imagenPrincipal,
        imagen_secundaria_url: imagenSecundaria,
        hero_titulo: heroTitulo,
        sobre_nosotros_titulo: sobreNosotrosTitulo,
        sobre_nosotros_descripcion: sobreNosotrosDescripcion,
        galeria_titulo: galeriaTitulo,
        galeria_descripcion: galeriaDescripcion,
        updated_at: new Date().toISOString()
      })
      .eq('id', (await supabase.from('pagina_principal').select('id').single()).data?.id)

    // Guardar FAQ
    for (const item of faq) {
      await supabase.from('faq').update({ pregunta: item.pregunta, respuesta: item.respuesta }).eq('id', item.id)
    }

    // Guardar categorias
    for (const cat of categorias) {
      await supabase.from('categorias').update({ nombre: cat.nombre }).eq('id', cat.id)
    }


    setGuardando(false)
    setMensaje('Cambios guardados correctamente.')
    setTimeout(() => setMensaje(null), 3000)
  }

  return (
    <AdminPanelLayout>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.titulo}>Imagen principal</h1>
          {mensaje && <p className={styles.mensaje}>{mensaje}</p>}
        </div>

        <h2 className={styles.subtitulo}>Textos del sitio</h2>

        <div className={styles.textosGrid}>
          <div className={styles.campoTexto}>
            <label className={styles.campoLabel}>Hero — Título principal</label>
            <textarea
              value={heroTitulo}
              onChange={(e) => setHeroTitulo(e.target.value)}
              className={styles.textarea}
              rows={3}
            />
            <p className={styles.campoHint}>Presioná Enter para hacer un salto de línea</p>
          </div>

          <div className={styles.campoTexto}>
            <label className={styles.campoLabel}>Sobre nosotros — Título</label>
            <input
              type="text"
              value={sobreNosotrosTitulo}
              onChange={(e) => setSobreNosotrosTitulo(e.target.value)}
              className={styles.faqInput}
            />
          </div>

          <div className={styles.campoTexto}>
            <label className={styles.campoLabel}>Sobre nosotros — Descripción</label>
            <textarea
              value={sobreNosotrosDescripcion}
              onChange={(e) => setSobreNosotrosDescripcion(e.target.value)}
              className={styles.textarea}
              rows={4}
            />
          </div>

          <div className={styles.campoTexto}>
            <label className={styles.campoLabel}>Galería — Título</label>
            <input
              type="text"
              value={galeriaTitulo}
              onChange={(e) => setGaleriaTitulo(e.target.value)}
              className={styles.faqInput}
            />
          </div>

          <div className={styles.campoTexto}>
            <label className={styles.campoLabel}>Galería — Descripción</label>
            <textarea
              value={galeriaDescripcion}
              onChange={(e) => setGaleriaDescripcion(e.target.value)}
              className={styles.textarea}
              rows={4}
            />
          </div>
        </div>
        {/* Imagen principal */}
        <div className={styles.seccion}>
          <div
            className={styles.imagePreview}
            onClick={() => inputPrincipalRef.current?.click()}
          >
            {imagenPrincipal ? (
              <Image src={imagenPrincipal} alt="Imagen principal" fill className={styles.imagen} />
            ) : (
              <div className={styles.imagePlaceholder}>
                <span>+ Subir imagen principal</span>
              </div>
            )}
          </div>
          <input ref={inputPrincipalRef} type="file" accept="image/*" onChange={handleImagenPrincipal} className={styles.inputHidden} />
        </div>

        {/* Imagen secundaria */}
        <h2 className={styles.subtitulo}>Imagen secundaria</h2>
        <div className={styles.seccion}>
          <div
            className={styles.imagePreview}
            onClick={() => inputSecundariaRef.current?.click()}
          >
            {imagenSecundaria ? (
              <Image src={imagenSecundaria} alt="Imagen secundaria" fill className={styles.imagen} />
            ) : (
              <div className={styles.imagePlaceholder}>
                <span>+ Subir imagen secundaria</span>
              </div>
            )}
          </div>
          <input ref={inputSecundariaRef} type="file" accept="image/*" onChange={handleImagenSecundaria} className={styles.inputHidden} />
        </div>

        <h2 className={styles.subtitulo}>Categorías</h2>
        <div className={styles.faqList}>
          {categorias.map((cat) => (
            <div key={cat.id} className={styles.faqItem}>
              <div className={styles.faqInputs}>
                <input
                  type="text"
                  value={cat.nombre}
                  onChange={(e) =>
                    setCategorias(categorias.map((c) =>
                      c.id === cat.id ? { ...c, nombre: e.target.value } : c
                    ))
                  }
                  className={styles.faqInput}
                />
              </div>
              <button
                className={styles.faqEliminar}
                onClick={() => handleEliminarCategoria(cat.id)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3,6 5,6 21,6" /><path d="M19,6l-1,14H6L5,6" />
                  <path d="M10,11v6" /><path d="M14,11v6" />
                  <path d="M9,6V4a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1V6" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className={styles.faqItem}>
          <div className={styles.faqInputs}>
            <input
              type="text"
              placeholder="Nueva categoría"
              value={nuevaCategoria}
              onChange={(e) => setNuevaCategoria(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAgregarCategoria()}
              className={styles.faqInput}
            />
          </div>
          <button className={styles.faqEliminar} onClick={handleAgregarCategoria}>
            +
          </button>
        </div>

        {/* Logos marcas */}
        <h2 className={styles.subtitulo}>Sección clientes</h2>
        <div className={styles.logosGrid}>
          {logos.map((logo) => (
            <div key={logo.id} className={styles.logoItem}>
              <Image src={logo.imagen_url} alt={logo.nombre ?? 'Logo'} width={120} height={60} className={styles.logoImg} />
              <button
                className={styles.logoEliminar}
                onClick={() => handleEliminarLogo(logo.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <input ref={inputLogoRef} type="file" accept="image/*" onChange={handleAgregarLogo} className={styles.inputHidden} />
        <button className={styles.btnAgregar} onClick={() => inputLogoRef.current?.click()}>+</button>

        {/* FAQ */}
        <h2 className={styles.subtitulo}>Sección preguntas frecuentes</h2>
        <div className={styles.faqList}>
          {faq.map((item) => (
            <div key={item.id} className={styles.faqItem}>
              <div className={styles.faqInputs}>
                <input
                  type="text"
                  placeholder="Pregunta"
                  value={item.pregunta}
                  onChange={(e) => handleFaqChange(item.id, 'pregunta', e.target.value)}
                  className={styles.faqInput}
                />
                <input
                  type="text"
                  placeholder="Respuesta"
                  value={item.respuesta}
                  onChange={(e) => handleFaqChange(item.id, 'respuesta', e.target.value)}
                  className={styles.faqInput}
                />
              </div>
              <button className={styles.faqEliminar} onClick={() => handleEliminarFaq(item.id)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3,6 5,6 21,6" /><path d="M19,6l-1,14H6L5,6" /><path d="M10,11v6" /><path d="M14,11v6" />
                  <path d="M9,6V4a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1V6" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <button className={styles.btnAgregar} onClick={handleAgregarFaq}>+</button>

        {/* Guardar */}
        <button
          className={styles.btnGuardar}
          onClick={handleGuardar}
          disabled={guardando}
        >
          {guardando ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
    </AdminPanelLayout>
  )
}