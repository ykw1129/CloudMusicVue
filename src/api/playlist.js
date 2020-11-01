import request from '@/utils/request'

// 获取推荐歌单
export function getSubscribePlayList (data) {
  return request({
    url: `/recommend/resource?timestamp=${Date.now()}`,
    method: 'get',
    withCredentials: true,
    data
  })
}
// 获取用户创建歌单
export function getUserCreatePlayList (uid, data) {
  return request({
    url: `/user/playlist?uid=${uid}`,
    method: 'get',
    data
  })
}
// 获取歌单详细信息
export function getPlayList (id, data) {
  return request({
    url: `/playlist/detail?id=${id}`,
    method: 'get',
    data
  })
}
