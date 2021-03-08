import PassSigner from 'passsigner-js'

declare class Pass {
  constructor (passSigner: PassSigner)
  add (filename: string, data: Buffer | string, language?: string)
  generate (): Buffer
}

declare class PassGenerator {
  constructor (config: { appleWWDRCA: string, signCert: string, password?: string })
  createPass (): Pass
}

export default PassGenerator