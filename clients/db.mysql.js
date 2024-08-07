import mysql from 'mysql2'

const dbConfig = {
    host: process.env.HOST,
    user: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}

const connection = mysql.createConnection(dbConfig);

export default connection.promise();