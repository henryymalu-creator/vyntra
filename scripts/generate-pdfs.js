#!/usr/bin/env node

/**
 * Script para generar PDFs de normativa automáticamente
 * Ejecutar: node scripts/generate-pdfs.js
 */

const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');

// Crear directorio de PDFs si no existe
const pdfDir = path.join(__dirname, '../public/pdfs');
if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
  console.log('✅ Carpeta /public/pdfs/ creada');
}

// Contenido de normativa para generar PDFs
const normativeData = {
  'matricula-vehicular': {
    title: 'Matrícula Vehicular',
    category: 'Trámite Obligatorio',
    sections: [
      {
        title: '¿Qué es la matrícula vehicular?',
        content: `La matrícula es un trámite anual obligatorio en Ecuador para mantener legal tu vehículo. Es emitida por la Agencia Nacional de Tránsito (ANT) y tiene validez de un año.

En Quito, la matrícula también genera ingresos para la Municipalidad de Quito. El costo y vencimiento dependen del dígito de tu placa.`
      },
      {
        title: '¿Qué significa para ti?',
        content: `Si tu vehículo NO tiene matrícula renovada:
• No puedes circular legalmente (multa de hasta $1,800)
• Tu vehículo puede ser inmovilizado
• No puedes obtener documentos legales (libertad vehicular)
• Pierdes cobertura de seguros

Si la tienes, tu vehículo es legal y puedes usar todos los servicios sin problemas.`
      },
      {
        title: 'Pasos para renovar',
        content: `1. Ubica el vencimiento según tu dígito
2. Reúne documentos (cédula, título, seguros)
3. Ve a centro autorizado (AMT, ITECU)
4. Realiza el pago
5. Retira la matrícula

Costo estimado: $55-$150 aprox.
Validez: 1 año desde la fecha de emisión`
      }
    ]
  },
  'baja-vehicular': {
    title: 'Baja Vehicular',
    category: 'Trámite Importante',
    sections: [
      {
        title: '¿Qué es la baja vehicular?',
        content: `La baja vehicular es el proceso mediante el cual un vehículo se retira de circulación de forma oficial. Cancela la registración del vehículo en la ANT.

Una vez realizada la baja, el vehículo no puede circular y no genera más obligaciones tributarias.`
      },
      {
        title: 'Cuándo hacerla',
        content: `Debes tramitar la baja vehicular cuando:
• Vendes el vehículo para que el comprador lo registre
• Chatarizas el vehículo
• Donas el vehículo
• El vehículo se pierde (accidente total)
• Quieres cancelar la registración`
      },
      {
        title: 'Requisitos',
        content: `Documentos obligatorios:
• Solicitud de baja (formato ANT)
• Matrícula vigente
• Cédula del propietario
• Comprobante de pago

Si el vehículo se perdió: Denuncia policial
Si es robo: Reporte ante Fiscalía`
      }
    ]
  },
  'prescripcion-multas': {
    title: 'Prescripción de Multas',
    category: 'Gestión Legal',
    sections: [
      {
        title: '¿Qué es la prescripción?',
        content: `La prescripción es el tiempo límite que tiene la administración para cobrar una deuda. Después de este período, la deuda se extingue legalmente.

En Ecuador, las multas de tránsito prescriben después de 3 AÑOS sin cobro ni notificación oficial.`
      },
      {
        title: 'Cómo verificar si tu multa prescribió',
        content: `Pasos:
1. Accede a: https://consultapagos.ant.gob.ec
2. Ingresa tu cédula
3. Revisa el "Estado de la multa" y "Fecha de infracción"
4. Que hayan pasado 3+ años = Multa prescrita

Si prescribió: Puedes reportarla para que sea cancelada del sistema.`
      },
      {
        title: 'Qué hacer si tienes multas',
        content: `Opciones:
A) Si necesitas conducir: Pagar antes de que prescriba
B) Si esperas 3 años: Verificar prescripción
C) Si es injusta: Impugnarla en juzgado

⚠️ Importante: La falta de pago puede resultar en:
- Retención del vehículo en patios
- Impedimento para obtener documentos
- Registro en antecedentes tributarios`
      }
    ]
  },
  'patios-retencion': {
    title: 'Patios de Retención',
    category: 'Recuperación Vehicular',
    sections: [
      {
        title: '¿Qué es un patio de retención?',
        content: `Un patio de retención es un lugar donde la AMT guarda vehículos que foram inmovilizados por:
• Multas impagadas
• Documentos incompletos
• Infracciones graves
• Orden judicial`
      },
      {
        title: 'Costos de retención diarios',
        content: `Motocicleta: $1/día
Livianos (carros): $3/día
Pesados (3.5-12 TN): $9/día
Pesados (>12.1 TN): $15/día

Costo de liberación:
• Pago de multa + costo diario de retención`
      },
      {
        title: 'Cómo recuperar tu vehículo',
        content: `Pasos:
1. Verifica dónde está (Carapungo, Bicentenario, etc.)
2. Paga las multas en Banco del Pacífico
3. Paga los costos de retención
4. Presenta documentos en el patio
5. Retira tu vehículo

Horario: Lunes a Viernes 08:00-17:00`
      }
    ]
  },
  'parte-propio': {
    title: 'Parte Propio (Accidentes)',
    category: 'Procedimiento Legal',
    sections: [
      {
        title: '¿Qué es un Parte Propio?',
        content: `Un Parte Propio es el documento que levanta la policía de tránsito cuando hay un accidente entre vehículos, sin culpables evidentes.

Es una acta de constatación de hechos que cada conductor puede usar para reclamos posteriores.`
      },
      {
        title: 'Cuándo solicitar un Parte',
        content: `Necesitas el Parte cuando:
• Hay choque con otro vehículo
• Hay daños a propiedad
• Quieres dejar registro oficial
• Necesitas para seguros
• Hay necesidad de prueba legal`
      },
      {
        title: 'Cómo obtener el Parte',
        content: `Opciones:
1. INMEDIATO: Llama a 911 y policía hace el Parte en el lugar
2. POSTERIOR: Ve a la Fiscalía local y solicita generación del Parte
3. DIGITAL: Algunos pueden hacerse por plataforma de AMT

Documentos necesarios:
- Cédula del conductor
- Licencia de conducir
- Placas del vehículo`
      }
    ]
  },
  'libertad-vehicular': {
    title: 'Libertad Vehicular',
    category: 'Documentación Necesaria',
    sections: [
      {
        title: '¿Qué es la Libertad Vehicular?',
        content: `La Libertad Vehicular es un certificado que prueba que tu vehículo NO tiene:
• Multas impagadas
• Procesos judiciales
• Bloqueos tributarios
• Gravámenes pendientes

Es obligatoria para vender el vehículo.`
      },
      {
        title: '¿Para qué la necesitas?',
        content: `La Libertad Vehicular es requisito para:
• Vender el vehículo
• Transferir a otro propietario
• Obtener financiamiento
• Hacer exportación de vehículo
• Cambiar de servicio (particular a taxi)`
      },
      {
        title: 'Cómo obtenerla',
        content: `Pasos:
1. Entra a: https://consultaweb.ant.gob.ec
2. Solicita el certificado de Libertad
3. Paga el valor ($8 aproximadamente)
4. Recibes en tu email

Tiempo: Inmediato (en línea)
Validez: Permanente (hasta que tengas nueva deuda)`
      }
    ]
  },
  'chatarizacion': {
    title: 'Chatarización de Vehículos',
    category: 'Baja Definitiva',
    sections: [
      {
        title: '¿Qué es la Chatarización?',
        content: `La chatarización es el proceso de desmantelamiento total de un vehículo para convertirlo en materia prima reciclable.

Es la forma más definitiva de dar de baja un vehículo.`
      },
      {
        title: 'Requisitos para chatarizar',
        content: `Documentos obligatorios:
• Solicitud de baja por chatarización
• Matrícula original
• Cédula del propietario
• Placas del vehículo
• Certificado de recepción del chatarreo

Costo: $8 USD (sin incluir comisión bancaria)`
      },
      {
        title: 'Cómo hacerlo',
        content: `Pasos:
1. Busca centro de chatarización autorizado
2. Entrégales el vehículo
3. Obtén certificado de recepción
4. Dirígete a la ANT con documentos
5. Solicita baja por chatarización
6. Recibe constancia de baja

Efecto: Vehículo dado de baja permanentemente en el sistema`
      }
    ]
  },
  'procesos-judiciales': {
    title: 'Procesos Judiciales de Tránsito',
    category: 'Asuntos Legales',
    sections: [
      {
        title: '¿Qué es un Proceso Judicial de Tránsito?',
        content: `Es un procedimiento legal ante juez donde se resuelven disputas relacionadas con:
• Multas impugnadas (defensas)
• Accidentes entre vehículos
• Responsabilidades civiles
• Infracciones graves
• Daños causados en tránsito`
      },
      {
        title: 'Etapas del proceso',
        content: `1. DEMANDA: Se presenta la denuncia ante juzgado
2. NOTIFICACIÓN: Se notifica a la parte demandada
3. CONTESTACIÓN: El demandado presenta su defensa
4. PRUEBA: Se presentan evidencias
5. SENTENCIA: Juez dicta su fallo
6. APELACIÓN: Se puede apelar la sentencia`
      },
      {
        title: 'Cómo defenderte',
        content: `Recomendaciones:
• Reúne toda evidencia (partes, fotos, testigos)
• Contrata abogado especializado en tránsito
• Presenta recursos de impugnación en tiempo
• Guarda copia de todos los documentos
• Asiste a todas las audiencias

Tiempo: 6 meses a 2 años aproximadamente
Costo: Según abogado + costas judiciales`
      }
    ]
  }
};

/**
 * Función para generar PDF con el contenido de normativa
 */
function generatePDF(filename, title, category, sections) {
  try {
    const doc = new jsPDF();
    let yPosition = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const maxWidth = pageWidth - (margin * 2);

    // Encabezado
    doc.setFontSize(18);
    doc.setTextColor(15, 31, 61); // #0F1F3D (azul oscuro)
    doc.text(title, margin, yPosition);
    
    yPosition += 10;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Categoría: ${category}`, margin, yPosition);
    
    yPosition += 12;
    doc.setDrawColor(27, 58, 111); // #1B3A6F (azul más claro)
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    
    yPosition += 8;

    // Procesar secciones
    sections.forEach((section, sectionIndex) => {
      // Verificar espacio disponible
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = 20;
      }

      // Título de sección
      doc.setFontSize(12);
      doc.setTextColor(27, 58, 111); // Azul oscuro
      doc.setFont(undefined, 'bold');
      doc.text(section.title, margin, yPosition);
      yPosition += 8;

      // Contenido
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.setFont(undefined, 'normal');
      
      const lines = doc.splitTextToSize(section.content, maxWidth);
      doc.text(lines, margin, yPosition);
      yPosition += (lines.length * 5) + 8;
    });

    // Footer
    const pageCount = doc.internal.pages.length - 1;
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Página ${i} de ${pageCount} | Vyntra © 2026`,
        margin,
        pageHeight - 10
      );
    }

    // Guardar PDF
    const filepath = path.join(pdfDir, filename);
    doc.save(filepath);
    console.log(`✅ PDF generado: ${filename}`);
  } catch (error) {
    console.error(`❌ Error generando ${filename}:`, error.message);
  }
}

/**
 * Ejecutar generación de todos los PDFs
 */
console.log('🚀 Iniciando generación de PDFs...\n');

Object.entries(normativeData).forEach(([key, data]) => {
  generatePDF(
    `${key}.pdf`,
    data.title,
    data.category,
    data.sections
  );
});

console.log('\n✅ ¡Todos los PDFs han sido generados exitosamente!');
console.log('📁 Ubicación: /public/pdfs/');
