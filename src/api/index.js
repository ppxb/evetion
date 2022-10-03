import userApi from './user'
import projectApi from './project'

const api = {
  ...userApi,
  ...projectApi
}

export default api
