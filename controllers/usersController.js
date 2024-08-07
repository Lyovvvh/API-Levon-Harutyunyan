import {v4 as uuidv4} from 'uuid';
import CryptoJS from "crypto-js";
import md5 from 'md5';
import db from '../clients/db.mysql.js'

console.log(process.env)

export default {
    async registration(req, res) {
        try {
            const body = req.body;
            body.uuid = uuidv4();

            const [existingUsers] = await db.query(
                `SELECT * FROM users WHERE email = ? LIMIT 1`,
                [body.email]
            );

            if (existingUsers.length > 0) {
                return res.status(400).json({message: 'User with this email already exists'});
            }

            const [rows] = await db.query(
                'INSERT INTO users (username, email, password, uuid) VALUES (?, ?, ?, ?)',
                [body.name, body.email.toLowerCase(), md5(md5(body.password )+ process.env.SECRET), body.uuid]
            );
            res.json({"message":"Users registration successfulness",rows});
        } catch (err) {
            res.status(500).json({"message": err});
        }
    },
    async login(req, res) {
        try {
            const body = req.body;

            const [existingUsers] = await db.query(
                `SELECT * FROM users WHERE email = ? AND password = ?`,
                [body.email, md5(md5(body.password )+ process.env.SECRET)]
            );

            if (existingUsers.length === 0) {
                return res.status(401).json({"message": "Invalid email or password"});
            }

            const hash = CryptoJS.AES.encrypt(JSON.stringify({
                email: existingUsers[0].email.toLowerCase(),
                uuid: existingUsers[0].uuid,
            }), process.env.SECRET).toString();

            res.json({"message":"Users login successfulness","your token":hash});
        }catch(err){
            res.status(500).send({"message": "Server error", "error": err.message});
        }
    }
}