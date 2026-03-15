export class ProtocoloNotFoundError extends Error {
  constructor() {
    super('Protocolo não encontrado para a condição e situação informadas.')
    this.name = 'ProtocoloNotFoundError'
  }
}
