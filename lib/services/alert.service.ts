import { prisma } from "@/lib/prisma"
import { AlertType, Severity } from "@prisma/client"

interface Vitals {
  heartRate?:     number
  temperature?:   number
  bloodPressure?: string
}

interface AlertPayload {
  type:           AlertType
  message:        string
  severity:       Severity
  patientId:      string
  consultationId: string
}

export class AlertService {

  /** Analyse les vitaux et retourne les alertes à créer */
  private analyseVitals(vitals: Vitals, patientId: string, consultationId: string): AlertPayload[] {
    const alerts: AlertPayload[] = []

    // ── Fréquence cardiaque ──────────────────────────
    if (vitals.heartRate) {
      if (vitals.heartRate > 130) {
        alerts.push({ type: "HIGH_HEART_RATE", severity: "CRITICAL",
          message: `Fréquence cardiaque critique : ${vitals.heartRate} bpm`,
          patientId, consultationId })
      } else if (vitals.heartRate > 100) {
        alerts.push({ type: "HIGH_HEART_RATE", severity: "HIGH",
          message: `Tachycardie détectée : ${vitals.heartRate} bpm`,
          patientId, consultationId })
      } else if (vitals.heartRate < 60) {
        alerts.push({ type: "LOW_HEART_RATE", severity: "MEDIUM",
          message: `Bradycardie détectée : ${vitals.heartRate} bpm`,
          patientId, consultationId })
          }
    }

    // ── Température ─────────────────────────────────
    if (vitals.temperature) {
      if (vitals.temperature >= 40) {
        alerts.push({ type: "HIGH_TEMPERATURE", severity: "CRITICAL",
          message: `Hyperthermie critique : ${vitals.temperature}°C`,
          patientId, consultationId })
      } else if (vitals.temperature >= 38.5) {
        alerts.push({ type: "HIGH_TEMPERATURE", severity: "HIGH",
          message: `Fièvre élevée : ${vitals.temperature}°C`,
          patientId, consultationId })
      }
    }

    // ── Tension artérielle ──────────────────────────
    if (vitals.bloodPressure) {
      const systolic = parseInt(vitals.bloodPressure.split("/")[0])
      if (systolic >= 180) {
        alerts.push({ type: "HIGH_BLOOD_PRESSURE", severity: "CRITICAL",
          message: `Hypertension sévère : ${vitals.bloodPressure} mmHg`,
          patientId, consultationId })
      } else if (systolic >= 140) {
        alerts.push({ type: "HIGH_BLOOD_PRESSURE", severity: "MEDIUM",
          message: `Hypertension détectée : ${vitals.bloodPressure} mmHg`,
          patientId, consultationId })
      }
    }

    return alerts
  }
   /** Crée les alertes en base pour une consultation */
  async processConsultationAlerts(
    vitals: Vitals,
    patientId: string,
    consultationId: string
  ) {
    const alertsToCreate = this.analyseVitals(vitals, patientId, consultationId)
    if (alertsToCreate.length === 0) return []

    return prisma.alert.createMany({ data: alertsToCreate })
  }

  /** Résoudre une alerte */
  async resolveAlert(id: string) {
    return prisma.alert.update({
      where: { id },
      data: { resolved: true }
    })
  }

  /** Alertes actives d'un patient */
  async getActiveAlerts(patientId: string) {
    return prisma.alert.findMany({
      where: { patientId, resolved: false },
      orderBy: { createdAt: "desc" }
    })
  }
}