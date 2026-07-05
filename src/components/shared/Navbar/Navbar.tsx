'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import styles from './Navbar.module.css'



<style>
  @import url('https://fonts.googleapis.com/css2?family=Rokkitt:ital,wght@0,100..900;1,100..900&display=swap');
</style>

const navLinks = [
  { label: 'Sobre nosotros', href: '/#sobre-nosotros' },
  { label: 'Contacto', href: '/#contacto' },
  { label: 'Productos', href: '/productos' },
]

const categorias = [
  { label: 'Línea Levadizas', href: '/productos?categoria=levadizas' },
  { label: 'Línea Blackout', href: '/productos?categoria=blackout' },
  { label: 'Línea Fija', href: '/productos?categoria=fija' },
]



export default function Navbar() {
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
              <Link key={cat.href} href={cat.href} className={styles.categoryLink}>
                {cat.label}
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