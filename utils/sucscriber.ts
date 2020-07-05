import io from 'socket.io-client'

const targetEvents = ['batch-stat', 'events']

export default class Subscriber {
  static listeners: { [name: string]: Function[] } = {}

  static connect() {
    const socket = io(process.env.SERVER_URL)
    socket.on('connect', () => console.log('connect'))

    targetEvents.forEach((ev) => {
      socket.on(ev, (data) => {
        this.publish(ev, data)
      })
    })

    socket.on('disconnect', () => console.log('disconnect'))
  }

  static subscribe(key, listener) {
    if (!this.listeners[key]) {
      this.listeners[key] = []
    }

    this.listeners[key].push(listener)
    return () => {
      Subscriber.unsubscribe(key, listener)
    }
  }

  static unsubscribe(key, listener) {
    if (!this.listeners[key]) {
      return
    }

    const arr = this.listeners[key]
    const idx = arr.findIndex((_listener) => _listener === listener)
    if (idx >= 0) {
      arr.splice(idx, 1)
    }
  }

  static unsubscribeAll(key) {
    if (!this.listeners[key]) {
      return
    }

    this.listeners[key] = []
  }

  static publish(key, data) {
    if (this.listeners[key]) {
      this.listeners[key].forEach((listener) => listener(data))
    }
  }
}
