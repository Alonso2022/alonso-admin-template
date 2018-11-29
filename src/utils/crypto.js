import { AES, enc } from 'crypto-js'

/**
 * 字符串加密
 */
export const aesEncrypt = (str, key = 'a+l+o+n+s+o 123456') => {
  return AES.encrypt(str, key).toString()
}

/**
 * 字符串解密
 */
export const aesDecrypt = (str, key = 'a+l+o+n+s+o 123456') => {
  const bytes = AES.decrypt(str, key)
  const originalText = bytes.toString(enc.Utf8)
  return originalText
}

/**
 * 加密{ data, param, key } 根据param加密data中的值
 */
export const aesEncryptObj = params => {
  const { data, param, key } = params
  const result = JSON.parse(JSON.stringify(data))
  param.forEach(ele => {
    result[ele] = AES.encrypt(result[ele], key).toString()
  })
  return result
}

/**
 * 解密{ data, param, key } 根据param解密data中的值
 */
export const aesDecryptObj = params => {
  const { data, param, key } = params
  const result = JSON.parse(JSON.stringify(data))
  param.forEach(ele => {
    const bytes = AES.decrypt(result[ele], key)
    const originalText = bytes.toString(enc.Utf8)
    result[ele] = originalText
  })
  return result
}
