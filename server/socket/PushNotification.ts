import RedisHelper from '../redis/RedisHelper'
import EventCollection from '../models/EventCollection'

export default function PushNotification(io, socket) {
  console.log('socket.connection')

  const redis = RedisHelper.create()
  redis.subscribe(EventCollection.KEY, 'batch-stat', (err, count) => {
    console.log('start subscribe')
  })

  redis.on('message', function (channel, message) {
    // console.log("Receive message %s from channel %s", message, channel);
    const data = JSON.parse(message)
    io.emit(channel, data)
  })

  socket.on('disconnect', () => {
    console.log('socket.disconnect')
    redis.disconnect()
  })
}
