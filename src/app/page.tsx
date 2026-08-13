import { createClient } from '@/lib/supabase/server'
import Hero from '@/components/landing/Hero/Hero'
import ProductosDestacados from '@/components/landing/ProductosDestacados/ProductosDestacados'
import SobreNosotros from '@/components/landing/SobreNosotros/SobreNosotros'
import Contacto from '@/components/landing/Contacto/Contacto'
import Marcas from '@/components/landing/Marcas/Marcas'
import Resenas from '@/components/landing/Resenas/Resenas'
import FAQ from '@/components/landing/Faq/Faq'

export default async function HomePage() {
  const supabase = await createClient()

  const [
    { data: paginaPrincipal },
    { data: logos },
    { data: faqItems },
    { data: productosDestacados },
    { data: resenas },
  ] = await Promise.all([
    supabase.from('pagina_principal').select('*').single(),
    supabase.from('logos_marcas').select('*').order('orden'),
    supabase.from('faq').select('*').order('orden'),
    supabase
      .from('productos')
      .select(`*, categorias(*), subcategorias(*), producto_imagenes(*)`)
      .eq('destacado', true)
      .order('orden'),
    supabase.from('resenas').select('*').order('orden'),
  ])

  const productosMapeados = (productosDestacados ?? []).map((p) => ({
    ...p,
    imagen_principal: p.producto_imagenes?.find((img: any) => img.es_principal) ?? p.producto_imagenes?.[0] ?? null,
  }))

  console.log(productosDestacados)

  return (
    <>
      <Hero
        imagenUrl={paginaPrincipal?.imagen_principal_url ?? null}
        titulo={paginaPrincipal?.hero_titulo ?? 'Somos Crisven Fábrica de ventanas para vehículos recreativos y carrocerías'}
      />
      <ProductosDestacados productos={productosMapeados} />
      <SobreNosotros
        imagenUrl={paginaPrincipal?.imagen_secundaria_url ?? null}
        titulo={paginaPrincipal?.sobre_nosotros_titulo ?? 'Calidad sobre todo'}
        descripcion={paginaPrincipal?.sobre_nosotros_descripcion ?? ''}
      />
      <Contacto />
      <Marcas logos={logos ?? []} />
      <Resenas resenas={resenas ?? []} />
      <FAQ items={faqItems ?? []} />
    </>
  )
}