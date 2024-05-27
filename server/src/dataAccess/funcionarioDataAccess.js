import { Mongo } from "../config/database.js"
import { ObjectId} from "mongodb"

const collectionName = 'funcionario'

export default class FuncionarioDataAccess {
    async getFuncionario(){
        try {
            const result = await Mongo.getDb()
                .collection(collectionName)
                .find({})
                .toArray()

            return result
        } catch (error) {
            console.error('Error fetching funcionario:', error)
            throw error
        }
        
    }
    
    async deleteFuncionario(funcionarioId){
        try {
            const result = await Mongo.getDb()
                .collection(collectionName)
                .findOneAndDelete({ _id: new ObjectId(funcionarioId) })
            return result
        } catch (error) {
            console.log('Error deleting funcionario: ', error)
            throw error
        }
        
    }

    async updateFuncionario (funcionarioId, funcionarioData) {
        try {
            const result = await Mongo.getDb()
                .collection(collectionName)
                .findOneAndUpdate(
                    { _id: new ObjectId(funcionarioId) },
                    { $set: funcionarioData },
                    { returnDocument: 'after' }
                )

            return result.value


        } catch (error) {
            console.error('Error updating funcionario:', error)
            throw error
        }
    }
}