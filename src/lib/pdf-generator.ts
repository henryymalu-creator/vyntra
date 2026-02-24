/**
 * PDF Generation Helper
 * Utilities para generar y descargar PDFs con contenido de normativa
 */

interface NormativePDFData {
  title: string
  category: string
  summary: string
  sections: Array<{
    id: string
    title: string
    content?: string
    list?: string[]
    steps?: Array<{ number: number; title: string; detail: string }>
    highlights?: string[]
  }>
}

/**
 * Genera un PDF simple con contenido de la normativa
 * NOTA: Requiere que jsPDF esté instalado: npm install jspdf
 * 
 * @param data - Datos de la normativa
 * @param filename - Nombre del archivo a descargar
 */
export async function generateNormativePDF(data: NormativePDFData, filename: string) {
  try {
    // Importa jsPDF dinámicamente
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    let yPosition = 20;
    const maxWidth = 170;
    const lineHeight = 7;

    // Título
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(data.title, 20, yPosition);
    yPosition += 15;

    // Categoría y resumen
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(`${data.category} • ${new Date().toLocaleDateString('es-ES')}`, 20, yPosition);
    yPosition += 8;

    // Resumen
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    const summaryLines = doc.splitTextToSize(data.summary, maxWidth);
    doc.text(summaryLines, 20, yPosition);
    yPosition += summaryLines.length * lineHeight + 10;

    // Contenido de secciones
    doc.setFontSize(12);
    data.sections.forEach((section) => {
      // Verificar si necesita nueva página
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      // Título de sección
      doc.setFont('helvetica', 'bold');
      doc.text(section.title, 20, yPosition);
      yPosition += 10;

      // Contenido
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);

      if (section.content) {
        const lines = doc.splitTextToSize(section.content, maxWidth);
        doc.text(lines, 20, yPosition);
        yPosition += lines.length * lineHeight + 5;
      }

      if (section.highlights) {
        section.highlights.forEach((highlight) => {
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
          }
          const hLines = doc.splitTextToSize(`• ${highlight}`, maxWidth - 5);
          doc.text(hLines, 25, yPosition);
          yPosition += hLines.length * lineHeight;
        });
        yPosition += 5;
      }

      if (section.list) {
        section.list.forEach((item) => {
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
          }
          const lLines = doc.splitTextToSize(`• ${item}`, maxWidth - 5);
          doc.text(lLines, 25, yPosition);
          yPosition += lLines.length * lineHeight;
        });
        yPosition += 5;
      }

      if (section.steps) {
        section.steps.forEach((step) => {
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
          }
          doc.setFont('helvetica', 'bold');
          doc.text(`${step.number}. ${step.title}`, 20, yPosition);
          yPosition += 6;
          doc.setFont('helvetica', 'normal');
          const sLines = doc.splitTextToSize(step.detail, maxWidth - 5);
          doc.text(sLines, 25, yPosition);
          yPosition += sLines.length * lineHeight + 2;
        });
        yPosition += 5;
      }

      yPosition += 5;
    });

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Página ${i} de ${pageCount} | Vyntra © 2025 | www.vyntra.com`,
        20,
        doc.internal.pageSize.getHeight() - 10
      );
    }

    // Descargar
    doc.save(filename);
    return true;
  } catch (error) {
    console.error('Error generando PDF:', error);
    return false;
  }
}

/**
 * Descarga un PDF desde una URL (para PDFs pre-generados)
 * @param pdfUrl - URL del PDF
 * @param filename - Nombre del archivo a descargar
 */
export function downloadPDFFromURL(pdfUrl: string, filename: string) {
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Abre un PDF en nueva ventana
 * @param pdfUrl - URL del PDF
 */
export function openPDFInNewWindow(pdfUrl: string) {
  window.open(pdfUrl, '_blank', 'noopener,noreferrer');
}
