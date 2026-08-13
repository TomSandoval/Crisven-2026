import { createClient } from '@/lib/supabase/server'
import AdminPanelLayout from '@/components/admin/AdminPanelLayout'
import AdminResenasClient from '@/components/admin/AdminResenasClient'

export default async function AdminResenasPage() {
  const supabase = await createClient()
  const { data: resenas } = await supabase.from('resenas').select('*').order('orden')

  return (
    <AdminPanelLayout>
      <AdminResenasClient resenas={resenas ?? []} />
    </AdminPanelLayout>
  )
}