const PassSigner = require('passsigner-js')

const Pass = require('./pass')

class PassGenerator {
  /**
   * 
   * @param {object} config
   * @param {string|Buffer} config.appleWWDRCA Path to Apple's WWDR Certificate.
   * @param {string|Buffer} config.signCert Path to Pass Signing Certificate.
   * @param {string} [config.password] The Password of the Pass Signing Certificate.
   */
  constructor (config) {
    this.passSigner = new PassSigner(config)
  }

  createPass () {
    return new Pass(this.passSigner)
  }
}

module.exports = PassGenerator