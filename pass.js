const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const AdmZip = require('adm-zip')

class Pass {
  constructor (passSigner) {
    this.zip = new AdmZip()
    this.manifest = {}
    this.passSigner = passSigner
  }

  /**
   * 
   * @param {string} filename
   * @param {Buffer|string} data
   * @param {string} [language]
   */
  add (filename, data, language) {
    if (typeof filename !== 'string') throw new Error('Invalid parameter: filename must be string')
    if (!(data instanceof Buffer || typeof data === 'string')) throw new Error('Invalid parameter: data must be buffer or string')
    if (language && typeof language !== 'string') throw new Error('Invalid parameter: language must be string')

    if (typeof data === 'string') data = fs.readFileSync(data)
    if (language) filename = path.join(language + '.lproj', filename)

    const sha1 = crypto.createHash('sha1')
    this.manifest[filename] = sha1.update(data).digest('hex')

    this.zip.addFile(filename, data)
  }


  generate () {
    const manifest = JSON.stringify(this.manifest, null, 2)

    this.zip.addFile('manifest.json', manifest)
    this.zip.addFile('signature', this.passSigner.sign(manifest))

    return this.zip.toBuffer()
  }
}

module.exports = Pass