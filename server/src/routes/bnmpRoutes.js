import express from 'express'
import BnmpControllers from '../controllers/bnmpController.js'

const bnmpRouter = express.Router()

const bnmpControllers = new BnmpControllers()

bnmpRouter.get('/', async (req, res)  => {
    const { success, statusCode, body } = await bnmpControllers.getBnmp()

    res.status(statusCode).send({ success, statusCode, body })
})

bnmpRouter.delete('/:id', async (req, res) => {
   const { success, statusCode, body } = await bnmpControllers.deleteBnmp(req.params.id)

   res.status(statusCode).send({ success, statusCode, body })
})

bnmpRouter.put('/:id', async (req, res) => {
    const { success, statusCode, body } = await bnmpControllers.updateBnmp(req.params.id, req.body)
 
    res.status(statusCode).send({ success, statusCode, body })
 })
export default bnmpRouter