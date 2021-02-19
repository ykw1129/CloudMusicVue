import request from '@/utils/request'

// 登录
export function login (data) {
  return request({
    url: `/login/cellphone?timestamp=${Date.now()}`,
    method: 'post',
    data
  })
}
// 获取用户详细信息
export function getUserDetail (id) {
  return request({
    url: `/user/detail?uid=${id}&timestamp=${Date.now()}`,
    method: 'get'
  })
}
// 获取用户动态
export function getUserEvent (query) {
  return request({
    url: `/user/event?uid=${query.id}&limit=${query.limit}`,
    method: 'get'
  })
}
// 获取用户信息 , 歌单，收藏，mv, dj 数量
export function getUserSubcount () {
  return request({
    url: `/user/subcount?timestamp=${Date.now()}`,
    withCredentials: true,
    method: 'get'
  })
}
// 获取用户登录状态
export function getUserStatus () {
  return request({
    url: `/user/status?timestamp=${Date.now()}`,
    method: 'get',
    withCredentials: true
  })
}

// 获取用户是否已经注册
export function getIsRegister (query) {
  return request({
    url: `/cellphone/existence/check?phone=${query.phone}`,
    method: 'get',
    withCredentials: true
  })
}

// 注册
export function Register (data) {
  return request({
    url: '/register/cellphone',
    method: 'post',
    withCredentials: true,
    data
  })
}
// 获取注册验证码
export function getCaptcha (query) {
  return request({
    url: `/captcha/sent?phone=${query.phone}`,
    method: 'get',
    withCredentials: true
  })
}
