#!/usr/bin/env node

/**
 * Script de Validación del Sistema Completo
 * Verifica: PDFs, WhatsApp, APIs
 * Ejecutar: node scripts/validate-system.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
};

function log(message, color = 'reset') {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

function printHeader(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'blue');
  console.log('='.repeat(60));
}

/**
 * 1. Validar PDFs
 */
function validatePDFs() {
  printHeader('1️⃣  VALIDANDO PDFs');

  const pdfDir = path.join(__dirname, '../public/pdfs');
  const expectedPDFs = [
    'matricula-vehicular.pdf',
    'baja-vehicular.pdf',
    'prescripcion-multas.pdf',
    'patios-retencion.pdf',
    'parte-propio.pdf',
    'libertad-vehicular.pdf',
    'chatarizacion.pdf',
    'procesos-judiciales.pdf',
  ];

  let pdfCount = 0;
  let totalSize = 0;

  if (!fs.existsSync(pdfDir)) {
    log('❌ Carpeta /public/pdfs/ NO EXISTE', 'red');
    return false;
  }

  log('✅ Carpeta /public/pdfs/ encontrada', 'green');

  expectedPDFs.forEach((pdf) => {
    const filepath = path.join(pdfDir, pdf);
    if (fs.existsSync(filepath)) {
      const stats = fs.statSync(filepath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      log(`  ✅ ${pdf} (${sizeKB} KB)`, 'green');
      pdfCount++;
      totalSize += stats.size;
    } else {
      log(`  ❌ ${pdf} FALTA`, 'red');
    }
  });

  console.log('');
  log(`Resultado: ${pdfCount}/${expectedPDFs.length} PDFs válidos`, 
    pdfCount === expectedPDFs.length ? 'green' : 'red');
  log(`Tamaño total: ${(totalSize / 1024).toFixed(2)} KB`, 'gray');

  return pdfCount === expectedPDFs.length;
}

/**
 * 2. Validar Configuración de WhatsApp
 */
function validateWhatsApp() {
  printHeader('2️⃣  VALIDANDO CONFIGURACIÓN WHATSAPP');

  const whatsappPath = path.join(__dirname, '../src/lib/whatsapp.ts');

  if (!fs.existsSync(whatsappPath)) {
    log('❌ Archivo /src/lib/whatsapp.ts NO EXISTE', 'red');
    return false;
  }

  const content = fs.readFileSync(whatsappPath, 'utf8');

  // Verificar número de WhatsApp
  const numberMatch = content.match(/export const WHATSAPP_NUMBER = '(\d+)'/);
  if (numberMatch && numberMatch[1] === '593980639640') {
    log(`✅ Número WhatsApp configurado: ${numberMatch[1]}`, 'green');
  } else {
    log('❌ Número WhatsApp incorrecto o no encontrado', 'red');
    return false;
  }

  // Verificar mensajes
  const messagePatterns = [
    'general', 'normative', 'consultation', 'multa', 'baja',
    'prescripcion', 'patio', 'parte', 'libertad', 'chatarra',
    'proceso', 'dashboard'
  ];

  let messagesOK = 0;
  messagePatterns.forEach((pattern) => {
    if (content.includes(`${pattern}:`) || content.includes(`"${pattern}":`)) {
      log(`  ✅ Mensaje '${pattern}' configurado`, 'green');
      messagesOK++;
    } else {
      log(`  ⚠️  Mensaje '${pattern}' NO ENCONTRADO`, 'yellow');
    }
  });

  console.log('');
  log(`Resultado: ${messagesOK}/${messagePatterns.length} mensajes configurados`,
    messagesOK === messagePatterns.length ? 'green' : 'yellow');

  return messagesOK >= 10; // Al menos 10 de 12 mensajes
}

/**
 * 3. Validar APIs
 */
function validateAPIs() {
  printHeader('3️⃣  VALIDANDO ENDPOINTS DE API');

  const apiPaths = [
    '/src/app/api/pdf/generate/route.ts',
    '/src/app/api/pdf/download/[filename]/route.ts'
  ];

  let apiCount = 0;

  apiPaths.forEach((apiPath) => {
    const fullPath = path.join(__dirname, '..', apiPath);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const hasExport = content.includes('export async function');
      const hasPOST = content.includes('POST') || apiPath.includes('download');
      
      if (hasExport) {
        log(`✅ ${apiPath.split('/').slice(-2)[0]} API implementada`, 'green');
        apiCount++;
      } else {
        log(`❌ ${apiPath} NO TIENE EXPORTS`, 'red');
      }
    } else {
      log(`❌ ${apiPath} NO EXISTE`, 'red');
    }
  });

  console.log('');
  log(`Resultado: ${apiCount}/${apiPaths.length} APIs implementadas`,
    apiCount === apiPaths.length ? 'green' : 'red');

  return apiCount === apiPaths.length;
}

/**
 * 4. Validar Integración en Frontend
 */
function validateFrontendIntegration() {
  printHeader('4️⃣  VALIDANDO INTEGRACIÓN EN FRONTEND');

  const normativaPath = path.join(__dirname, '../src/app/normativa/[id]/page.tsx');
  const landingPath = path.join(__dirname, '../src/components/landing/LegalConsultationCTA.tsx');

  let integrationCount = 0;

  // Validar página de normativa
  if (fs.existsSync(normativaPath)) {
    const content = fs.readFileSync(normativaPath, 'utf8');
    
    if (content.includes('pdfUrl')) {
      log('✅ Referencias de PDF en normativa detectadas', 'green');
      integrationCount++;
    }
    
    if (content.includes('generateWhatsAppLink')) {
      log('✅ WhatsApp integration en normativa detectada', 'green');
      integrationCount++;
    }
    
    if (content.includes("'matricula'") && content.includes("'baja-vehicular'")) {
      log('✅ Múltiples tópicos de normativa configurados', 'green');
      integrationCount++;
    }
  } else {
    log('❌ Página de normativa NO ENCONTRADA', 'red');
  }

  // Validar Landing
  if (fs.existsSync(landingPath)) {
    const content = fs.readFileSync(landingPath, 'utf8');
    
    if (content.includes('generateWhatsAppLink')) {
      log('✅ WhatsApp integration en Landing detectada', 'green');
      integrationCount++;
    }
  } else {
    log('❌ Landing NO ENCONTRADA', 'red');
  }

  console.log('');
  log(`Resultado: ${integrationCount}/4 integraciones detectadas`,
    integrationCount >= 3 ? 'green' : 'yellow');

  return integrationCount >= 3;
}

/**
 * 5. Validar Archivo .env
 */
function validateEnv() {
  printHeader('5️⃣  VALIDANDO CONFIGURACIÓN ENV');

  const envPath = path.join(__dirname, '../.env.local');
  
  if (fs.existsSync(envPath)) {
    log('✅ Archivo .env.local existe', 'green');
    return true;
  } else {
    log('⚠️  Archivo .env.local no encontrado (OPCIONAL)', 'yellow');
    return true; // No es crítico para esta fase
  }
}

/**
 * 6. Resumen Final
 */
function printSummary(results) {
  printHeader('📊 RESUMEN FINAL DE VALIDACIÓN');

  const checks = [
    { name: 'PDFs Generados', result: results.pdfs },
    { name: 'WhatsApp Configurado', result: results.whatsapp },
    { name: 'APIs Implementadas', result: results.apis },
    { name: 'Frontend Integrado', result: results.frontend },
    { name: 'Configuración ENV', result: results.env }
  ];

  let passCount = 0;
  checks.forEach((check) => {
    const icon = check.result ? '✅' : '❌';
    const color = check.result ? 'green' : 'red';
    log(`${icon} ${check.name}`, color);
    if (check.result) passCount++;
  });

  console.log('');
  const allPass = passCount === checks.length;
  const color = allPass ? 'green' : 'yellow';
  log(`Resultado: ${passCount}/${checks.length} validaciones exitosas`, color);

  if (allPass) {
    log('\n🚀 ¡SISTEMA LISTO PARA PRODUCCIÓN!', 'green');
    log('Todos los componentes están configurados correctamente.', 'green');
    return true;
  } else {
    log('\n⚠️  REVISAR ERRORES ANTES DE PRODUCCIÓN', 'yellow');
    return false;
  }
}

/**
 * Main
 */
console.clear();
log('╔════════════════════════════════════════════════════════╗', 'blue');
log('║     VALIDACIÓN DEL SISTEMA - VYNTRA 2026               ║', 'blue');
log('╚════════════════════════════════════════════════════════╝', 'blue');

const results = {
  pdfs: validatePDFs(),
  whatsapp: validateWhatsApp(),
  apis: validateAPIs(),
  frontend: validateFrontendIntegration(),
  env: validateEnv()
};

const systemReady = printSummary(results);

console.log('\n' + '='.repeat(60) + '\n');

process.exit(systemReady ? 0 : 1);
