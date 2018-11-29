import request from '@/utils/request'

export function loginByUsername(reqData) {
  // console.log('1', reqData)
  return request({
    url: '/login/login',
    method: 'post',
    data: reqData
  })
}

export function logout(reqData) {
  return request({
    url: '/login/logout',
    method: 'post',
    data: reqData
  })
}

export function getUserInfo(reqData) {
  return request({
    url: '/user/info',
    method: 'post',
    data: reqData
  })
}

// export function getUserInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

