import db from '../clients/db.mysql.js'
import md5 from "md5";

export default{
    async createTask(req,res){
        try {
            const body = req.body;

            const [existingUsers] = await db.query(
                `SELECT * FROM users WHERE id = ? `,
                [body.userId]
            );

            if (existingUsers.length === 0) {
                return res.status(401).json({"message": "Invalid userId"});
            }

            const [rows] = await db.query(
                'INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)',
                [body.title,body.description, body.userId]
            );
            res.status(200).json({
                "message": "Task created successfully",
                "rows": rows
            })
        }catch(err){
            res.status(500).json({"message":"Server error","error":err.message})
        }
    },
    async getList(req,res){
        try {
            const body = req.body;

            if (!body.id) {
                const [rows] = await db.query(
                    'select * from tasks',
                );
                res.status(200).json({
                    "message": "Task list successfully",
                    "rows": rows
                })
                return
            }

            const [existingUsers] = await db.query(
                `SELECT * FROM users WHERE id = ? `,
                [body.userId]
            );

            if (existingUsers.length === 0) {
                return res.status(401).json({"message": "Invalid userId"});
            }


            const [rows] = await db.query(
                'select * from tasks where user_id=?',
                [body.userId]
            );
            res.status(200).json({
                "message": "Task list successfully",
                "rows": rows
            })
        }catch (err) {
            res.status(500).json({"message": "Server error", "error": err});
        }
    },
    async getSingleTask(req,res){
        try {
            const body = req.body;

            const [existingUsers] = await db.query(
                `SELECT * FROM tasks WHERE id = ? `,
                [body.id]
            );

            if (existingUsers.length === 0) {
                return res.status(401).json({"message": "Invalid id"});
            }else{
                res.status(200).json({
                    "message": "Task successfully",
                    "rows": existingUsers[0]
                })
            }


        }catch(err){
            res.status(500).send({"message": "Server error", "error": err});
        }
    },
    async updateTask(req, res){
        try {
            const body = req.body;

            const [existingUsers] = await db.query(
                `SELECT * FROM tasks WHERE id = ?`,
                [body.id]
            );

            if (existingUsers.length === 0) {
                return res.status(401).json({"message": "Invalid id"});
            }

            if (body.title || body.description ) {
                if (body.email) {
                    const [rows] = await db.query(
                        `
                    UPDATE tasks
                    SET title = ?
                    WHERE id = ?
                `,
                        [body.title, body.id]
                    );

                }

                if (body.description) {
                    const [rows] = await db.query(
                        `
                    UPDATE tasks
                    SET description = ?
                    WHERE id = ?
                `,
                        [body.description, body.id]

                    );
                }

                res.status(200).json({"message": "task updated successfulness"});
            }else{
                res.status(401).json({"message": "task dont updated"});
            }

        }catch(err){
            res.status(500).send({"message": "Server error", "error": err});
        }
    },
    async deleteTask(req,res){
        try {
            const body = req.body;

            const [existingUsers] = await db.query(
                `SELECT * FROM tasks WHERE id = ?`,
                [body.id]
            );

            if (existingUsers.length === 0) {
                return res.status(401).json({"message": "Invalid id"});
            }

            const [rows] = await db.query(
                `
                    delete from tasks
                     where id = ?
                `,
                [ body.id ]
            );
            res.status(200).json({"message": "task deleted", rows});

        }catch(err){
            res.status(500).send({"message": "Server error", "error": err});
        }
    }
}