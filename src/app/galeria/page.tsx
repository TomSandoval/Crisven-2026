import { createClient } from '@/lib/supabase/server'
import GaleriaClient from '@/components/galeria/GaleriaClient'

export const metadata = {
  title: 'Galería | Crisven',
  description: 'Fotos de ventanas y aberturas Crisven instaladas en motorhomes y vehículos recreativos.',
}

export default async function GaleriaPage() {
  const supabase = await createClient()

  const [{ data: fotos }, { data: paginaPrincipal }] = await Promise.all([
    supabase.from('galeria').select('*').order('orden'),
    supabase.from('pagina_principal').select('*').single(),
  ])

  return (
    <GaleriaClient
      fotos={fotos ?? []}
      titulo={paginaPrincipal?.galeria_titulo ?? 'Calidad sobre todo'}
      descripcion={paginaPrincipal?.galeria_descripcion ?? ''}
    />
  )
}