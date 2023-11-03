import axios from 'axios'
const baseURL = '/'
const OK = 0
axios.defaults.baseURL = baseURL

export const get = (url, params) => {
  return axios.get(url, { params })
    .then(res => {
      const serverData = res.data
      if (serverData.code === OK) {
        return serverData
      }
    })
    .catch(err => {
      console.log(err);
    })
}