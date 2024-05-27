import { Router } from 'express'
import passport from './passportConfig.js'
import jwt from 'jsonwebtoken'
import { generateSalt, hashPassword, findUserByEmail, createUser } from './authService.js'
import { Mongo } from '../config/database.js'
import { ObjectId } from 'mongodb'

const authRouter = Router()

authRouter.post('/signup', async (req, res) => {
    try {
        const { fullname, email, password } = req.body
        console.log('Signup request received:', { fullname, email }); // Log the request body

        const existingUser = await findUserByEmail(email)

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const salt = generateSalt()
        const hashedPassword = await hashPassword(password, salt)
        console.log('Generated salt and hashed password'); // Log after generating salt and hashing password

        const userId = await createUser({ fullname, email, password: hashedPassword, salt })
        console.log('User created with ID:', userId); // Log after creating user

        const user = await Mongo.getDb().collection('users').findOne({ _id: new ObjectId(userId) }, { projection: { password: 0, salt: 0 } })
        const token = jwt.sign(user, process.env.JWT_SECRET)
        console.log('JWT token generated'); // Log after generating token

        res.status(201).json({ message: 'User registered', user, token })
    } catch (error) {
        console.error('Error during registration:', error); // Log the error
        res.status(500).json({ message: 'Error during registration', error })
    }
})

authRouter.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Error during authentication:', err); // Log the error
            return res.status(500).json({ message: 'Error during authentication', error: err })
        }

        if (!user) {
            console.log('Incorrect credentials'); // Log incorrect credentials
            return res.status(400).json({ message: info.message })
        }

        const token = jwt.sign(user, process.env.JWT_SECRET)
        console.log('User logged in and JWT token generated'); // Log after user is authenticated and token generated
        res.status(200).json({ message: 'User logged in', user, token })
    })(req, res, next)
})

export default authRouter
