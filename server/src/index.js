import express from 'express'
import cors from 'cors'

async function main() {
    const hostname = 'localhost'
    const port = process.env.PORT || 5000

    const app = express()

    // Middleware
    app.use(express.json())
    app.use(cors())

     // Rota raiz
     app.get('/', (req, res) => {
        res.send({
            success: true,
            statusCode: 200,
            body: 'Welcome to SAMP!'
        })
    })

    // Inicia o servidor
    const server = app.listen(port, () => {
        console.log(`Server running on: http://${hostname}:${port}`)
    })

}

main()