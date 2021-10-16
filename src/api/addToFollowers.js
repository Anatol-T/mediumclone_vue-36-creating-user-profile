import axios from '@/api/axios'

const getUrl = slug => `/profiles/${slug}/follow`

const addToFollowers = slug => {
  const url = getUrl(slug)
  return axios.post(url, {}).then(response => response.data.profile)
}

const removeFromFollowers = slug => {
  const url = getUrl(slug)
  return axios.delete(url).then(response => response.data.profile)
}

export default {
  addToFollowers,
  removeFromFollowers
}