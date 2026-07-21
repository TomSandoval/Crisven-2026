'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import styles from './Navbar.module.css'
import { Categoria } from '@/types'



<style>
  @import url('https://fonts.googleapis.com/css2?family=Rokkitt:ital,wght@0,100..900;1,100..900&display=swap');
</style>

const navLinks = [
  { label: 'Sobre nosotros', href: '/#sobre-nosotros' },
  { label: 'Contacto', href: '/#contacto' },
  { label: 'Galeria', href: '/galeria' },
  { label: 'Productos', href: '/productos' },
]

interface NavbarProps {
  categorias: Categoria[]
}



export default function Navbar({ categorias }: NavbarProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const isAdmin = pathname?.startsWith('/admin')

  return (
    <header className={styles.header}>
      <div className={styles.mainBar}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoName}>Crisven</span>
            <span className={styles.logoSub}>Windows creation</span>
          </Link>

          <nav className={styles.nav}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>
      </div>

      {!isAdmin && (
        <div className={styles.categoriesBar}>
          <div className={styles.container}>
            {categorias.map((cat) => (
              <Link key={cat.nombre} href="/productos" className={styles.categoryLink}>
                {cat.nombre}
              </Link>
            ))}
          </div>
        </div>
      )}

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.container}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className={styles.mobileDivider} />
          </div>
        </div>
      )}
    </header>
  )
}