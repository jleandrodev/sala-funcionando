import { Protocolo } from '../entities/Protocolo'
import { TipoCondicao } from '../value-objects/TipoCondicao'
import { SubSituacao } from '../value-objects/SubSituacao'

export interface IProtocoloRepository {
  findById(id: string): Promise<Protocolo | null>
  findByCondicaoESituacao(condicao: TipoCondicao, situacao: SubSituacao): Promise<Protocolo | null>
  save(protocolo: Protocolo): Promise<void>
}
