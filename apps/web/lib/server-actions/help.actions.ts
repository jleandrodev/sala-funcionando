'use server'

import { SendHelpAlertUseCase } from '@sala-funcionando/application'
import { MockNotificationService } from '@sala-funcionando/infrastructure'

const notificationService = new MockNotificationService()
const sendHelpAlertUseCase = new SendHelpAlertUseCase(notificationService)

export async function sendHelpAction(professorId: string, message: string) {
  try {
    await sendHelpAlertUseCase.execute(professorId, message)
    return { success: true }
  } catch (error) {
    console.error('Error sending HELP alert:', error)
    return { success: false, error: 'Falha ao enviar alerta de emergência.' }
  }
}
