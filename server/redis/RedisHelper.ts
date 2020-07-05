import Redis from 'ioredis'

const STORE_KEY_PREFIX = 'nuxt-express'
const storeKey = (key) => `${STORE_KEY_PREFIX}-${key}`
export default class RedisHelper {
  private static _pub

  static create() {
    const port = Number(process.env.REDIS_PORT)
    const host = process.env.REDIS_HOST
    return new Redis(port, host)
  }

  static publish(key: string, message: string) {
    if (!this._pub) {
      this._pub = this.create()
    }
    this._pub.publish(key, message)
  }

  static publishObj(key: string, model: Object) {
    try {
      RedisHelper.publish(key, JSON.stringify(model))
    } catch (e) {
      console.error('Error RedisHelper#publishObj', e)
    }
  }

  static async save(
    key: string,
    model: Object,
    options?: { withPub?: boolean }
  ) {
    const redis = RedisHelper.create()
    try {
      const json = JSON.stringify(model)
      await redis.lpush(storeKey(key), json)
      if (options && options.withPub) {
        this.publish(key, json)
      }
    } catch (e) {
      console.error('Error RedisHelper#save', e)
    } finally {
      redis.disconnect()
    }
  }

  static async list(key: string) {
    const redis = RedisHelper.create()
    let list = []
    try {
      const res = await redis.lrange(storeKey(key), 0, -1)
      if (!res) {
        return []
      }
      list = res.map((json) => JSON.parse(json))
    } catch (e) {
      console.error('Error RedisHelper#save', e)
    } finally {
      redis.disconnect()
    }

    return list
  }

  static async del(keys: string[]) {
    const redis = RedisHelper.create()
    try {
      await Promise.all(
        keys.map(async (key) => {
          return await redis.del(storeKey(key))
        })
      )
    } catch (e) {
      console.error('Error RedisHelper#del', e)
    } finally {
      redis.disconnect()
    }
  }
}
