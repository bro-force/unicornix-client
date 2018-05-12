const CryptoJS = require("crypto-js");
const Base64 = require('crypto-js/enc-base64')

export const encryptAnswer = (answer) => {
  const encryptKey = process.env.ENCRYPTION_KEY

  console.log(encryptKey)

  return Base64.stringify(CryptoJS.HmacSHA1(answer.toUpperCase(), encryptKey))
}
