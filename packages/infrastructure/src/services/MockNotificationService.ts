import { INotificationService } from '@sala-funcionando/domain'

export class MockNotificationService implements INotificationService {
  async sendAlert(professorId: string, message: string): Promise<void> {
    console.log(`[ALERT] Sending notification to professor ${professorId}: ${message}`)
    // Simula envio
    await new Promise(resolve => setTimeout(resolve, 500))
  }
}
