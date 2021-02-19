import request from '@/utils/request'

// 获取视频Url
export function getVideoUrl (id) {
  return request({
    url: `/video/url?id=${id}`,
    method: 'get'
  })
}
