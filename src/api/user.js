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
export function getUserDetail (id, data) {
  return request({
    url: `/user/detail?uid=${id}&timestamp=${Date.now()}`,
    method: 'get',
    data
  })
}
// 获取用户动态
export function getUserEvent (query, data) {
  return request({
    url: `/user/event?uid=${query.id}&limit=${query.limit}`,
    method: 'get',
    data
  })
}
// 获取用户信息 , 歌单，收藏，mv, dj 数量
export function getUserSubcount (data) {
  return request({
    url: `/user/subcount?timestamp=${Date.now()}`,
    withCredentials: true,
    method: 'get',
    data
  })
}
// 获取用户登录状态
export function getUserStatus (data) {
  return request({
    url: `/user/status?timestamp=${Date.now()}`,
    method: 'get',
    withCredentials: true,
    data
  })
}
