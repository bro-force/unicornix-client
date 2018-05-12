const CryptoJS = require("crypto-js");
const Base64 = require('crypto-js/enc-base64')

export const encryptAnswer = (answer) => {
  const encryptKey = process.env.REACT_APP_ENCRYPTION_KEY

  return Base64.stringify(CryptoJS.HmacSHA1(answer.toUpperCase(), encryptKey))
}
