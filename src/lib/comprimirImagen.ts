export async function comprimirImagen(
  file: File,
  maxWidth = 1200,
  calidad = 0.8
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(url)

      // Calcular dimensiones manteniendo proporción
      let width = img.width
      let height = img.height

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width)
        width = maxWidth
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')
      if (!ctx) return reject(new Error('No se pudo crear el canvas'))

      ctx.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error('No se pudo comprimir la imagen'))
          const archivoComprimido = new File([blob], file.name, {
            type: 'image/webp',
            lastModified: Date.now(),
          })
          resolve(archivoComprimido)
        },
        'image/webp',
        calidad
      )
    }

    img.onerror = () => reject(new Error('No se pudo cargar la imagen'))
    img.src = url
  })
}