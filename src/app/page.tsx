import { createClient } from '@/lib/supabase/server'
import Hero from '@/components/landing/Hero/Hero'
import SobreNosotros from '@/components/landing/SobreNosotros/SobreNosotros'
import Contacto from '@/components/landing/Contacto/Contacto'
import Marcas from '@/components/landing/Marcas/Marcas'
import FAQ from '@/components/landing/Faq/Faq'

export default async function HomePage() {
  const supabase = await createClient()

  const [
    { data: paginaPrincipal },
    { data: logos },
    { data: faqItems },
  ] = await Promise.all([
    supabase.from('pagina_principal').select('*').single(),
    supabase.from('logos_marcas').select('*').order('orden'),
    supabase.from('faq').select('*').order('orden'),
  ])

  return (
    <>
      <Hero imagenUrl={paginaPrincipal?.imagen_principal_url ?? null} />
      <SobreNosotros imagenUrl={paginaPrincipal?.imagen_secundaria_url ?? null} />
      <Contacto />
      <Marcas logos={logos ?? []} />
      <FAQ items={faqItems ?? []} />
    </>
  )
}