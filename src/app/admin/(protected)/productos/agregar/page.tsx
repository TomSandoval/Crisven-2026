import { createClient } from '@/lib/supabase/server'
import FormProducto from '@/components/admin/FormProducto'

export default async function AgregarProductoPage() {
  const supabase = await createClient()

  const [{ data: categorias }, { data: subcategorias }] = await Promise.all([
    supabase.from('categorias').select('*').order('orden'),
    supabase.from('subcategorias').select('*').order('orden'),
  ])

  return (
    <FormProducto
      categorias={categorias ?? []}
      subcategorias={subcategorias ?? []}
    />
  )
}