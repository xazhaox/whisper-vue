import CryptoJS from "crypto-js";
//此处的**随机生成，可自行修改

// 十六位十六进制数作为**
const key = CryptoJS.enc.Utf8.parse("poqiergwoiu2024ioj0siodfgjngj");
// 十六位十六进制数作为**偏移量
const iv = CryptoJS.enc.Utf8.parse("oiasudhgouienjsdfvj9w4ui5renvdczv3v");

/**
 * 解密
 * @param word 加密后的字符串
 * @returns 解密后的字符串
 */
export const decrypt = function (word: any) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
};

/**
 * 加密
 * @param word 字符串
 * @returns 加密后的字符串
 */
export const encrypt = function (word: any) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString();
};
