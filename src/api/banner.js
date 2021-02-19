import request from '@/utils/request'

// 获取banner
export function getBanner (phoneType) {
  return request({
    url: `/banner?type=${phoneType}`,
    method: 'get'
  })
}
