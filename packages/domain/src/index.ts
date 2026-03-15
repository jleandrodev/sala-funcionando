// @sala-funcionando/domain
// Regras de negócio puras — sem dependências de framework

// Entities
export { Protocolo } from './entities/Protocolo'
export { EtapaProtocolo } from './entities/EtapaProtocolo'
export { Professor } from './entities/Professor'
export { Turma } from './entities/Turma'
export { HistoricoAtendimento } from './entities/HistoricoAtendimento'
export { Aluno } from './entities/Aluno'

// Value Objects
export { TipoCondicao } from './value-objects/TipoCondicao'
export { SubSituacao } from './value-objects/SubSituacao'
export { NivelUrgencia } from './value-objects/NivelUrgencia'

// Ports
export type { IProtocoloRepository } from './ports/IProtocoloRepository'
export type { ITurmaRepository } from './ports/ITurmaRepository'
export type { IHistoricoRepository } from './ports/IHistoricoRepository'
export type { IProfessorRepository } from './ports/IProfessorRepository'
export type { IAIAdapter } from './ports/IAIAdapter'
export type { INotificationService } from './ports/INotificationService'

// Errors
export { ProtocoloNotFoundError } from './errors/ProtocoloNotFoundError'
export { TurmaNotFoundError } from './errors/TurmaNotFoundError'
