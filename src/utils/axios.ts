import Axios from 'axios'
import { useMessage } from 'naive-ui'

const baseURL = 'http://1.14.137.147:58082/api'
const axios = Axios.create({
  baseURL,
  timeout: 10000 // 请求超时 10s
})

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  (response) => {
    /**
     * 根据你的项目实际情况来对 config 做处理
     * 这里对 config 不做任何处理，直接返回
     */
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
);

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
  (response) => {
    // window.$message = useMessage()
    /**
     * 根据你的项目实际情况来对 response 和 error 做处理
     * 这里对 response 和 error 不做任何处理，直接返回
     */
    // const message = useMessage()

    const msg = response.data.msg
    if (response.data.code !== 0) {
      console.log(response);
      
      window.$message.error(` 出错了: ${msg}`)      
    }
    return response
  },
  (error) => {
    if (error.response && error.response.data) {
      const code = error.response.status
      const msg = error.response.data.message
      window.$message.error(`Code: ${code}, Message: ${msg}`)
    } else {
      window.$message.error(`${error}`)
    }
    return Promise.reject(error)
  }
)

export default axios