import CryptoJS from "crypto-js";
import md5 from 'md5';
import db from '../clients/db.mysql.js'

export default {
    async registration(req, res) {
        try {
            const body = req.body;

            const [existingUsers] = await db.query(
                `SELECT * FROM users WHERE email = ? LIMIT 1`,
                [body.email]
            );

            if (existingUsers.length > 0) {
                return res.status(400).json({message: 'User with this email already exists'});
            }

            const [rows] = await db.query(
                'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
                [body.name, body.email.toLowerCase(), md5(md5(body.password) + process.env.SECRET)]
            );
            res.json({"message": "Users registration successfulness", rows});
        } catch (err) {
            res.status(500).json({"message": err});
        }
    },
    async login(req, res) {
        try {
            const body = req.body;

            const [existingUsers] = await db.query(
                `SELECT * FROM users WHERE email = ? AND password = ?`,
                [body.email.toLowerCase(), md5(md5(body.password) + process.env.SECRET)]
            );

            if (existingUsers.length === 0) {
                return res.status(401).json({"message": "Invalid email or password"});
            }

            const hash = CryptoJS.AES.encrypt(JSON.stringify({
                email: existingUsers[0].email.toLowerCase(),
                id: existingUsers[0].id,
            }), process.env.SECRET).toString();

            res.json({"message": "Users login successfulness", "your token": hash});
        } catch (err) {
            res.status(500).send({"message": "Server error", "error": err.message});
        }
    },
    async getProfile(req, res) {
        try {
            const body = req.body;

            const [existingUsers] = await db.query(
                `SELECT * FROM users WHERE id = ?`,
                [body.id]
            );

            if (existingUsers.length === 0) {
                return res.status(401).json({"message": "Invalid id"});
            }
            res.status(200).json({"Your profile": existingUsers[0]});

        } catch (err) {
            res.status(500).send({"message": "Server error", "error": err.message});
        }
    },
    async update(req, res) {
        try {
            const body = req.body;
            const [existingUsers] = await db.query(
                `SELECT * FROM users WHERE id = ?`,
                [body.id]
            );

            if (existingUsers.length === 0) {
                return res.status(401).json({"message": "Invalid id"});
            }

            if (body.email || body.password || body.username) {
                if (body.email) {
                    const [rows] = await db.query(
                        `
                    UPDATE users
                    SET email = ?
                    WHERE id = ?
                `,
                        [body.email.toLowerCase(), body.id]
                    );

                }
                if (body.password) {
                    const [rows] = await db.query(
                        `
                    UPDATE users
                    SET password = ?
                    WHERE id = ?
                `,
                        [md5(md5(body.password)+ process.env.SECRET), body.id]
                    );
                }
                if (body.username) {
                    const [rows] = await db.query(
                        `
                    UPDATE users
                    SET username = ?
                    WHERE id = ?
                `,
                        [body.username, body.id]

                    );
                }

                res.status(200).json({"message": "User updated successfulness"});
            }else{
                res.status(401).json({"message": "user dont updated"});
            }
        } catch (err) {
            res.status(500).json({"message": "Server error", "error": err.message});
        }

    },
    async delete(req, res){
        try {
            const body = req.body;

            const [rows] = await db.query(
                `
                    delete from users
                     where email = ? AND
                     password = ?
                `,
                [ body.email.toLowerCase(), md5(md5(body.password) + process.env.SECRET)]
            );
            res.status(200).json({"message": "User deleted", rows});

        }catch (err) {
            res.status(500).send({"message": "Server error", "error": err.message});
        }
    }
}