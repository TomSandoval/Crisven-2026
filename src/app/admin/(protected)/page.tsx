import { createClient } from '@/lib/supabase/server'
import AdminPrincipalClient from '@/components/admin/AdminPrincipalClient'

export default async function AdminPage() {
  const supabase = await createClient()

  const [
    { data: paginaPrincipal },
    { data: logos },
    { data: faq },
    { data: categorias },
  ] = await Promise.all([
    supabase.from('pagina_principal').select('*').single(),
    supabase.from('logos_marcas').select('*').order('orden'),
    supabase.from('faq').select('*').order('orden'),
    supabase.from('categorias').select('*').order('orden'),
  ])

  return (
    <AdminPrincipalClient
      imagenPrincipalUrl={paginaPrincipal?.imagen_principal_url ?? null}
      imagenSecundariaUrl={paginaPrincipal?.imagen_secundaria_url ?? null}
      logos={logos ?? []}
      faqItems={faq ?? []}
      categoriasIniciales={categorias ?? []}
      heroTitulo={paginaPrincipal?.hero_titulo ?? 'Somos Crisven Fábrica de ventanas para vehículos recreativos y carrocerías'}
      sobreNosotrosTitulo={paginaPrincipal?.sobre_nosotros_titulo ?? 'Calidad sobre todo'}
      sobreNosotrosDescripcion={paginaPrincipal?.sobre_nosotros_descripcion ?? ''}
      galeriaTitulo={paginaPrincipal?.galeria_titulo ?? 'Calidad sobre todo'}
      galeriaDescripcion={paginaPrincipal?.galeria_descripcion ?? ''}
    />
  )
}