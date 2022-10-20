import { get, post } from './axios'

const login = async data => post('api/v1/base/login', data)
const userInfo = async parms => get('api/v1/user/getUser', parms)

const userApi = {
  login,
  userInfo
}

export default userApi
