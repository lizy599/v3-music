import axios from 'axios'
const baseURL = process.env.NODE_ENV === 'production' ? 'http://ustbhuangyi.com/music-next/' : '/'
const OK = 0
axios.defaults.baseURL = baseURL

export const get = (url, params) => {
  return axios.get(url, { params })
    .then(res => {
      const serverData = res.data
      if (serverData.code === OK) {
        return serverData.result
      }
    })
    .catch(err => {
      console.log(err);
    })
}