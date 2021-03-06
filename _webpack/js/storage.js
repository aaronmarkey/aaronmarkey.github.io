export default class {
  setItem(key, value) {
    let item = value
    if (value.constructor.name === "Object") {
      item = JSON.stringify(value)
    }
    sessionStorage.setItem(key, item)
  }

  getItem(key) {
    let item = sessionStorage.getItem(key)
    try {
      const value = JSON.parse(item)
      item = value
     } catch(e) {
    }
    return item
  }
}