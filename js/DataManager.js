export class DataManager {
  constructor(data) {
    this.data = data
  }

  getData() {
    return this.data
  }

  add(item) {
    this.data.push(item)
    return this
  }

  remove(itemId) {
    const itemIdx = this.data.findIndex(item => item.id === itemId)
    if (itemIdx > -1) {
      this.data = [
        ...this.data.slice(0, itemIdx),
        ...this.data.slice(itemIdx + 1),
      ]
    }
    return this
  }

  sort() {
    
  }

  search() {

  }

  pick(start, end) {
    return this.data.slice(start, end)
  }
}
