import userApi from './user'
import projectApi from './project'
import assetApi from './asset'

const api = {
  ...userApi,
  ...projectApi,
  ...assetApi
}

export default api
