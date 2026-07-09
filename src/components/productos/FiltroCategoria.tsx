import styles from './FiltroCategoria.module.css'
import { Categoria, Subcategoria } from '@/types'

interface FiltroCategoriaProps {
  categorias: Categoria[]
  subcategorias: Subcategoria[]
  categoriaActiva: string | null
  subcategoriaActiva: string | null
  onCategoriaChange: (id: string | null) => void
  onSubcategoriaChange: (id: string | null) => void
}

export default function FiltroCategoria({
  categorias,
  subcategorias,
  categoriaActiva,
  subcategoriaActiva,
  onCategoriaChange,
  onSubcategoriaChange,
}: FiltroCategoriaProps) {
  return (
    <div className={styles.filtro}>
      <h2 className={styles.titulo}>Categorias</h2>

      <ul className={styles.lista}>
        <li>
          <button
            className={`${styles.item} ${!categoriaActiva ? styles.activo : ''}`}
            onClick={() => onCategoriaChange(null)}
          >
            <span className={styles.linea} />
            Todos
          </button>
        </li>

        {categorias.map((cat) => {
          const subs = subcategorias.filter((s) => s.categoria_id === cat.id)
          const estaActiva = categoriaActiva === cat.id

          return (
            <li key={cat.id}>
              <button
                className={`${styles.item} ${estaActiva && !subcategoriaActiva ? styles.activo : ''}`}
                onClick={() => onCategoriaChange(cat.id)}
              >
                <span className={styles.linea} />
                {cat.nombre}
              </button>

              {estaActiva && subs.length > 0 && (
                <ul className={styles.subLista}>
                  {subs.map((sub) => (
                    <li key={sub.id}>
                      <button
                        className={`${styles.subItem} ${subcategoriaActiva === sub.id ? styles.subActivo : ''}`}
                        onClick={() => onSubcategoriaChange(sub.id)}
                      >
                        {sub.nombre}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}