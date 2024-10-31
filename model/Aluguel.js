const Banco = require('./Banco');
const Cliente = require('./Clientes');
const Carro = require('./Carros');

class Aluguel {
    constructor() {
        this._clientes_id_clientes = null;
        this._carros_id_carros = null;
        this._data_inicio = null;
        this._data_fim = null;
    }

    async create() {
        const conexao = Banco.getConexao();
        const SQL = 'INSERT INTO aluguel (clientes_id_clientes, carros_id_carros, data_inicio, data_fim) VALUES (?, ?, ?, ?);';
        
        try {
            const [result] = await conexao.promise().execute(SQL, [this._clientes_id_clientes, this._carros_id_carros, this._data_inicio, this._data_fim]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao criar o aluguel:', error);
            return false;
        }
    }

    async delete() {
        const conexao = Banco.getConexao();
        const SQL = 'DELETE FROM aluguel WHERE clientes_id_clientes = ? AND carros_id_carros = ?;';
        
        try {
            const [result] = await conexao.promise().execute(SQL, [this._clientes_id_clientes, this._carros_id_carros]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao excluir o aluguel:', error);
            return false;
        }
    }

    async update() {
        const conexao = Banco.getConexao();
        const SQL = 'UPDATE aluguel SET data_inicio = ?, data_fim = ? WHERE clientes_id_clientes = ? AND carros_id_carros = ?;';
        
        try {
            const [result] = await conexao.promise().execute(SQL, [this._data_inicio, this._data_fim, this._clientes_id_clientes, this._carros_id_carros]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar o aluguel:', error);
            return false;
        }
    }

    async readAll() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM aluguel ORDER BY data_inicio;';
        
        try {
            const [rows] = await conexao.promise().execute(SQL);
            return rows;
        } catch (error) {
            console.error('Erro ao ler alugueis:', error);
            return [];
        }
    }

    async readByClienteAndCarro() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM aluguel WHERE clientes_id_clientes = ? AND carros_id_carros = ?;';
        
        try {
            const [rows] = await conexao.promise().execute(SQL, [this._clientes_id_clientes, this._carros_id_carros]);
            return rows;
        } catch (error) {
            console.error('Erro ao ler aluguel pelo cliente e carro:', error);
            return null;
        }
    }
}

module.exports = Aluguel;
