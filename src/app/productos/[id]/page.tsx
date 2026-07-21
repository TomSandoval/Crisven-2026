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
    producto_imagenes(*)
  `)
    .eq('categoria_id', producto.categoria_id)
    .neq('id', id)
    .order('orden')
    .limit(5)

  const similaresMapeados = (similares ?? []).map((p) => ({
    ...p,
    imagen_principal: p.producto_imagenes?.find((img: any) => img.es_principal) ?? p.producto_imagenes?.[0] ?? null,
  }))




  return (
    <DetalleProductoClient
      producto={producto}
      similares={similaresMapeados ?? []}
    />
  )
}