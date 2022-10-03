import { get, post } from './axios'

const getProjects = async (params = {}) =>
  get('api/project/getProjects', params)
const newProject = async data => post('api/project/newProject', data)

const projectApi = {
  getProjects,
  newProject
}

export default projectApi
