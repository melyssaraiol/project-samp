import { Mongo } from "../config/database.js"
import { ObjectId} from "mongodb"

const collectionName = 'bnmp'

export default class BnmpDataAccess {
    async getBnmp(){
        try {
            const result = await Mongo.getDb()
                .collection(collectionName)
                .find({})
                .toArray()

            return result
        } catch (error) {
            console.error('Error fetching mandados:', error)
            throw error
        }
        
    }
    
    async deleteBnmp(bnmpId){
        try {
            const result = await Mongo.getDb()
                .collection(collectionName)
                .findOneAndDelete({ _id: new ObjectId(bnmpId) })
            return result
        } catch (error) {
            console.log('Error deleting bnmp: ', error)
            throw error
        }
        
    }

    async updateBnmp (bnmpId, bnmpData) {
        try {
            const result = await Mongo.getDb()
                .collection(collectionName)
                .findOneAndUpdate(
                    { _id: new ObjectId(bnmpId) },
                    { $set: bnmpData },
                    { returnDocument: 'after' }
                )

            return result.value


        } catch (error) {
            console.error('Error updating mandado:', error)
            throw error
        }
    }
}