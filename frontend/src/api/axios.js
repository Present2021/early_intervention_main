import axios from 'axios'

const api = axios.create({
  baseURL: 'https://sab-demo-api.softplayer.net/',
  // timeout: 1000,
  headers: {
    // Authorization:
    //   'Bearer pat0sCJzUiDNeY6Di.49a566332adb2ac2b73a70a87a8282274821683bfe84f9e88c933a2374de29e0',
    // 'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
  },
})

export default {
  async GET(url, params) {
    try {
      const res = await api.get(url, { params })
      return res.data
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  async POST(url, ...params) {
    try {
      return (await api.post(url, ...params)).data
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  async PUT(url, ...params) {
    try {
      return (await api.put(url, ...params)).data
      // await api.put(url, ...params)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  async DELETE(url, ...params) {
    try {
      await api.delete(url, ...params)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
}
