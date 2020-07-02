import * as express from 'express'

const router: express.Router = express.Router()

router.get('/', (req: express.Request, res: express.Response) => {
  res.send({ message: '[success] get test api' })
})

router.post('/', (req: express.Request, res: express.Response) => {
  res.send({ message: '[success] post test api' })
})

export default router

