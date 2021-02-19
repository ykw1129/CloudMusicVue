import request from '@/utils/request'

// 获取MV的url
export function getMvUrl (id) {
  return request({
    url: `/mv/url?id=${id}`,
    method: 'get'
  })
}
