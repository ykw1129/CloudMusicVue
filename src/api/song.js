import request from '@/utils/request'

// 获取歌曲详细信息
export function getSongDetail (id) {
  return request({
    url: `/song/detail?ids=${id}`,
    method: 'get'
  })
}
// 获取歌曲Url
export function getSongUrl (id) {
  return request({
    url: `/song/url?id=${id}`,
    method: 'get'
  })
}
