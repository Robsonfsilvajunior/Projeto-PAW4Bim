const Banco = require('./Banco');

class Carro {
    constructor() {
        this._id_carros = null;
        this._modelo = null;
        this._ano = null;
        this._marca = null;
        this._disponivel = null;
    }

    async create() {
        const conexao = Banco.getConexao();
        const SQL = 'INSERT INTO carros (modelo, ano, marca, disponivel) VALUES (?, ?, ?, ?);';
        
        try {
            const [result] = await conexao.promise().execute(SQL, [this._modelo, this._ano, this._marca, this._disponivel]);
            this._id_carros = result.insertId;
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao criar o carro:', error);
            return false;
        }
    }

    async delete() {
        const conexao = Banco.getConexao();
        const SQL = 'DELETE FROM carros WHERE id_carros = ?;';
        
        try {
            const [result] = await conexao.promise().execute(SQL, [this._id_carros]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao excluir o carro:', error);
            return false;
        }
    }

    async update() {
        const conexao = Banco.getConexao();
        const SQL = 'UPDATE carros SET modelo = ?, ano = ?, marca = ?, disponivel = ? WHERE id_carros = ?;';
        
        try {
            const [result] = await conexao.promise().execute(SQL, [this._modelo, this._ano, this._marca, this._disponivel, this._id_carros]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar o carro:', error);
            return false;
        }
    }

    async readAll() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM carros ORDER BY modelo;';
        
        try {
            const [rows] = await conexao.promise().execute(SQL);
            return rows;
        } catch (error) {
            console.error('Erro ao ler carros:', error);
            return [];
        }
    }

    async readByID() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM carros WHERE id_carros = ?;';
        
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._id_carros]);
            return rows;
        } catch (error) {
            console.error('Erro ao ler carro pelo ID:', error);
            return null;
        }
    }
}

module.exports = Carro;
