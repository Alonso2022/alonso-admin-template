
export const users = [
  {
    username: 'admin',
    name: 'Administrator',
    introduction: '描述信息',
    avatar: 'avatar.jpg',
    token: 'admin-header.admin-payload.admin-signature',
    roles: ['admin', 'editor'],
    permissions: ['0001', '0002']
  },
  {
    username: 'alonso',
    name: 'Alonso',
    introduction: '描述信息',
    avatar: 'avatar.jpg',
    token: 'alonso-header.alonso-payload.alonso-signature',
    roles: ['editor'],
    permissions: ['0001']
  }
]

function login(reqData) {
  let result
  let resData
  const { username } = reqData

  users.some(function(item, index, array) {
    if (item.username === username) {
      resData = array[index]
    }
    return item.username === username
  })

  if (resData) {
    result = {
      resCode: '20000',
      resDesc: 'Success',
      resData: resData
    }
  } else {
    result = {
      resCode: '001',
      resDesc: '没有找到指定用户，用户不存在',
      resData: null
    }
  }
  return result
}

function logout() {
  return {
    resCode: '20000',
    resDesc: 'Success',
    resData: null
  }
}

function getUserInfo(reqData) {
  let result
  let resData
  const { token } = reqData
  users.some(function(item, index, array) {
    if (item.token === token) {
      resData = array[index]
      return false
    }
  })
  if (resData) {
    result = {
      resCode: '20000',
      resDesc: 'Success',
      resData: resData
    }
  } else {
    result = {
      resCode: '001',
      resDesc: '用户登录过期，需重新登录',
      resData: null
    }
  }

  return result
}

//   function refeshToken(reqData) {
//     let { token } = reqData;
//     return {
//       resCode: "000",
//       resDesc: "Success",
//       resData: token
//     };
//   }

export default {
  loginByUsername: config => {
    const { reqData } = JSON.parse(config.body)
    const result = login(reqData)
    // console.log(result)
    return result
  },
  getUserInfo: config => {
    const { reqData } = JSON.parse(config.body)
    const result = getUserInfo(reqData)
    return result
  },
  logout: config => {
    const { reqData } = JSON.parse(config.body)
    return logout(reqData)
  }
}
