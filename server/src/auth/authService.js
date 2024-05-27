import crypto from 'crypto'
import { Mongo } from "../config/database.js"
import { ObjectId } from 'mongodb'

const collectionName = 'users'

const generateSalt = () => crypto.randomBytes(32)
const hashPassword = (password, salt) => new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 310000, 32, 'sha256', (err, hashedPassword) => {
        if (err) {
            reject(err)
        } 
        resolve(hashedPassword)
    });
});

const findUserByEmail = async (email) => {
    try {
        return await Mongo.getDb().collection(collectionName).findOne({ email })
    } catch (error) {
        console.error('Error finding user by email:', error) // Log the error
        throw error
    }
}

const createUser = async (user) => {
    try {
        const result = await Mongo.getDb().collection(collectionName).insertOne(user)
        return result.insertedId
    } catch (error) {
        console.error('Error creating user:', error) // Log the error
        throw error
    }
}

export { generateSalt, hashPassword, findUserByEmail, createUser }
