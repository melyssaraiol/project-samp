import express from 'express'
import FuncionarioControllers from '../controllers/funcionarioController.js'

const funcionarioRouter = express.Router()

const funcionarioControllers = new FuncionarioControllers()

funcionarioRouter.get('/', async (req, res)  => {
    const { success, statusCode, body } = await funcionarioControllers.getFuncionario()

    res.status(statusCode).send({ success, statusCode, body })
})

funcionarioRouter.delete('/:id', async (req, res) => {
   const { success, statusCode, body } = await funcionarioControllers.deleteFuncionario(req.params.id)

   res.status(statusCode).send({ success, statusCode, body })
})

funcionarioRouter.put('/:id', async (req, res) => {
    const { success, statusCode, body } = await funcionarioControllers.updateFuncionario(req.params.id, req.body)
 
    res.status(statusCode).send({ success, statusCode, body })
 })
export default funcionarioRouter