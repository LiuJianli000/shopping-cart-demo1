export const typeOf = data => {
  const type = Object.prototype.toString.call(data)

  switch(typeof data) {
    case 'number':
      return 'number'
      break
    case 'string':
      return 'string'
      break
    case 'boolean':
      return 'boolean'
      break
    case 'object':
      if (type === "[object Array]") {
        return 'array'
      } else if(type === '[object Object]'){
        return 'object'
      } else {
        return 'null'
      }
      break
    default:
      return 'undefined'
      break
  }
}