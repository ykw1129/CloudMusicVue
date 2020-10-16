function debounce (func, ms = 1000) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    } else {
      timer = setTimeout(() => {
        func.apply(this, args)
      }, ms)
    }
  }
}
export default {
  debounce
}
