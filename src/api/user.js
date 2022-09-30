import { post, get } from './axios'

const login = async data => post('api/base/login', data)
const userInfo = async parms => get('api/user/getUser', parms)

const userApi = {
  login,
  userInfo
}

export default userApi
