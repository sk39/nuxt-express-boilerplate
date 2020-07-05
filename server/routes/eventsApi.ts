import * as express from 'express'
import EventCollection from '../models/EventCollection'

const router: express.Router = express.Router()

router.get('/', async (req: express.Request, res: express.Response) => {
  const list = await EventCollection.list()
  res.send({ list })
})

router.post('/', async (req: express.Request, res: express.Response) => {
  await EventCollection.save(req.body)
  res.send({ message: '[success] post event api' })
})

router.post('/clear', async (req: express.Request, res: express.Response) => {
  await EventCollection.clear()
  res.send({ message: '[success] post event/clear api' })
})

export default router
