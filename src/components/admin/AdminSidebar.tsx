'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import styles from './adminSidebar.module.css'

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const isPrincipal = pathname === '/admin'
  const isProductos = pathname.startsWith('/admin/productos')

  return (
    <aside className={styles.sidebar}>
      <Link
        href="/admin"
        className={`${styles.link} ${isPrincipal ? styles.linkActivo : ''}`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
        </svg>
        Pagina principal
      </Link>

      <div className={styles.group}>
        <Link
          href="/admin/productos"
          className={`${styles.link} ${isProductos ? styles.linkActivo : ''}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          </svg>
          Productos
        </Link>
        <Link href="/admin/productos/agregar" className={styles.sublink}>
          + Agregar producto
        </Link>
      </div>

      <button onClick={handleLogout} className={styles.logout}>
        Cerrar sesión
      </button>
    </aside>
  )
}