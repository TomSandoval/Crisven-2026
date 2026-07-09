import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import FormProducto from '@/components/admin/FormProducto'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditarProductoPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: producto }, { data: categorias }, { data: subcategorias }] = await Promise.all([
    supabase
      .from('productos')
      .select(`*, categorias(*), subcategorias(*), producto_imagenes(*)`)
      .eq('id', id)
      .order('orden', { referencedTable: 'producto_imagenes' })
      .single(),
    supabase.from('categorias').select('*').order('orden'),
    supabase.from('subcategorias').select('*').order('orden'),
  ])

  if (!producto) notFound()

  return (
    <FormProducto
      categorias={categorias ?? []}
      subcategorias={subcategorias ?? []}
      producto={producto}
    />
  )
}