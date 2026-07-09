import { createClient } from '@/lib/supabase/server'
import ProductosClient from '@/components/productos/ProductosClient'
import { ProductoEnGrilla } from '@/types'
import { Categoria } from '@/types'

export const metadata = {
  title: 'Productos | Crisven',
  description: 'Explorá toda la línea de ventanas y aberturas para motorhomes y carrocerías de Crisven.',
}

export default async function ProductosPage() {
  const supabase = await createClient()

  const [{ data: categorias }, { data: productos }] = await Promise.all([
    supabase
      .from('categorias')
      .select('*')
      .order('orden'),
    supabase
      .from('productos')
      .select(`
      *,
      categorias(*),
      subcategorias(*),
      producto_imagenes(*)
    `)
      .order('orden'),
  ])

  // Mapeamos para extraer la imagen principal
  const productosMapeados = (productos ?? []).map((p) => ({
    ...p,
    imagen_principal: p.producto_imagenes?.find((img: any) => img.es_principal) ?? p.producto_imagenes?.[0] ?? null,
  }))

  return (
    <ProductosClient
      categorias={categorias ?? []}
      productos={productosMapeados}
    />
  )
}