import request from '@/utils/request'

// 获取推荐歌单
export function getSubscribePlayList () {
  return request({
    url: `/recommend/resource?timestamp=${Date.now()}`,
    method: 'get',
    withCredentials: true
  })
}
// 获取用户创建歌单
export function getUserCreatePlayList (uid) {
  return request({
    url: `/user/playlist?uid=${uid}`,
    method: 'get'
  })
}
// 获取歌单详细信息
export function getPlayList (id) {
  return request({
    url: `/playlist/detail?id=${id}`,
    method: 'get'
  })
}
