import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getTimeStamp } from '@/utils/auth'
const TimeOut = 3600 // 定义超时时间
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基础的基础地址
  timeout: 5000 // 定义5秒超时
})
// 请求拦截器
service.interceptors.request.use((config) => {
  if (store.getters.token) { // 判断是否有token,有的话就注入
    if (IsCheckTimeOut()) {
      // 如果它为true表示 过期了
      // token没用了 因为超时了
      store.dispatch('user/logout') // 登出操作
      // 跳转到登录页
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // 必须返回connfig
}, (error) => {
  return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use((response) => { // 响应拦截器里面有两个回到函数,一个是成功,一个是失败
  const { success, message, data } = response.data // 成功开始解构数据
  if (success) { // 如果成功返回data,否则返回一个错误对象
    return data
  } else {
    Message.error(message)// 返回错误消息
    return Promise.reject(new Error(message))
  }
},
(error) => {
  // error 信息 里面 response的对象
  if (
    error.response &&
    error.response.data &&
    error.response.data.code === 10002
  ) {
    // 当等于10002的时候 表示 后端告诉我token超时了
    store.dispatch('user/logout') // 登出action 删除token
    router.push('/login')
  } else {
    Message.error(error.message) // 提示错误信息
  }
  return Promise.reject(error)
})
// 是否超时
// 超时逻辑  (当前时间  - 缓存中的时间) 是否大于 时间差
function IsCheckTimeOut() {
  var currentTime = Date.now() // 当前时间戳
  var timeStamp = getTimeStamp() // 缓存时间戳
  return (currentTime - timeStamp) / 1000 > TimeOut
}
export default service
