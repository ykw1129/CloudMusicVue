import request from '@/utils/request'

// 获取banner
export function getBanner (phoneType, data) {
  return request({
    url: `/banner?type=${phoneType}`,
    method: 'get',
    data
  })
}
