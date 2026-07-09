import styles from './FiltroCategoria.module.css'
import { Categoria } from '@/types'

interface FiltroCategoriaProps {
  categorias: Categoria[]
  categoriaActiva: string | null
  onChange: (id: string | null) => void
}

export default function FiltroCategoria({
  categorias,
  categoriaActiva,
  onChange,
}: FiltroCategoriaProps) {
  return (
    <div className={styles.filtro}>
      <h2 className={styles.titulo}>Categorias</h2>

      <ul className={styles.lista}>
        <li>
          <button
            className={`${styles.item} ${categoriaActiva === null ? styles.activo : ''}`}
            onClick={() => onChange(null)}
          >
            <span className={styles.linea} />
            Todos
          </button>
        </li>
        {categorias.map((cat) => (
          <li key={cat.id}>
            <button
              className={`${styles.item} ${categoriaActiva === cat.id ? styles.activo : ''}`}
              onClick={() => onChange(cat.id)}
            >
              <span className={styles.linea} />
              {cat.nombre}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}