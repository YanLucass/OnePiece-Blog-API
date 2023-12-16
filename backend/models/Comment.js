import pool from "../db/conn";

class Comment {
    constructor(content) {
        this.content = content;
    }

    //save comment
    static async saveComment(comment) {
        const { content, toughtId, userId } = comment;
        const query = `INSERT INTO comments VALUES ($1, $2, $3) RETURNING *`
        const values = [content, toughtId, userId];
        try {
            const result = await pool.query(query, values);
            
            return result.rows;
        }
        catch(err) {
            console.error('Erro ao adicionar comentário', err);
            throw err;
        }
    }

    //get all comments
    static async getAllComments(toughtId) {

        try {
            const query = `SELECT * FROM comments WHERE tought_id = $1`
            const value = [toughtId];
            const result = await pool.query(query, value);
            return result.rows;
        }
        catch(err) {
            console.error('Erro ao buscar comentário', err);
            throw err; 
        }
    }
}

export default Comment;