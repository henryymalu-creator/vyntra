'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Download, Home, Info, CheckCircle, AlertCircle, HelpCircle, FileText, ExternalLink, MessageCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import { generateWhatsAppLink } from '@/lib/whatsapp'

const normativeContent = {
  'matricula': {
    title: 'Matrícula Vehicular',
    category: 'Trámite Obligatorio',
    readTime: '8 min',
    color: 'blue',
    summary: 'La matrícula es el trámite anual obligatorio que regula tu vehículo. Aquí aprenderás cuándo, cómo y dónde hacerla.',
    pdfUrl: '/pdfs/matricula-vehicular.pdf',
    sections: [
      {
        id: 'que-es',
        title: '¿Qué es la matrícula vehicular?',
        content: `La matrícula es un trámite anual obligatorio en Ecuador para mantener legal tu vehículo. Es emitida por la Agencia Nacional de Tránsito (ANT) y tiene validez de un año.
        
En Quito, la matrícula también genera ingresos para la Municipalidad de Quito. El costo y vencimiento dependen del dígito de tu placa.`,
      },
      {
        id: 'para-ti',
        title: '¿Qué significa para ti?',
        content: `Si tu vehículo NO tiene matrícula renovada:
• No puedes circular legalmente (multa de hasta $1,800)
• Tu vehículo puede ser inmovilizado
• No puedes obtener documentos legales (libertad vehicular)
• Pierdes cobertura de seguros

Si la tienes, tu vehículo es legal y puedes usar todos los servicios sin problemas.`,
        highlights: ['Multa hasta $1,800 sin matrícula', 'Inmovilización del vehículo', 'Válida 1 año desde la fecha']
      },
      {
        id: 'ejemplo',
        title: 'Ejemplo práctico',
        content: `Tu placa termina en "2". 
Según el calendario de Quito, los vehículos terminados en 2 tienen vencimiento el 30 de abril.
Tu matrícula se vence el 30/04/2025.

Opciones:
1. Renovar entre 15/04 y 05/05 (15 días antes y 5 después): Sin multa
2. Renovar después del 05/05: Multa + renovación
3. Si no la renuevas antes del 30/06: Inmovilización

Costo aproximado: Entre $50 y $150 según modelo del auto.`,
        cta: 'Calcular mi vencimiento'
      },
      {
        id: 'como-hacerlo',
        title: 'Paso a paso: Cómo renovar la matrícula',
        steps: [
          {
            number: 1,
            title: 'Ubica el vencimiento',
            detail: 'Tu dígito + calendario oficial = fecha de vencimiento'
          },
          {
            number: 2,
            title: 'Reúne documentos',
            detail: 'Cédula del propietario, cédula del conductor (si aplica), documentos del seguro'
          },
          {
            number: 3,
            title: 'Ve a centro autorizado',
            detail: 'AMT, ITECU, o plataformas autorizadas (puedes hacerlo online)'
          },
          {
            number: 4,
            title: 'Realiza el pago',
            detail: 'Online, débito, crédito o efectivo según el lugar'
          },
          {
            number: 5,
            title: 'Retira la matrícula',
            detail: 'La recibes en forma física o digital en tu email'
          },
        ]
      },
      {
        id: 'documentos',
        title: 'Documentos que necesitas',
        list: [
          'Cédula de Identidad del propietario (original y fotocopia)',
          'Licencia de conducir (si es diferente al propietario)',
          'Título de propiedad del vehículo o documento que acredite posesión',
          'Comprobante pagado del servicio de agua, luz o teléfono (si es reciente propietario)',
          'Póliza de seguros activa (SOAT)',
        ]
      },
      {
        id: 'costos',
        title: 'Costos estimados',
        content: `Los costos varían según:
• Modelo del vehículo (año y tipo)
• Tipo de servicio (actualmente $55-$150 aprox)
• Localidad (misma tarifa a nivel nacional)

En Quito: Espera entre $60 y $150 para vehículos particulares normales.

Multa por vencida: Entre $900-$1,800 (además del costo de renovación).`,
      }
    ],
  } as const,
  'baja-vehicular': {
    title: 'Baja Vehicular - Retiro del Registro',
    category: 'Trámite de Baja',
    readTime: '6 min',
    color: 'red',
    summary: 'Proceso legal para retirar un vehículo del registro. Necesario antes de venderlo, regalarlo o destruirlo.',
    pdfUrl: '/pdfs/baja-vehicular.pdf',
    sections: [
      {
        id: 'que-es',
        title: '¿Qué es la baja vehicular?',
        content: `La baja vehicular es el trámite legal que cancela el registro de tu vehículo ante la ANT. Una vez que das de baja un auto, ya no eres responsable legalmente de él.

Esto es obligatorio si:
• Lo vas a vender
• Lo vas a regalar
• Lo vas a destruir/charatizar
• No lo vas a usar más`,
      },
      {
        id: 'para-ti',
        title: '¿Qué significa para ti?',
        content: `Sin baja vehicular:
• Sigues siendo responsable si alguien causa un accidente con tu auto
• No puedes vender legalmente (comprador queda sin título válido)
• Sigues pagando matrícula innecesariamente
• Riesgo de multas si el nuevo propietario comete infracción

CON baja:
• Transferencia limpia y legal
• Fin de responsabilidad legal
• Dinero ahorrado en futuras matrículas`,
        highlights: ['Responsabilidad legal sigue siendo tuya', 'No puedes vender sin baja', 'Costo: $15-30 aprox']
      },
      {
        id: 'ejemplo',
        title: 'Caso práctico: Vender tu auto',
        content: `Tienes un Chevrolet Aveo 2015 que quieres vender.

CORRECTO:
1. Das de baja el auto en AMT/ANT
2. Consigues el certificado de baja
3. Das los documentos al comprador
4. Comprador tramita la baja en su nombre (cambio de propietario)

INCORRECTO (riesgoso):
1. Vendes sin dar de baja
2. Comprador conduce con tus documentos
3. Si causa choque/multa → Tú eres responsable
4. ¡Todavía te llegan cuentas de matrícula!`,
        cta: 'Iniciar trámite de baja'
      },
      {
        id: 'tipo-bajas',
        title: 'Tipos de baja vehicular',
        list: [
          'Baja ordinaria: Venta normal a persona',
          'Baja por cambio propietario: Transferencia entre personas',
          'Baja por destrucción: Si el auto es chatarra (requiere certificado)',
          'Baja por robo/hurto: Con denuncia policial',
          'Baja por daño total: Si está dado de perdida en seguro'
        ]
      },
      {
        id: 'documentos',
        title: 'Documentos necesarios',
        list: [
          'Cédula del propietario (original y copia)',
          'Título de propiedad del vehículo',
          'Matrícula vigente o fotocopia',
          'RTE (si está vencida, primera matrícula)',
          'Si hay deuda: Autorización del acreedor',
          'Si hay litigios: Orden del juzgado'
        ]
      },
      {
        id: 'proceso',
        title: 'Paso a paso para dar de baja',
        steps: [
          {
            number: 1,
            title: 'Verifica deuda',
            detail: 'Comprueba que no haya multas ni embargos pendientes'
          },
          {
            number: 2,
            title: 'Reúne documentos',
            detail: 'Cédula, título, matrícula, RTE'
          },
          {
            number: 3,
            title: 'Dirígete a ventanilla AMT/ANT',
            detail: 'Lleva todos los originales + copias'
          },
          {
            number: 4,
            title: 'Diligencia formulario',
            detail: 'El personal te entregará el formato'
          },
          {
            number: 5,
            title: 'Realiza pago',
            detail: 'Tarifa: Aproximadamente $20-30'
          },
          {
            number: 6,
            title: 'Retira certificado',
            detail: 'Te dan el cert. de baja (entrégalo al nuevo dueño o guárdalo)'
          }
        ]
      }
    ],
  } as const,
  'prescripcion-multas': {
    title: 'Prescripción de Multas de Tránsito',
    category: 'Derechos',
    readTime: '7 min',
    color: 'yellow',
    summary: 'Las multas de tránsito prescriben legalmente. Conoce cómo saber si puedes recuperar dinero.',
    pdfUrl: '/pdfs/prescripcion-multas.pdf',
    sections: [
      {
        id: 'que-es',
        title: '¿Qué es prescripción de multas?',
        content: `La prescripción es un derecho que extingue la cobranza de una deuda después de cierto tiempo sin que la autoridad la ejecute.

En Ecuador, las multas de tránsito prescriben en 3 años desde que se impusieron.

Esto significa: Si te pusieron multa hace 3+ años y nadie ha cobrado, legalmente ya no debes pagar.`,
      },
      {
        id: 'quien-puede',
        title: '¿Quién puede reclamar prescripción?',
        content: `Puedes reclamar prescripción si:
• Tienes multa de tránsito de más de 3 años atrás
• La multa NO ha sido cobrada/ejecutada
• Tienes el documento de la multa

NOT puedes si:
• Ya has pagado parcialmente (se reinicia el contador)
• Hay un juicio abierto
• La multa es por daño material (otro plazo)`,
        highlights: ['Plazo: 3 años desde imposición', 'Debes tener el documento', 'No debe estar en cobranza activa']
      },
      {
        id: 'ejemplo',
        title: 'Caso práctico: Recuperar dinero',
        content: `Te pusieron multa por exceso de velocidad en marzo 2021: $150

Hoy es febrero 2026 (5 años después):
✓ Han pasado 3+ años
✓ Nadie ha cobrado
✓ Tienes el documento

ACCIÓN: Pedes ir a AMT y presentar reclamo de prescripción
RESULTADO: La multa se anula → No debes pagar

Si AMT se niega → Recurso de amparo ante juzgado (con abogado).`,
        cta: 'Verificar mis multas prescritas'
      },
      {
        id: 'como-verificar',
        title: '¿Cómo saber si mi multa prescribió?',
        list: [
          'Accede al portal de ANT (www.ant.gob.ec)',
          'Busca "consultar multas por placa"',
          'Ingresa tu número de placa',
          'Descarga el historial de multas',
          'Calcula: Fecha de multa + 3 años = Prescripción'
        ]
      },
      {
        id: 'proceso',
        title: 'Proceso de reclamación',
        steps: [
          {
            number: 1,
            title: 'Reúne documentos',
            detail: 'Cédula + documento de multa (foto o original)'
          },
          {
            number: 2,
            title: 'Acude a oficina AMT',
            detail: 'Lleva todos los originales'
          },
          {
            number: 3,
            title: 'Solicita reclamo',
            detail: 'Asegúrate de mencionar: "Reclamo por prescripción de multa"'
          },
          {
            number: 4,
            title: 'Argumento legal',
            detail: 'Artículo 9 del Código de Procedimiento Civil (prescripción 3 años)'
          },
          {
            number: 5,
            title: 'Si se niegan',
            detail: 'Consulta con abogado → Recurso de amparo ante juzgado'
          }
        ]
      }
    ],
  } as const,
  'patios-retencion': {
    title: 'Patios de Retención - Recuperar tu Vehículo',
    category: 'Emergencia',
    readTime: '5 min',
    color: 'orange',
    summary: 'Tu vehículo está en un patio de retención. Guía completa para recuperarlo legalmente.',
    pdfUrl: '/pdfs/patios-retencion.pdf',
    sections: [
      {
        id: 'que-es',
        title: '¿Qué es un patio de retención?',
        content: `Un patio de retención es un lugar donde AMT/ANT guarda vehículos infractor. Tu auto va allá si:
• Manejabas sin licencia
• Causaste accidente con daño
• Múltiples infracciones graves
• Vehículo no tiene documentos`,
      },
      {
        id: 'costos',
        title: '¿Cuánto cuesta recuperar el auto?',
        content: `El costo incluye:
1. Multa de la infracción: $100-2000
2. Depósito patio: $1-2 por día de retención
3. Grúa: $50-100 (si fue remolcado)
4. Resolución de conflicto (si aplica)

Total estimado: $300-1500 dependiendo del caso

Mayor costo = Mayor tiempo en patio`,
        highlights: ['Costo diario: $1-2', 'Multa base: $100+', 'Total rápido: $300+']
      },
      {
        id: 'proceso',
        title: 'Pasos para recuperar el vehículo',
        steps: [
          {
            number: 1,
            title: 'Identifica el patio',
            detail: 'Llama a AMT para saber dónde está tu auto'
          },
          {
            number: 2,
            title: 'Paga la multa',
            detail: 'AMT te dice el monto exacto adeudado'
          },
          {
            number: 3,
            title: 'Autorización de liberación',
            detail: 'Obtén el permiso firmado de AMT'
          },
          {
            number: 4,
            title: 'Paga al patio',
            detail: 'Deposito + grúa + almacenamiento'
          },
          {
            number: 5,
            title: 'Retira el vehículo',
            detail: 'Con todos los papeles firmados'
          }
        ]
      },
      {
        id: 'evitar',
        title: 'Cómo evitar patio de retención',
        list: [
          'Mantén licencia vigente siempre',
          'Cumple con matrícula anual',
          'Respeta normas de tránsito',
          'No conduzcas bajo influencia',
          'Asegura tu vehículo con SOAT'
        ]
      }
    ],
  } as const,
  'parte-propio': {
    title: 'Parte Propio - Reporte de Choque',
    category: 'Accidentes',
    readTime: '6 min',
    color: 'purple',
    summary: 'Cómo llenar correctamente el parte propio sin comprometer tu defensa legal.',
    pdfUrl: '/pdfs/parte-propio.pdf',
    sections: [
      {
        id: 'que-es',
        title: '¿Qué es el parte propio?',
        content: `El parte propio es un reporte que hacen dos conductores mutuamente después de un choque o colisión sin heridos graves.

NO se llama a policía. Los conductores mismos diligencian el documento.

NO es binding legalmente, pero SÍ es importante para seguros.`,
      },
      {
        id: 'cuando',
        title: '¿Cuándo se usa el parte propio?',
        content: `Úsalo cuando:
✓ No hay heridos
✓ Ambos conductores están de acuerdo en los hechos
✓ No hay terceras personas involucradas
✓ El daño es menor

NO la uses si:
✗ Hay personas lesionadas
✗ Hay daño material grande
✗ Hay discrepancia en versiones
✗ Hay testigos conflictivos`,
        highlights: ['Solo sin heridos', 'Acuerdo mutuo necesario', 'No vincula legalmente pero documenta']
      },
      {
        id: 'datos',
        title: 'Información que debes incluir',
        list: [
          'Placa y datos de ambos vehículos',
          'Nombre y cédula de ambos conductores',
          'Licencia de conducir de ambos',
          'Seguro (SOAT de ambos) + póliza',
          'Lugar exacto del choque (dirección)',
          'Hora y fecha del accidente',
          'Descripción breve de lo ocurrido',
          'Fotografías del daño (desde ángulos)',
          'Firma de ambos conductores'
        ]
      },
      {
        id: 'errores',
        title: 'Errores que NO debes cometer',
        list: [
          'Admitir culpa completamente ("fue mi error")',
          'Dejar espacios en blanco',
          'Firmar sin leer todo',
          'No tomar fotos de evidencia',
          'Omitir información de testigos',
          'Escribir información falsa',
          'No guardar copia para ti'
        ]
      },
      {
        id: 'proceso',
        title: 'Paso a paso',
        steps: [
          {
            number: 1,
            title: 'Verifica seguridad',
            detail: 'Ambos salgan del vehículo con seguridad'
          },
          {
            number: 2,
            title: 'Intercambia datos',
            detail: 'Cédula, teléfono, seguro, placa'
          },
          {
            number: 3,
            title: 'Toma fotos',
            detail: 'De ambos vehículos, daño, placas, escena'
          },
          {
            number: 4,
            title: 'Diligencia parte',
            detail: 'Con bolígrafo, letra clara, AMBOS firman'
          },
          {
            number: 5,
            title: 'Guarda copia',
            detail: 'Guarda foto del documento para ti'
          }
        ]
      }
    ],
  } as const,
  'libertad-vehicular': {
    title: 'Libertad Vehicular - Certificado de No Deuda',
    category: 'Documentos',
    readTime: '4 min',
    color: 'green',
    summary: 'Documento que certifica que tu vehículo no tiene deudas. Necesario para venta o crédito.',
    pdfUrl: '/pdfs/libertad-vehicular.pdf',
    sections: [
      {
        id: 'que-es',
        title: '¿Qué es libertad vehicular?',
        content: `La libertad vehicular es un certificado que emite AMT/ANT que certifica que tu vehículo:

✓ NO tiene deudas (multas, matrículas, RTE)
✓ NO tiene embargos judiciales
✓ NO tiene salvoconductos pendientes
✓ Está en buen estatus legal`,
      },
      {
        id: 'para-que',
        title: '¿Para qué sirve?',
        content: `Necesitas libertad vehicular cuando:
• Vas a vender el auto
• Vas a pedir un crédito (el banco lo requiere)
• Vas a cambiar de propietario
• Vas a exportar el vehículo
• Es requisito en algunos trámites`,
      },
      {
        id: 'proceso',
        title: 'Cómo obtener libertad vehicular',
        steps: [
          {
            number: 1,
            title: 'Verifica estado',
            detail: 'Consulta en AMT si tienes deudas'
          },
          {
            number: 2,
            title: 'Paga deudas',
            detail: 'Si hay multas/matrículas vencidas'
          },
          {
            number: 3,
            title: 'Acude a AMT',
            detail: 'Lleva cédula + título de propiedad'
          },
          {
            number: 4,
            title: 'Solicita certificado',
            detail: 'Especifica: "Libertad vehicular"'
          },
          {
            number: 5,
            title: 'Obtén el documento',
            detail: 'Firmado y sellado por AMT'
          }
        ]
      },
      {
        id: 'tiempo',
        title: 'Tiempo y costo',
        content: `Tiempo: 1-2 días hábiles (a veces mismo día)
Costo: Gratuito (solo si no hay deudas)

Si tienes deuda:
+ Multa sin pagar
+ Matrícula vencida
Primero debes pagar, luego solicitas.`,
      }
    ],
  } as const,
  'chatarizacion': {
    title: 'Chatarización Vehicular - Dar de Baja Definitiva',
    category: 'Desecho',
    readTime: '7 min',
    color: 'slate',
    summary: 'Proceso legal para destruir un vehículo inservible. Definitivo e irreversible.',
    pdfUrl: '/pdfs/chatarizacion.pdf',
    sections: [
      {
        id: 'que-es',
        title: '¿Qué es chatarización vehicular?',
        content: `La chatarización es el trámite legal que permite DESTRUIR completamente un vehículo que ya no funciona.

Una vez chatarizado, el vehículo desaparece del registro nacional y NO puede ser vuelto a registrar jamás.

Es definitivo e irreversible.`,
      },
      {
        id: 'casos',
        title: '¿Cuándo chatarizar un auto?',
        content: `Chatariza cuando:
• El auto tiene daño total (accidente grave)
• Cuesta más reparar que comprar otro
• Le diagnosticaron pérdida total en seguro
• El motor está arruinado
• Está en patios hace años sin reclamar
• Tiene título "pérdida total"

NOT chatarices si:
• El auto aún funciona
• Solo tiene daño cosmético
• Quieres venderlo como "repuestos"`,
      },
      {
        id: 'requisitos',
        title: 'Requisitos para chatarización',
        list: [
          'Cédula del propietario',
          'Título de propiedad del vehículo',
          'Matrícula (si existe)',
          'Certificado de pérdida total de seguro (si aplica)',
          'Permiso de destrucción de autoridad ambiental',
          'Número de chasis visible'
        ]
      },
      {
        id: 'proceso',
        title: 'Pasos para chatarizar',
        steps: [
          {
            number: 1,
            title: 'Contacta desguazadora autorizada',
            detail: 'Debe estar certificada por MAE (Ministerio Ambiente)'
          },
          {
            number: 2,
            title: 'Solicita inspección',
            detail: 'Verifican estado del vehículo'
          },
          {
            number: 3,
            title: 'Acuerda precio',
            detail: 'Por peso de chatarra (varía en mercado)'
          },
          {
            number: 4,
            title: 'Tramita documento',
            detail: 'Desguazadora gestiona ante AMT'
          },
          {
            number: 5,
            title: 'Destrucción',
            detail: 'Vehículo es desarmado y reciclado'
          },
          {
            number: 6,
            title: 'Certificado final',
            detail: 'AMT cancela registro. Fin del trámite'
          }
        ]
      },
      {
        id: 'valor',
        title: '¿Cuánto pagan por chatarra?',
        content: `Depende del:
• Peso total del vehículo
• Precio del hierro en mercado (varía diario)
• Condición de partes recuperables

Promedio: $200-500 por vehículo completo

Los motores bien conservados pueden valer $100-300 adicionales.`,
      }
    ],
  } as const,
  'procesos-judiciales': {
    title: 'Procesos Judiciales de Tránsito - Defensa Legal',
    category: 'Legal',
    readTime: '10 min',
    color: 'indigo',
    summary: 'Cómo defenderte en juzgado contra multas, sanciones o denuncias de tránsito.',
    pdfUrl: '/pdfs/procesos-judiciales.pdf',
    sections: [
      {
        id: 'que-es',
        title: '¿Qué es un proceso judicial de tránsito?',
        content: `Es un juicio donde te defiendes legalmente contra:
• Una multa que consideras injusta
• Una denuncia por accidente
• Una sanción de AMT
• Una acusación de infracción grave

El juez decidirá si tienes razón o no.`,
      },
      {
        id: 'etapas',
        title: 'Etapas del proceso judicial',
        steps: [
          {
            number: 1,
            title: 'Presentación de demanda',
            detail: 'Abogado presenta escrito en juzgado con argumentos'
          },
          {
            number: 2,
            title: 'Notificación a AMT',
            detail: 'Juzgado notifica a la entidad demandada'
          },
          {
            number: 3,
            title: 'Contestación',
            detail: 'AMT presenta su defensa'
          },
          {
            number: 4,
            title: 'Pruebas',
            detail: 'Presentan documentos, fotos, testigos'
          },
          {
            number: 5,
            title: 'Audiencia',
            detail: 'Comparecen ante juez (a veces virtual)'
          },
          {
            number: 6,
            title: 'Sentencia',
            detail: 'Juez dicta fallo: Te favorece o no'
          }
        ]
      },
      {
        id: 'documentos',
        title: 'Documentos que necesitas guardar',
        list: [
          'Copia de la multa/denuncia original',
          'Fotos del lugar del incidente',
          'Testimonios de testigos (escritos)',
          'Video del dashcam (si tienes)',
          'Comunicaciones con AMT',
          'Prueba de pago si lo hiciste',
          'Documentos del vehículo (licencia, matrícula)',
          'Reportes de seguro (si aplica)'
        ]
      },
      {
        id: 'costos',
        title: '¿Cuáles son los costos?',
        content: `Gastos en juicio:
• Honorarios abogado: $300-1500+ (depende complejidad)
• Derechos de corte: $20-50
• Notificaciones: $10-30
• Fotocopias/documentos: $5-20

Total estimado: $350-1600 (sin incluir abogado particular)

Pero si ganas, puedes cobrar costos a la otra parte.`,
      },
      {
        id: 'defensas',
        title: 'Argumentos de defensa comunes',
        list: [
          'Agente cometió error en identificación de placa',
          'Multa fue diligenciada incorrectamente (datos faltos)',
          'No había señalética visible en el lugar',
          'Causal de fuerza mayor (emergencia médica)',
          'Prueba insuficiente (solo versión del agente)',
          'Violación de derechos procedimentales',
          'Vía fue modificada sin avisarle (peatonales nuevas)'
        ]
      }
    ],
  } as const,
} as const

export default function NormativaDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const content = normativeContent[id as keyof typeof normativeContent]

  if (!content) {
    return (
      <div className="min-h-screen bg-vyntra-bg-main text-ink pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Contenido no encontrado</h1>
          <Link href="/normativa">
            <Button variant="primary">Volver al catálogo</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-vyntra-bg-main text-ink">
      {/* Breadcrumb & Navigation */}
      <div className="sticky top-[80px] bg-white/80 backdrop-blur-md border-b border-vyntra-border z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-ink-muted">
            <Link href="/normativa" className="flex items-center gap-1 hover:text-ink transition">
              <Home className="w-4 h-4" />
              <span>Normativa</span>
            </Link>
            <span>/</span>
            <span className="text-ink">{content.title}</span>
          </div>
          <Button variant="ghost" size="sm" className="text-ink-muted">
            <Download className="w-4 h-4 mr-2" />
            Descargar PDF
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-vyntra-brand/10 border border-vyntra-brand/20 rounded-full mb-4">
            <span className="w-2 h-2 bg-vyntra-brand rounded-full" />
            <span className="text-xs font-medium text-vyntra-brand">{content.category}</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-4 text-ink">
            {content.title}
          </h1>
          
          <p className="text-xl text-ink-muted mb-6">
            {content.summary}
          </p>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-sm text-ink-muted">
              <FileText className="w-4 h-4" />
              {content.readTime} de lectura
            </div>
            <div className="flex items-center gap-2 text-sm text-ink-muted">
              <CheckCircle className="w-4 h-4" />
              Información oficial
            </div>
            <div className="flex items-center gap-2 text-sm text-ink-muted">
              <AlertCircle className="w-4 h-4" />
              Actualizado a 2025
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12 mb-16">
          {'sections' in content && content.sections ? (
            content.sections.map((section: any) => (
              <section key={section.id} id={section.id} className="scroll-mt-32">
                <div className="grid md:grid-cols-4 gap-8">
                  {/* Sidebar Index */}
                  <div className="hidden md:block">
                    <div className="sticky top-32 space-y-2">
                      <div className="text-xs uppercase tracking-wide text-ink-muted font-semibold">En esta sección</div>
                      {content.sections?.map((sec: any) => (
                        <a
                          key={sec.id}
                          href={`#${sec.id}`}
                          className={`block text-sm py-1 transition ${
                            sec.id === section.id
                              ? 'text-vyntra-brand font-semibold'
                              : 'text-ink-muted hover:text-ink'
                          }`}
                        >
                          {sec.title}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="md:col-span-3">
                    <h2 className="text-3xl font-bold mb-6 text-ink">{section.title}</h2>
                    
                    {section.content && (
                      <div className="text-ink-muted leading-relaxed space-y-4 mb-6">
                        {section.content.split('\n\n').map((paragraph: string, idx: number) => (
                          <p key={idx}>{paragraph}</p>
                        ))}
                      </div>
                    )}

                    {section.highlights && (
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-6">
                        <div className="flex items-start gap-4">
                          <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-bold text-yellow-400 mb-3">Puntos clave</h4>
                            <ul className="space-y-2">
                              {section.highlights.map((item: string, idx: number) => (
                                <li key={idx} className="text-sm text-yellow-300/90 flex items-start gap-2">
                                  <span className="text-yellow-400 mt-1">•</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {section.steps && (
                      <div className="space-y-4 mb-6">
                        {section.steps.map((step: any) => (
                          <div key={step.number} className="flex gap-4 pb-4 border-b border-vyntra-border last:border-0">
                            <div className="w-10 h-10 bg-vyntra-brand/20 border border-vyntra-brand/40 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="font-bold text-vyntra-brand">{step.number}</span>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1 text-ink">{step.title}</h4>
                              <p className="text-sm text-ink-muted">{step.detail}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.list && (
                      <ul className="space-y-2 mb-6">
                        {section.list.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3 text-ink-muted">
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.cta && (
                      <div className="mt-8">
                        <Button variant="primary" className="gap-2">
                          <span>{section.cta}</span>
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            ))
          ) : null}
        </div>

        {/* CTA for Legal Help */}
        <div className="bg-gradient-to-r from-vyntra-brand/10 to-blue-500/10 border border-white/10 rounded-2xl p-8 mb-12">
          <div className="flex items-start gap-4">
            <HelpCircle className="w-6 h-6 text-vyntra-brand flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">¿Aún tienes dudas?</h3>
              <p className="text-white/70 mb-4">
                Consulta directamente con nuestros abogados especializados en derecho de tránsito.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="sm">
                  Agendar Consulta
                </Button>
                <Button variant="secondary" size="sm">
                  Chat por WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* PDF Download */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
          <Download className="w-12 h-12 text-vyntra-brand mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Descarga la norma oficial</h3>
          <p className="text-white/70 mb-6">
            Acceso directo al documento PDF de la norma explicada en lenguaje simple.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {content && 'pdfUrl' in content && content.pdfUrl && (
              <a href={content.pdfUrl} download target="_blank" rel="noopener noreferrer">
                <Button variant="primary" className="gap-2">
                  <Download className="w-4 h-4" />
                  Descargar PDF Oficial
                </Button>
              </a>
            )}
            <a href="https://www.ant.gob.ec" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Ver en sitio ANT
              </Button>
            </a>
          </div>
          <p className="text-xs text-white/50 mt-4">
            Documento de la ANT • Actualizado a febrero 2025
          </p>
        </div>

        {/* WhatsApp Consultation */}
        <div className="mt-12 bg-green-500/10 border border-green-500/30 rounded-xl p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2 text-ink">¿Aún tienes preguntas específicas?</h3>
              <p className="text-ink-muted mb-4">
                Contacta directamente por WhatsApp para consulta inmediata. Tiempo de respuesta: menos de 1 hora.
              </p>
              <a href={generateWhatsAppLink('normative')} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" className="gap-2 bg-green-600 hover:bg-green-700">
                  <MessageCircle className="w-4 h-4" />
                  Iniciar chat por WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
