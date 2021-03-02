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
// 喜欢音乐
export function getSongLike (query) {
  return request({
    url: `/like?id=${query.id}&like=${query.like}`,
    method: 'get'
  })
}
// 喜欢音乐列表
export function getSongLikeList (id) {
  return request({
    url: `/likelist?id=${id}`,
    method: 'get'
  })
}
// 歌曲评论
export function getSongComment () {

}
