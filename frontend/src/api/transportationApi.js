import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.airtable.com/v0/appbuAfMjhV0MBe2s/',
  // timeout: 1000,
  headers: {
    Authorization:
      'Bearer pat0sCJzUiDNeY6Di.49a566332adb2ac2b73a70a87a8282274821683bfe84f9e88c933a2374de29e0',
    'Content-Type': 'application/json',
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
      await api.post(url, ...params)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  async PUT(url, ...params) {
    try {
      await api.put(url, ...params)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
}
