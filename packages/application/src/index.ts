// @sala-funcionando/application
// Camada de aplicação — orquestra use cases

// Use Cases
export { GetProtocoloUseCase } from './use-cases/GetProtocoloUseCase'
export { RegisterTurmaUseCase } from './use-cases/RegisterTurmaUseCase'
export { SaveHistoricoUseCase } from './use-cases/SaveHistoricoUseCase'
export { AdaptProtocoloUseCase } from './use-cases/AdaptProtocoloUseCase'
export { SendHelpAlertUseCase } from './use-cases/SendHelpAlertUseCase'

// DTOs
export * from './dtos/TurmaDTOs'
export * from './dtos/HistoricoDTOs'
