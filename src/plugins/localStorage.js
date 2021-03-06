
function setLocal (key, value) {
  if (typeof value === 'object') { // 如果要存储对象，则先转为json串
    value = JSON.stringify(value)
  }
  // eacape()加密
  localStorage.setItem(key, escape(value))
}
function getLocal (key) {
  const value = localStorage.getItem(key)// 字符串或json串
  try {
    // 使用try catch防止项目报错 中断项目运行
    // eacape()解密
    const json = JSON.parse(unescape(value))// json串转为js对象
    if (typeof json === 'object' && json) { // 利用了一点，当符合json格式，串会成功转为js对象，否则为null
      return json
    }
  } catch (err) {
    // console.warn(err)
  }

  return value
}
function clearLocal () {
  localStorage.clear()
}
function hasKey (key) { // LocalStorage中是否存在指定key
  if (getLocal(key) === '') { return false }
  return true
}

export default {
  setLocal,
  getLocal,
  clearLocal,
  hasKey
}
