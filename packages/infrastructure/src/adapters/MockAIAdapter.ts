import { IAIAdapter, Protocolo, Turma, EtapaProtocolo } from '@sala-funcionando/domain'

export class MockAIAdapter implements IAIAdapter {
  async adapt(protocolo: Protocolo, turma: Turma): Promise<Protocolo> {
    // Simula uma adaptação demorada
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Retorna o mesmo protocolo, mas com um prefixo indicando adaptação
    return new Protocolo({
      ...protocolo.props,
      versao: protocolo.versao + 1
    })
  }
}
