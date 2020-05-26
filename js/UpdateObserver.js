class UpdateObserver {
  constructor() {
    this.subscriptions = []
  }

  subscribe(fn) {
    this.subscriptions.push(fn)
  }

  unsubscribe(fn) {
    this.subscriptions = this.subscriptions.filter(sub => sub !== fn)
  }

  dispatch(data) {
    this.subscriptions.forEach(sub => sub(data));
  }
}

export const updater = new UpdateObserver()
