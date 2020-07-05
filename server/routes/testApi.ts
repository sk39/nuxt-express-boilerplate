import * as express from 'express'

const router: express.Router = express.Router()

router.get('/', (req: express.Request, res: express.Response) => {
  setTimeout(() => {
    res.send({ message: '[success] get test api' })
  }, 2000)
})

router.post('/', (req: express.Request, res: express.Response) => {
  setTimeout(() => {
    res.send({ message: '[success] post test api' })
  }, 2000)
})

export default router
