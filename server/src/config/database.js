import { MongoClient } from 'mongodb'

class MongoDatabase {
    constructor() {
        this.client = null
        this.db = null
    }

    /**
     * Conecta ao MongoDB usando a string de conexão e o nome do banco de dados fornecidos.
     * @param {string} mongoConnectionString - A string de conexão do MongoDB.
     * @param {string} mongoDbName - O nome do banco de dados.
     * @returns {Promise<string|object>} - Uma mensagem de sucesso ou um objeto de erro.
     */
    async connect({ mongoConnectionString, mongoDbName }) {
        try {
            this.client = new MongoClient(mongoConnectionString);


            await this.client.connect()
            this.db = this.client.db(mongoDbName)

            console.log('Connected to MongoDB!')
            return 'Connected to Mongo!'
        } catch (error) {
            console.error('Error during MongoDB connection:', error)
            return { text: 'Error during mongo connection', error }
        }
    }

    /**
     * Fecha a conexão com o MongoDB.
     */
    async disconnect() {
        if (this.client) {
            await this.client.close()
            console.log('Disconnected from MongoDB')
        }
    }

    /**
     * Obtém a instância do banco de dados.
     * @returns {object|null} - A instância do banco de dados ou null se não estiver conectado.
     */
    getDb() {
        return this.db;
    }
}

export const Mongo = new MongoDatabase();
 