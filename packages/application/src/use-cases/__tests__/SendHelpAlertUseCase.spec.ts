import { describe, it, expect, vi, beforeEach } from 'vitest'
import { SendHelpAlertUseCase } from '../SendHelpAlertUseCase'
import { INotificationService } from '@sala-funcionando/domain'

describe('SendHelpAlertUseCase', () => {
  let notificationService: INotificationService
  let sut: SendHelpAlertUseCase

  beforeEach(() => {
    notificationService = {
      sendAlert: vi.fn()
    } as any
    sut = new SendHelpAlertUseCase(notificationService)
  })

  it('should send an alert via notification service', async () => {
    const professorId = 'p1'
    const message = 'Socorro na sala 5!'

    await sut.execute(professorId, message)

    expect(notificationService.sendAlert).toHaveBeenCalledWith(professorId, message)
  })
})
