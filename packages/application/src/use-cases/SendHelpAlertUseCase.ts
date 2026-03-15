import { INotificationService } from '@sala-funcionando/domain'

export class SendHelpAlertUseCase {
  constructor(
    private notificationService: INotificationService
  ) {}

  async execute(professorId: string, message: string) {
    await this.notificationService.sendAlert(professorId, message)
  }
}
