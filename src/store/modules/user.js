import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
// 状态
const state = {
  token: getToken(), // 首先初始化token,其值在缓存中读取
  userInfo: {}
}
// 修改状态
const mutations = {
  setToken(state, token) {
    // 设置一个setToken的函数,把传进来的Token赋值给 State里面的Token
    state.token = token // 将token设置给vuex
    setToken(token) // 同步给缓存
  },
  removeToken() {
    state.token = null // 将vuex内的数据清空
    removeToken()
  },
  setUserInfo(state, userInfo) {
    state.userInfo = { ...userInfo }
  },
  reomveUserInfo(state) {
    state.userInfo = { }
  }
}
const actions = {
  async login(context, data) {
    console.log(data, '康康')
    const result = await login(data)
    console.log(result)
    context.commit('setToken', result) // 设置token 此时获取的数据
    // 已经经过响应拦截器处理过,错误的话根本走不到这一步
    // 写入时间戳
  },
  async getUserInfo(context) {
    const result = await getUserInfo()
    const baseInfo = await getUserDetailById(result.userId)
    context.commit('setUserInfo', { ...result, ...baseInfo })
    return result
  },
  // 登出的action
  logout(context) {
    // 删除token
    context.commit('removeToken') // 不仅仅删除了vuex中的 还删除了缓存中的
    // 删除用户资料
    context.commit('removeUserInfo') // 删除用户信息
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
