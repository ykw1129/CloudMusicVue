import request from '@/utils/request'

// 获取视频Url
export function getVideoUrl (id, data) {
  return request({
    url: `/video/url?id=${id}`,
    method: 'get',
    data
  })
}
