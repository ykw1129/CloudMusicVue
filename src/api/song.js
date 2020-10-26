import request from '@/utils/request'

// 获取歌曲详细信息
export function getSongDetail (id, data) {
  return request({
    url: `/song/detail?ids=${id}`,
    method: 'get',
    data
  })
}
// 获取歌曲Url
export function getSongUrl (id, data) {
  return request({
    url: `/song/url?id=${id}`,
    method: 'get',
    data
  })
}
