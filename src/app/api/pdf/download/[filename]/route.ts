/**
 * API Endpoint para descargar PDFs pre-generados
 * GET /api/pdf/download/[filename]
 * 
 * Ejemplos:
 * GET /api/pdf/download/matricula-vehicular.pdf
 * GET /api/pdf/download/baja-vehicular.pdf
 */

import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

// Force static export compatibility
export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateStaticParams() {
  return [
    { filename: 'matricula-vehicular' },
    { filename: 'baja-vehicular' },
    { filename: 'prescripcion-multas' },
    { filename: 'patios-retencion' },
    { filename: 'parte-propio' },
    { filename: 'libertad-vehicular' },
    { filename: 'chatarizacion' },
    { filename: 'procesos-judiciales' }
  ]
}

// Lista de PDFs permitidos (seguridad)
const ALLOWED_PDFS = [
  'matricula-vehicular',
  'baja-vehicular',
  'prescripcion-multas',
  'patios-retencion',
  'parte-propio',
  'libertad-vehicular',
  'chatarizacion',
  'procesos-judiciales'
]

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename: rawFilename } = await params
    const filename = rawFilename.replace('.pdf', '')
    
    // Validar que el PDF esté en la lista permitida
    // (evita path traversal attacks)
    if (!ALLOWED_PDFS.includes(filename)) {
      return NextResponse.json(
        { error: 'PDF no encontrado o no autorizado' },
        { status: 404 }
      )
    }

    // Construir ruta del archivo
    const filepath = join(
      process.cwd(),
      'public',
      'pdfs',
      `${filename}.pdf`
    )

    try {
      // Leer archivo
      const fileBuffer = await readFile(filepath)

      // Retornar con headers de descarga
      const headers = new Headers()
      headers.set('Content-Type', 'application/pdf')
      headers.set(
        'Content-Disposition',
        `attachment; filename="${filename}.pdf"`
      )
      headers.set('Cache-Control', 'public, max-age=3600')

      return new NextResponse(fileBuffer, {
        status: 200,
        headers
      })
    } catch (fileError) {
      console.error(`Archivo no encontrado: ${filepath}`, fileError)
      return NextResponse.json(
        { 
          error: 'Archivo PDF no encontrado en el servidor',
          file: filename
        },
        { status: 404 }
      )
    }
  } catch (error) {
    console.error('Error en /api/pdf/download:', error)
    return NextResponse.json(
      {
        error: 'Error descargando PDF',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    )
  }
}
