import Mock from 'mockjs'
import loginAPI from './login'

// requestObject: {reqKey:"xxx",reqFrom:"xxx",reqData:params}
// responseObject: {resCode:"000",resDesc:"Success",resData:data}

// authorization 授权API相关
// reqKey: login,

Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'post', loginAPI.getUserInfo)
