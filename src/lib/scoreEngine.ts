/**
 * VYNTRA SCORE ENGINE v1.0
 * Sistema de puntuación vehicular inteligente
 *
 * El score mide el riesgo legal de un vehículo
 * Rango: 0-100
 * - 80-100: Bajo riesgo ✅
 * - 60-79: Riesgo medio ⚠️
 * - 0-59: Alto riesgo ❌
 */

export interface VehicleScoreData {
  activeFines: number; // Multas activas no pagadas
  registrationExpired: boolean; // Matrícula vencida
  rtvExpired: boolean; // Revisión técnica vencida
  historicalFines: number; // Multas en historial últimos 2 años
  picoInfractions: number; // Infracciones por pico y placa
  monthsOverdue: number; // Meses en retraso
}

export interface ScoreResult {
  score: number;
  level: "low" | "medium" | "high";
  label: string;
  color: string;
  factors: ScoreFactor[];
}

export interface ScoreFactor {
  name: string;
  penalty: number;
  type: "fine" | "registration" | "rtv" | "history" | "pico" | "overdue";
}

/**
 * Calcula el score vehicular
 * Penalidades por factor (base 100)
 */
export function calculateVehicleScore(data: VehicleScoreData): ScoreResult {
  let score = 100;
  const factors: ScoreFactor[] = [];

  // ❌ Multa activa: -10 por cada una
  if (data.activeFines > 0) {
    const penalty = Math.min(data.activeFines * 10, 30);
    score -= penalty;
    factors.push({
      name: `${data.activeFines} multa(s) activa(s)`,
      penalty,
      type: "fine",
    });
  }

  // ❌ Matrícula vencida: -15
  if (data.registrationExpired) {
    score -= 15;
    factors.push({
      name: "Matrícula vencida",
      penalty: 15,
      type: "registration",
    });
  }

  // ❌ RTV vencida: -10
  if (data.rtvExpired) {
    score -= 10;
    factors.push({
      name: "RTV vencida",
      penalty: 10,
      type: "rtv",
    });
  }

  // ❌ Historial de multas: -5 por 2+ multas
  if (data.historicalFines >= 2) {
    score -= 5;
    factors.push({
      name: "Historial de múltiples multas",
      penalty: 5,
      type: "history",
    });
  }

  // ❌ Infracciones pico y placa: -8 por cada una
  if (data.picoInfractions > 0) {
    const penalty = Math.min(data.picoInfractions * 8, 20);
    score -= penalty;
    factors.push({
      name: `${data.picoInfractions} infracciones pico y placa`,
      penalty,
      type: "pico",
    });
  }

  // ❌ Retraso matrícula: -2 por mes
  if (data.monthsOverdue > 0) {
    const penalty = Math.min(data.monthsOverdue * 2, 15);
    score -= penalty;
    factors.push({
      name: `${data.monthsOverdue} meses(es) en retraso`,
      penalty,
      type: "overdue",
    });
  }

  // Asegurar que no baje de 0
  score = Math.max(score, 0);

  // Determinar nivel
  let level: "low" | "medium" | "high";
  let label: string;
  let color: string;

  if (score >= 80) {
    level = "low";
    label = "Bajo riesgo";
    color = "green";
  } else if (score >= 60) {
    level = "medium";
    label = "Riesgo medio";
    color = "yellow";
  } else {
    level = "high";
    label = "Alto riesgo";
    color = "red";
  }

  return {
    score,
    level,
    label,
    color,
    factors,
  };
}

/**
 * Score simulado para demo
 * En producción, esto viene de la BD
 */
export function getDemoScore(): ScoreResult {
  return calculateVehicleScore({
    activeFines: 0,
    registrationExpired: false,
    rtvExpired: false,
    historicalFines: 0,
    picoInfractions: 0,
    monthsOverdue: 0,
  });
}

/**
 * Score para usuario con multas
 */
export function getHighRiskScore(): ScoreResult {
  return calculateVehicleScore({
    activeFines: 1,
    registrationExpired: true,
    rtvExpired: false,
    historicalFines: 2,
    picoInfractions: 1,
    monthsOverdue: 2,
  });
}
