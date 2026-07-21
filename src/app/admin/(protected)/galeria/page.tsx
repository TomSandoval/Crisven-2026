import { createClient } from '@/lib/supabase/server'
import AdminPanelLayout from '@/components/admin/AdminPanelLayout'
import AdminGaleriaClient from '@/components/admin/AdminGaleriaClient'

export default async function AdminGaleriaPage() {
  const supabase = await createClient()

  const { data: fotos } = await supabase
    .from('galeria')
    .select('*')
    .order('orden')

  console.log(fotos)

  return (
    <AdminPanelLayout>
      <AdminGaleriaClient fotos={fotos ?? []} />
    </AdminPanelLayout>
  )
}