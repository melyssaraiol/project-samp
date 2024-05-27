import express from 'express'
import cors from 'cors'
import { Mongo } from './config/database.js'
import { config } from 'dotenv'
import authRouter from './auth/authController.js'
import passport from './auth/passportConfig.js'
import usersRouter from './routes/usersRoutes.js'


config()

async function main() {
    const hostname = 'localhost'
    const port = process.env.PORT || 5000

    const app = express()

    // Conecta ao MongoDB
    const mongoConnection = await Mongo.connect({
        mongoConnectionString: process.env.MONGO_CS,
        mongoDbName: process.env.MONGO_DB_NAME
    })

    console.log(mongoConnection)


    // Middleware
    app.use(express.json())
    app.use(cors())
    app.use(passport.initialize())

     // Rota raiz
     app.get('/', (req, res) => {
        res.send({
            success: true,
            statusCode: 200,
            body: 'Welcome to SAMP!'
        })
    })


    // Routes
    app.use('/auth', authRouter)
    app.use('/users', usersRouter)


    // Inicia o servidor
    const server = app.listen(port, () => {
        console.log(`Server running on: http://${hostname}:${port}`)
    })

    async function closeServer() {
        console.log('Closing server...')
        server.close(async (err) => {
            if (err) {
                console.error('Error closing server:', err)
                process.exit(1)
            }
            // Desconecta do MongoDB
            await Mongo.disconnect()
            console.log('Server closed and MongoDB disconnected')
            process.exit(0)
        })
    }

}

main().catch((error) => {
    console.error('Error starting server:', error)
    process.exit(1)
})