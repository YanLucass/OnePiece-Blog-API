import pool from "../db/conn";

class Toughts {

    constructor(title, content) {
        this.title = title;
        this.content = content;
    }

    static async saveTought(tought) {
        try {
            const { title, content, userId } = tought;
            const query = `INSERT INTO toughts (title, content, user_id) VALUES ($1, $2, $3)`
            const values = [title, content, userId];
            await pool.query(query, values);
        }

        catch(err) {
            console.log('Erro ao criar o pensamento',err);
        }
    }

    //getAll
    static async getAllThoughts() {
        try {
            const query = `
              SELECT toughts.*, users.name AS user_name 
              FROM toughts 
              INNER JOIN users ON toughts.user_id = users.id
            `;
            const result = await pool.query(query);
            return result.rows;
        } catch(err) {
            console.log('Erro ao pegar todos pensamentos', err);
            throw err; // É importante lançar o erro para que seja tratado posteriormente
        }
    }


}

export default Toughts