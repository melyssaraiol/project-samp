import BnmpDataAccess from "../dataAccess/bnmpDataAccess.js"
import { ok, serverError } from '../helpers/httpResponse.js'

export default class BnmpControllers {
    constructor() {
        this.dataAccess = new BnmpDataAccess()
    }

    async getBnmp() {
        try {
            const bnmp = await this.dataAccess.getBnmp()
            return ok(bnmp)
        } catch (error) {
            return serverError(error)
        }
    }

    async deleteBnmp(bnmpId) {
        try {
            const result = await this.dataAccess.deleteBnmp(bnmpId)
            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }

    async updateBnmp(bnmpId, bnmpData) {
        try {
            const result = await this.dataAccess.updateBnmp(bnmpId, bnmpData)
            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }
}