import axios from 'axios'

const http = axios.create({
  timeout: 60 * 1000,
  withCredentials: true
})

http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')

    if (config.url === 'api/base/login') {
      localStorage.removeItem('token')
      config.headers['Authorization'] = ''
    } else config.headers['Authorization'] = `Bearer ${token}`

    return config
  },
  error => {
    console.warn(error)
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    const res = response.data
    const { token } = res.data

    if (token) {
      localStorage.setItem('token', token)
    }

    return res
  },
  error => {
    return Promise.reject(error)
  }
)

const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    http({
      method: 'GET',
      url,
      params
    })
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    http({
      method: 'POST',
      url,
      data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

export { http, get, post }
