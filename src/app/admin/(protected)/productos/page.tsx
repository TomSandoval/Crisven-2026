import { createClient } from '@/lib/supabase/server'
import AdminPanelLayout from '@/components/admin/AdminPanelLayout'
import AdminProductosClient from '@/components/admin/AdminProductosClient'

export default async function AdminProductosPage() {
  const supabase = await createClient()

  const { data: productos } = await supabase
    .from('productos')
    .select(`*, categorias(*), producto_imagenes!inner(*)`)
    .eq('producto_imagenes.es_principal', true)
    .order('orden')

  return (
    <AdminPanelLayout>
      <AdminProductosClient productos={productos ?? []} />
    </AdminPanelLayout>
  )
}