import * as express from 'express'
import BatchController from '../batch/BatchController'

const router: express.Router = express.Router()

router.post('/example', (req: express.Request, res: express.Response) => {
  BatchController.example()
  res.send({ message: '[success] start batch example' })
})

export default router

