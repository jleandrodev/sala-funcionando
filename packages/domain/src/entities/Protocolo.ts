import { TipoCondicao } from '../value-objects/TipoCondicao'
import { SubSituacao } from '../value-objects/SubSituacao'
import { EtapaProtocolo } from './EtapaProtocolo'

export interface ProtocoloProps {
  id: string
  condicao: TipoCondicao
  subSituacao: SubSituacao
  versao: number
  etapas?: EtapaProtocolo[]
  createdAt?: Date
  updatedAt?: Date
}

export class Protocolo {
  constructor(public readonly props: ProtocoloProps) {}

  get id() { return this.props.id }
  get condicao() { return this.props.condicao }
  get subSituacao() { return this.props.subSituacao }
  get versao() { return this.props.versao }
  get etapas() { return this.props.etapas || [] }

  adicionarEtapas(etapas: EtapaProtocolo[]) {
    this.props.etapas = etapas.sort((a, b) => a.ordem - b.ordem)
  }
}
