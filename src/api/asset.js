import { get, post } from './axios'

const getAllAssets = async (params = {}) => get('api/asset/all', params)

const newAsset = async data => post('api/asset/new', data)

const assetApi = {
  getAllAssets,
  newAsset
}

export default assetApi
