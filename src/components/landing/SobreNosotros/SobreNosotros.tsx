import Image from 'next/image'
import Link from 'next/link'
import styles from './SobreNosotros.module.css'

interface SobreNosotrosProps {
  imagenUrl: string | null
  titulo: string
  descripcion: string
}

export default function SobreNosotros({ imagenUrl, titulo, descripcion }: SobreNosotrosProps) {
  return (
    <section id="sobre-nosotros" className={styles.section}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>Sobre nosotros</p>
        <h2 className={styles.title}>{titulo}</h2>
        <p className={styles.text}>{descripcion}</p>
      </div>

      <div className={styles.imageWrapper}>
        {imagenUrl ? (
          <Image
            src={imagenUrl}
            alt="Técnico instalando ventana Crisven en motorhome"
            fill
            className={styles.image}
          />
        ) : (
          <div className={styles.imagePlaceholder} />
        )}
        <div className={styles.imageOverlay} />
        <Link href="/galeria" className={styles.imageLink}>
          Conocé más
        </Link>
      </div>
    </section>
  )
}