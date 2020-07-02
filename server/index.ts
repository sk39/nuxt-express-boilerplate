import express from 'express'
import testApi from './routes/testApi'
import batchApi from './routes/batchApi'
import eventsApi from './routes/eventsApi'
import PushNotification from './socket/PushNotification'
require('@sk39/dotenv-ex').config()
const app: express.Express = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/test', testApi)
app.use('/api/batch', batchApi)
app.use('/api/events', eventsApi)

io.on('connection', (socket) => {
  PushNotification(io, socket)
})

const port = process.env.PORT || 3333
http.listen(port, () => {
  console.log(`Pref test server listening on port ${port}!`)
})
