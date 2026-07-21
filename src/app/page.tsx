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

  console.log(paginaPrincipal.imagen_principal_url)
  return (
    <>
      <Hero
        imagenUrl={paginaPrincipal?.imagen_principal_url ?? null}
        titulo={paginaPrincipal?.hero_titulo ?? 'Somos Crisven Fábrica de ventanas para vehículos recreativos y carrocerías'}
      />
      <SobreNosotros
        imagenUrl={paginaPrincipal?.imagen_secundaria_url ?? null}
        titulo={paginaPrincipal?.sobre_nosotros_titulo ?? 'Calidad sobre todo'}
        descripcion={paginaPrincipal?.sobre_nosotros_descripcion ?? ''}
      />
      <Contacto />
      <Marcas logos={logos ?? []} />
      <FAQ items={faqItems ?? []} />
    </>
  )
}