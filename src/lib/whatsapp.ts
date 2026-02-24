/**
 * WhatsApp Integration Configuration
 * Centraliza números y mensajes para La integración de WhatsApp en toda la app
 */

// Número de WhatsApp Business (sin + ni espacios)
export const WHATSAPP_NUMBER = '593980639640'

// Mensajes pre-definidos por caso de uso
export const WHATSAPP_MESSAGES = {
  general: 'Hola Henry, tengo una pregunta sobre Vyntra. ¿Puedes ayudarme?',
  
  normative: 'Hola, tengo una pregunta sobre normativa vehicular. ¿Puedo consultar?',
  
  consultation: 'Necesito una consulta legal sobre derechos de tránsito. ¿Cuál es tu disponibilidad?',
  
  multa: 'Tengo una multa que creo es injusta. ¿Puedes ayudarme a impugnarla?',
  
  baja: 'Necesito ayuda para dar de baja mi vehículo. ¿Cuál es el proceso?',
  
  prescripcion: 'Tengo multas viejas. ¿Pueden prescribir? ¿Cómo lo verifico?',
  
  patio: 'Mi vehículo está en un patio de retención. ¿Cómo puedo recuperarlo?',
  
  parte: 'Tuve un choque y necesito orientación legal. ¿Puedo consultar?',
  
  libertad: 'Necesito libertad vehicular para vender mi auto. ¿Cómo la obtengo?',
  
  chatarra: 'Quiero chatarizar mi vehículo. ¿Cuál es el procedimiento?',
  
  proceso: 'Tengo un proceso judicial de tránsito. ¿Puedes asesorarme?',
  
  dashboard: 'Tengo problemas con mi dashboard. ¿Puedo reportarlo?'
}

/**
 * Genera URL de WhatsApp con mensaje personalizado
 * @param message - Mensaje pre-definido (clave de WHATSAPP_MESSAGES)
 * @returns URL completa para redireccionar a WhatsApp
 */
export function generateWhatsAppLink(message: keyof typeof WHATSAPP_MESSAGES = 'general'): string {
  const encodeMessage = encodeURIComponent(WHATSAPP_MESSAGES[message])
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeMessage}`
}

/**
 * Genera URL de WhatsApp con mensaje personalizado
 * @param customMessage - Mensaje personalizado por el usuario
 * @returns URL completa para redireccionar a WhatsApp
 */
export function generateWhatsAppLinkCustom(customMessage: string): string {
  const encodeMessage = encodeURIComponent(customMessage)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeMessage}`
}

/**
 * Hook para usar números y mensajes de WhatsApp en componentes
 */
export const useWhatsApp = () => {
  return {
    number: WHATSAPP_NUMBER,
    messages: WHATSAPP_MESSAGES,
    generateLink: generateWhatsAppLink,
    generateLinkCustom: generateWhatsAppLinkCustom,
  }
}
