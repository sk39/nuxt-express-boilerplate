import RedisHelper from '../redis/RedisHelper'
import EventCollection from '../models/EventCollection'
import BatchController from '../batch/BatchController'

export default function PushNotification(io, socket) {
  console.log('socket.connection')

  const redis = RedisHelper.create()
  redis.subscribe(EventCollection.KEY, BatchController.KEY, (err, count) => {
    if (err) {
      console.error(`Failed start subscribe`, err)
    } else {
      console.log(`start subscribe count=${count}`)
    }
  })

  redis.on('message', function (channel, message) {
    // console.log('Receive message %s from channel %s', message, channel)
    const data = JSON.parse(message)
    io.emit(channel, data)
  })

  socket.on('disconnect', () => {
    console.log('socket.disconnect')
    redis.disconnect()
  })
}
