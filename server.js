import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

class Database {
    constructor() {
        this._connect()
    }
    _connect() {
        mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error')
            })
    }
}
export default new Database()