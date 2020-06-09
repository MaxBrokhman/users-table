class UpdateObserver {
  constructor() {
    this.subscriptions = {}
  }

  subscribe(event, callback) {
    if (this.subscriptions[event]) {
      this.subscriptions[event].push(callback)
    } else {
      this.subscriptions[event] = [callback]
    }
  }

  unsubscribe(event, callback) {
    if (this.subscriptions[event]) {
      this.subscriptions = this.subscriptions.filter(sub => sub !== callback)
    }
  }

  dispatch(event, data) {
    if (this.subscriptions[event]) {
      this.subscriptions[event].forEach(sub => sub(data))
    }
  }
}

export const updater = new UpdateObserver()
