export interface INotificationService {
  sendAlert(professorId: string, message: string): Promise<void>
}
