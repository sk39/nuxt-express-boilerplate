import RedisHelper from '../redis/RedisHelper'

export interface Event {
  date: string
  type: string
  message: string
  status?: string
}

export default class EventCollection {
  static events: Event[] = []
  static KEY = 'events'
  private static loaded = false

  static async load() {
    this.events = await RedisHelper.list(this.KEY)
    console.log('load events', this.events)
  }

  static async save(event: Event) {
    await RedisHelper.save(this.KEY, event, { withPub: true })
    this.events.unshift(event)
  }

  static async list() {
    if (!this.loaded) {
      await this.load()
      this.loaded = true
    }

    return this.events
  }
}
