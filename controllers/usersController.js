import {v4 as uuidv4} from 'uuid';
import mysql from "mysql2";
import db from '../clients/db.mysql.js'
export default {
    registration (req, res) {
        try {
            const body = req.body;
            body.uuid = uuidv4();

            // const [existingUsers] = db.query(
            //     `SELECT 1 FROM users WHERE email = ? LIMIT 1`,
            //     [body.email]
            // );
            //
            // if (existingUsers.length > 0) {
            //     return res.status(400).json({ message: 'User with this email already exists' });
            // }
            //
            // console.log(body.name, body.email, body.password,body.uuid)
            const [raws] = db.query(`
                INSERT INTO users (name, email, password, uuid)
                VALUES (body.name, body.email, body.password,body.uuid);
            `);
            res.json({raws});
        }catch(err) {
            res.status(500).json({"message": err.message});
        }
    }
}