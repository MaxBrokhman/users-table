export class DataManager {
  constructor(data) {
    this.data = data
    this.sortTerm = 'first_name'
    this.orderTerm = 'asc'
    this.searchTerm = ''
    this._stringSortValueProcessor = this._stringSortValueProcessor.bind(this)
    this._dateSortValueProcessor = this._dateSortValueProcessor.bind(this)
    this._sortValueProcessor = this._stringSortValueProcessor
  }

  _stringSortValueProcessor(str) {
    return str.toLowerCase()
  }

  _dateSortValueProcessor(date) {
    return typeof date === 'string' && date.length
      ? new Date(date.split('.').reverse()).getTime()
      : 0
  }

  getData() {
    return this.search()
  }

  add(item) {
    this.data.push(item)
    return this
  }

  update(id, data) {
    const itemIdx = this.data.findIndex(item => item.id === Number(id))
    if (itemIdx > -1) {
      this.data[itemIdx] = {
        ...this.data[itemIdx],
        ...data,
      }
    }
    return this
  }

  setSorting(sort) {
    this.sortTerm = sort
    return this
  }

  setOrder(order) {
    this.orderTerm = order
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
    if (!this.sortTerm) return this.data
    if (this.sortTerm.includes('date')) this._sortValueProcessor = this._dateSortValueProcessor
    return this.orderTerm === 'desc' 
      ? this.data.sort((a, b) => {
        const aValue = this._sortValueProcessor(a[this.sortTerm])
        const bValue = this._sortValueProcessor(b[this.sortTerm])
        if (aValue < bValue) {
          return 1;
        }
        if (aValue > bValue) {
          return -1;
        }
        return 0;
      })
      : this.data.sort((a, b) => {
        const aValue = this._sortValueProcessor(a[this.sortTerm])
        const bValue = this._sortValueProcessor(b[this.sortTerm])
        if (aValue > bValue) {
          return 1;
        }
        if (aValue < bValue) {
          return -1;
        }
        return 0;
      })
  }

  search() {
    return this.searchTerm 
      ? this.sort().filter(item => {
        const propValues = Object.values(item)
        const filteredProps = propValues.filter(value => typeof value === 'string')
        return filteredProps.some(value => value.toLowerCase().indexOf(this.searchTerm) > -1)
      })
      : this.sort() 
  }

  pick(start, end) {
    return this.getData().slice(start, end)
  }
}
