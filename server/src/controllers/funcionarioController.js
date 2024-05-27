import FuncionarioDataAccess from "../dataAccess/funcionarioDataAccess.js"
import { ok, serverError } from '../helpers/httpResponse.js'

export default class FuncionarioControllers {
    constructor() {
        this.dataAccess = new FuncionarioDataAccess()
    }

    async getFuncionario() {
        try {
            const funcionario = await this.dataAccess.getFuncionario()
            return ok(funcionario)
        } catch (error) {
            return serverError(error)
        }
    }

    async deleteFuncionario(funcionarioId) {
        try {
            const result = await this.dataAccess.deleteFuncionario(funcionarioId)
            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }

    async updateFuncionario(funcionarioId, funcionarioData) {
        try {
            const result = await this.dataAccess.updateFuncionario(funcionarioId, funcionarioData)
            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }
}