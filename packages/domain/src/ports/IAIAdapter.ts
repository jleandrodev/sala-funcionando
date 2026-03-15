import { Protocolo } from '../entities/Protocolo'
import { Turma } from '../entities/Turma'

export interface IAIAdapter {
  adapt(protocolo: Protocolo, turma: Turma): Promise<Protocolo>
}
