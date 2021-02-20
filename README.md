<img src="https://docs-assets.developer.apple.com/published/c104c9bff0/841b02dd-b78c-4cad-8da4-700761d34e14.png" width="50" height="50" alt="Apple Wallet Logo" align="left" />

# PassGenerator
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-downloads-url]

Apple Pass Generator for NodeJS

## Install
```
$ npm install passgenerator-js
```

## Get Started
Follow the [Apple Wallet Developer Guide][apple-wallet-developer-guide] to download and edit a sample pass.

### Apple's WWDR Certificate
Apple’s World Wide Developer Relations (WWDR) certificate is available from Apple at [http://developer.apple.com/certificationauthority/AppleWWDRCA.cer](http://developer.apple.com/certificationauthority/AppleWWDRCA.cer).

### Pass Signing Certificate
To download your pass signing certificate, do the following:

1. Log into your [Apple Developer Console][apple-developer-console].
2. In Certificates, Identifiers & Profiles, select Identifiers.
3. Under Identifiers, select Pass Type IDs.
4. Click the plus (+) button.
5. Enter the description and pass type identifier, and click Submit.
6. Select the pass type identifier, then click Edit.
7. Click the Create Certificate button, then follow the instructions to create a pass signing certificate.
8. Download your new certificate. Double click to add this certificate to your Keychain.
9. Right-click on your certificate, then click Export.

### Options
#### Constructor
| Name        | Type   | Required | Description                                   |
|-------------|--------|----------|-----------------------------------------------|
| appleWWDRCA | String | Required | Path to Apple's WWDR Certificate.             |
| signCert    | String | Required | Path to Pass Signing Certificate.             |
| password    | String | Optional | The Password of the Pass Signing Certificate. |
#### Method: add
| Name     | Type             | Required | Description               |
|----------|------------------|----------|---------------------------|
| filename | String           | Required | Filename with extension.  |
| data     | Buffer \| String | Required | File contents.            |
| language | String           | Optional | Language Code (ISO 639-1) |

## Usage
```js
const PassGenerator = require('passgenerator-js')

const passGenerator = new PassGenerator({
  appleWWDRCA: './AppleWWDRCA.cer',
  signCert: './Certificates.p12'
})

const pass = passGenerator.createPass()

pass.add('icon.png', './Generic.pass/icon.png')
pass.add('icon@2x.png', './Generic.pass/icon@2x.png')

pass.add('logo.png', './Generic.pass/logo.png')
pass.add('logo@2x.png', './Generic.pass/logo@2x.png')

pass.add('logo.png', './Generic.pass/th.lproj/logo.png')
pass.add('logo@2x.png', './Generic.pass/th.lproj/logo@2x.png')

pass.add('pass.json', './Generic.pass/pass.json')

const pkpass = pass.generate()

fs.writeFileSync('Generic.pkpass', pkpass)
```

## License
[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/passgenerator.svg
[npm-url]: https://npmjs.org/package/passgenerator
[npm-downloads-image]: https://img.shields.io/npm/dm/passgenerator.svg
[npm-downloads-url]: https://npmcharts.com/compare/passgenerator?minimal=true
[apple-developer-console]: https://developer.apple.com/account
[apple-wallet-developer-guide]: https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/YourFirst.html