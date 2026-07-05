import { createClient } from '@/lib/supabase/server'
import Hero from '@/components/landing/Hero/Hero'
import SobreNosotros from '@/components/landing/SobreNosotros/SobreNosotros'
import Contacto from '@/components/landing/Contacto/Contacto'
import Marcas from '@/components/landing/Marcas/Marcas'
import Faq from '@/components/landing/Faq/Faq'

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
      <Marcas logos={logos ?? []} />
      <Faq items={faqItems ?? []} />
    </>
  )
}