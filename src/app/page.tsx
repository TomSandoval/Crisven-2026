import { createClient } from '@/lib/supabase/server'
import Hero from '@/components/landing/Hero/Hero'
import SobreNosotros from '@/components/landing/SobreNosotros/SobreNosotros'
import Contacto from '@/components/landing/Contacto/Contacto'
import Marcas from '@/components/landing/Marcas/Marcas'
import Faq from '@/components/landing/Faq/Faq'
import { FaqItem, LogoMarca } from '@/types'

const MARCAS_MOCK: LogoMarca[] = [
  {
    id: '1',
    nombre: 'DN Trailers',
    imagen_url: '/assets/logo-DM.png',
    orden: 0,
    created_at: '',
  },
  {
    id: '2',
    nombre: 'Marca 2',
    imagen_url: '/assets/logo-DM.png',
    orden: 1,
    created_at: '',
  },
  {
    id: '3',
    nombre: 'Marca 2',
    imagen_url: '/assets/logo-DM.png',
    orden: 1,
    created_at: '',
  },
  {
    id: '4',
    nombre: 'Marca 2',
    imagen_url: '/assets/logo-DM.png',
    orden: 1,
    created_at: '',
  },
  {
    id: '5',
    nombre: 'Marca 2',
    imagen_url: '/assets/logo-DM.png',
    orden: 1,
    created_at: '',
  },
  {
    id: '6',
    nombre: 'Marca 2',
    imagen_url: '/assets/logo-DM.png',
    orden: 1,
    created_at: '',
  },
  {
    id: '7',
    nombre: 'Marca 2',
    imagen_url: '/assets/logo-DM.png',
    orden: 1,
    created_at: '',
  },
  {
    id: '8',
    nombre: 'Marca 2',
    imagen_url: '/assets/logo-DM.png',
    orden: 1,
    created_at: '',
  },
]

const FAQ_MOCK: FaqItem[] = [
  {
    id: '1',
    pregunta: '¿Realizan envíos?',
    respuesta: 'Sí, realizamos envíos a todo el país a través de transporte de carga. Consultanos por los costos según tu ubicación.',
    orden: 0,
    created_at: '',
  },
  {
    id: '8',
    pregunta: '¿Qué medios de pago aceptan?',
    respuesta: 'Aceptamos transferencia bancaria, efectivo y tarjeta de crédito. Para compras mayoristas consultá condiciones especiales.',
    orden: 1,
    created_at: '',
  },
  {
    id: '6',
    pregunta: '¿Qué medios de pago aceptan?',
    respuesta: 'Aceptamos transferencia bancaria, efectivo y tarjeta de crédito. Para compras mayoristas consultá condiciones especiales.',
    orden: 1,
    created_at: '',
  },
  {
    id: '945',
    pregunta: '¿Qué medios de pago aceptan?',
    respuesta: 'Aceptamos transferencia bancaria, efectivo y tarjeta de crédito. Para compras mayoristas consultá condiciones especiales.',
    orden: 1,
    created_at: '',
  },
  {
    id: '645',
    pregunta: '¿Qué medios de pago aceptan?',
    respuesta: 'Aceptamos transferencia bancaria, efectivo y tarjeta de crédito. Para compras mayoristas consultá condiciones especiales.',
    orden: 1,
    created_at: '',
  },
  {
    id: '34',
    pregunta: '¿Qué medios de pago aceptan?',
    respuesta: 'Aceptamos transferencia bancaria, efectivo y tarjeta de crédito. Para compras mayoristas consultá condiciones especiales.',
    orden: 1,
    created_at: '',
  },
  {
    id: '123',
    pregunta: '¿Qué medios de pago aceptan?',
    respuesta: 'Aceptamos transferencia bancaria, efectivo y tarjeta de crédito. Para compras mayoristas consultá condiciones especiales.',
    orden: 1,
    created_at: '',
  },
]




export default async function HomePage() {
  const supabase = await createClient()

  // Traemos logos y FAQ en paralelo desde Supabase
  const [{ data: logos }, { data: faqItems }] = await Promise.all([
    supabase.from('logos_marcas').select('*').order('orden'),
    supabase.from('faq').select('*').order('orden'),
  ])

  return (
    <>
      <Hero />
      <SobreNosotros />
      <Contacto />
      <Marcas logos={MARCAS_MOCK} />
      <Faq items={FAQ_MOCK} />
    </>
  )
}