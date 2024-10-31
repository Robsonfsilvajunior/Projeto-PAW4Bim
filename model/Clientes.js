const Banco = require('./Banco');

class Cliente {
    constructor() {
        this._id_clientes = null;
        this._nome = null;
        this._email = null;
        this._telefone = null;
        this._senha = null;
    }

    async create() {
        const conexao = Banco.getConexao();
        const SQL = 'INSERT INTO clientes (nome, email, telefone, senha) VALUES (?, ?, ?, ?);';
        
        try {
            const [result] = await conexao.promise().execute(SQL, [this._nome, this._email, this._telefone, this._senha]);
            this._id_clientes = result.insertId;
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao criar o cliente:', error);
            return false;
        }
    }

    async delete() {
        const conexao = Banco.getConexao();
        const SQL = 'DELETE FROM clientes WHERE id_clientes = ?;';
        
        try {
            const [result] = await conexao.promise().execute(SQL, [this._id_clientes]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao excluir o cliente:', error);
            return false;
        }
    }

    async update() {
        const conexao = Banco.getConexao();
        const SQL = 'UPDATE clientes SET nome = ?, email = ?, telefone = ?, senha = ? WHERE id_clientes = ?;';
        
        try {
            const [result] = await conexao.promise().execute(SQL, [this._nome, this._email, this._telefone, this._senha, this._id_clientes]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar o cliente:', error);
            return false;
        }
    }

    async readAll() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM clientes ORDER BY nome;';
        
        try {
            const [rows] = await conexao.promise().execute(SQL);
            return rows;
        } catch (error) {
            console.error('Erro ao ler clientes:', error);
            return [];
        }
    }

    async readByID() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM clientes WHERE id_clientes = ?;';
        
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._id_clientes]);
            return rows;
        } catch (error) {
            console.error('Erro ao ler cliente pelo ID:', error);
            return null;
        }
    }
}

module.exports = Cliente;
