import Batch from 'batch'
import RedisHelper from '../redis/RedisHelper'
import EventCollection from '../models/EventCollection'

interface BatchStatus {
  taskName: string
  progress?: number
}

export default class BatchController {
  private static statMap: { [name: string]: BatchStatus } = {}
  static KEY = 'batch-stat'
  private static setStat(taskName: string, progress: number) {
    if (this.statMap[taskName]) {
      if (this.statMap[taskName].progress !== progress) {
        this.statMap[taskName].progress = progress
      } else {
        return
      }
    } else {
      this.statMap[taskName] = {
        taskName,
        progress,
      }
    }

    RedisHelper.publishObj(this.KEY, { taskName, progress })
  }

  private static monitorBatch(taskName: string, batch: Batch) {
    this.setStat(taskName, 0)

    batch.on('progress', (e) => {
      this.setStat(taskName, (e.complete / e.total) * 100)
    })

    batch.end((err) => {
      this.setStat(taskName, 100)
      EventCollection.save({
        type: 'Batch',
        message: `${taskName} is Finish`,
        status: err ? 'ERROR' : 'SUCCESS',
      })
    })
  }

  static example() {
    const batch = new Batch()
    batch.concurrency(3)

    const task = (id) => {
      return new Promise((resole) => {
        setTimeout(() => resole(`task:${id}`), 50)
      })
    }

    for (let i = 0; i < 300; i++) {
      batch.push(async (done) => {
        const res = await task(i)
        done(null, `${res} is done`)
      })
    }
    this.monitorBatch('example', batch)
  }
}
