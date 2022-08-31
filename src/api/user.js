import request from '@/utils/request'
// 封装登录接口
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
/** *
 * 获取用户的基本资料
 */
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
/** *
 * 获取封装获取用户信息接口
 */
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

export function getInfo(token) {

}

export function logout() {

}
