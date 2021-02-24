/*
 * @Author: your name
 * @Date: 2021-02-18 21:04:13
 * @LastEditTime: 2021-02-23 15:31:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cloudmusicvue\src\api\search.js
 */
import request from '@/utils/request'

// 搜索
export function Search (query) {
  return request({
    url: `/search?keywords=${query.keywords}&limit=${query.limit || 30}&offset=${query.offset || 0}&type=${query.type || 1}`
  })
}

// 默认搜索关键词
export function loadDefaultSearch () {
  return request({
    url: '/search/default'
  })
}

// 热搜列表(简略)
export function getEasyHotListSearch () {
  return request({
    url: '/search/hot'
  })
}

// 热搜列表(详细)
export function getDetailHotListSearch () {
  return request({
    url: '/search/hot/detail'
  })
}

// 搜索建议
export function getSuggestSearch (query) {
  return request({
    url: `/search/suggest?keywords=${query.keywords}&type=${query.type || 'mobile'}`
  })
}

// 搜索多重匹配
export function getMultipleSearch (keywords) {
  return request({
    url: `/search/multimatch?keywords=${keywords}`
  })
}
