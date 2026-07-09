import { createClient } from '@/lib/supabase/server'
import AdminPrincipalClient from '@/components/admin/AdminPrincipalClient'

export default async function AdminPage() {
  const supabase = await createClient()

  const [
    { data: paginaPrincipal },
    { data: logos },
    { data: faq },
  ] = await Promise.all([
    supabase.from('pagina_principal').select('*').single(),
    supabase.from('logos_marcas').select('*').order('orden'),
    supabase.from('faq').select('*').order('orden'),
  ])

  return (
    <AdminPrincipalClient
      imagenPrincipalUrl={paginaPrincipal?.imagen_principal_url ?? null}
      imagenSecundariaUrl={paginaPrincipal?.imagen_secundaria_url ?? null}
      logos={logos ?? []}
      faqItems={faq ?? []}
    />
  )
}