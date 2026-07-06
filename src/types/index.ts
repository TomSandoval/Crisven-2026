// =============================================
// CATEGORÍAS Y SUBCATEGORÍAS
// =============================================

export type Categoria = {
  id: string
  nombre: string
  orden: number
  created_at: string
}

export type Subcategoria = {
  id: string
  nombre: string
  categoria_id: string
  orden: number
  created_at: string
}

// Con la categoría anidada (para cuando hacés joins)
export type SubcategoriaConCategoria = Subcategoria & {
  categorias: Categoria
}

// =============================================
// PRODUCTOS
// =============================================

export type ProductoImagen = {
  id: string
  producto_id: string
  imagen_url: string
  es_principal: boolean
  orden: number
  created_at: string
}

export type Producto = {
  id: string
  nombre: string
  descripcion: string | null
  categoria_id: string | null
  subcategoria_id: string | null
  orden: number
  created_at: string
}

// Con relaciones anidadas (para mostrar en el sitio público)
export type ProductoCompleto = Producto & {
  categorias: Categoria | null
  subcategorias: Subcategoria | null
  producto_imagenes: ProductoImagen[]
}

// Solo con imagen principal (para la grilla de productos)
export type ProductoEnGrilla = Producto & {
  categorias: Categoria | null
  subcategorias: Subcategoria | null
  imagen_principal: ProductoImagen | null
}

// =============================================
// GALERÍA
// =============================================

export type GaleriaItem = {
  id: string
  imagen_url: string
  descripcion: string | null
  orden: number
  created_at: string
}

// =============================================
// PÁGINA PRINCIPAL
// =============================================

export type PaginaPrincipal = {
  id: string
  imagen_principal_url: string | null
  imagen_secundaria_url: string | null
  updated_at: string
}

export type LogoMarca = {
  id: string
  imagen_url: any
  nombre: string | null
  orden: number
  created_at: string
}

// =============================================
// FAQ
// =============================================

export type FaqItem = {
  id: string
  pregunta: string
  respuesta: string
  orden: number
  created_at: string
}

// =============================================
// HELPERS PARA EL PANEL ADMIN
// =============================================

// Para los formularios de crear/editar (sin campos auto-generados)
export type ProductoInsert = Omit<Producto, 'id' | 'created_at'>
export type ProductoUpdate = Partial<ProductoInsert>

export type CategoriaInsert = Omit<Categoria, 'id' | 'created_at'>
export type SubcategoriaInsert = Omit<Subcategoria, 'id' | 'created_at'>

export type GaleriaInsert = Omit<GaleriaItem, 'id' | 'created_at'>
export type FaqInsert = Omit<FaqItem, 'id' | 'created_at'>
export type LogoMarcaInsert = Omit<LogoMarca, 'id' | 'created_at'>

export type ProductoImagenInsert = Omit<ProductoImagen, 'id' | 'created_at'>

// =============================================
// RESPUESTAS DE SUPABASE
// =============================================

export type SupabaseError = {
  message: string
  code?: string
}