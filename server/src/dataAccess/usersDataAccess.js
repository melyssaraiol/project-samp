import { Mongo } from "../config/database.js"
import { ObjectId, ReturnDocument } from "mongodb"
import crypto from 'crypto'
import { generateSalt, hashPassword } from "../auth/authService.js"

const collectionName = 'users'

export default class UsersDataAccess {
    async getUsers(){
        try {
            const result = await Mongo.getDb()
                .collection(collectionName)
                .find({})
                .toArray()

            return result
        } catch (error) {
            console.error('Error fetching users:', error)
            throw error
        }
        
    }
    
    async deleteUser(userId){
        try {
            const result = await Mongo.getDb()
                .collection(collectionName)
                .findOneAndDelete({ _id: new ObjectId(userId) })
            return result
        } catch (error) {
            console.log('Error deleting user: ', error)
            throw error
        }
        
    }

    async updateUser (userId, userData) {
        try {
            if(userData.password) {
                const salt = generateSalt()
                const hashedPassword = await hashPassword(userData.password, salt)

                userData = { ...userData, password: hashedPassword, salt }
            }

            const result = await Mongo.getDb()
                .collection(collectionName)
                .findOneAndUpdate(
                    { _id: new ObjectId(userId) },
                    { $set: userData },
                    { returnDocument: 'after' }
            )

            return result.value

        } catch (error) {
            console.error('Error updating user:', error)
            throw error
        }
    }
}