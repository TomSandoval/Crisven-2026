import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import DetalleProductoClient from '@/components/productos/DetalleProductoClient'
import { ProductoCompleto } from '@/types'
import { ProductoEnGrilla } from '@/types'

interface Props {
  params: Promise<{ id: string }>
}


export default async function DetalleProductoPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: producto } = await supabase
    .from('productos')
    .select(`
      *,
      categorias(*),
      subcategorias(*),
      producto_imagenes(*)
    `)
    .eq('id', id)
    .order('orden', { referencedTable: 'producto_imagenes' })
    .single()

  if (!producto) notFound()

  // Traemos productos de la misma categoría excluyendo el actual
  const { data: similares } = await supabase
    .from('productos')
    .select(`
      *,
      categorias(*),
      subcategorias(*),
      producto_imagenes!inner(*)
    `)
    .eq('categoria_id', producto.categoria_id)
    .eq('producto_imagenes.es_principal', true)
    .neq('id', id)
    .order('orden')
    .limit(5)



  
  return (
    <DetalleProductoClient
      producto={producto}
      similares={similares ?? []}
    />
  )
}