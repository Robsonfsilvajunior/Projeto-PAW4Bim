const Banco = require('./Banco');

module.exports = class Carro {
    constructor() {
        this.id_carros = null;
        this._modelo = null;
        this._ano = null;
        this._marca = null;
        this._disponivel = null;
    }


    create = async () => {
        const SQL = 'INSERT INTO carros (modelo, ano, marca, disponivel) VALUES (?, ?, ?, ?);';
        
        try {
            const conexao = Banco.getConexao();
            const [result] = await conexao.promise().execute(SQL, [this._modelo, this._ano, this._marca, this._disponivel]);
            this.id_carros = result.insertId;
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao criar o carro:', error);
            return false;
        }
    }

    delete = async () => {
        const SQL = 'DELETE FROM carros WHERE id_carros = ?;';
        
        try {
            const conexao = Banco.getConexao();
            const [result] = await conexao.promise().execute(SQL, [this.id_carros]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao excluir o carro:', error);
            return false;
        }
    }

    update = async () => {
        const SQL = 'UPDATE carros SET modelo = ?, ano = ?, marca = ?, disponivel = ? WHERE id_carros = ?;';
        try {
            const conexao = Banco.getConexao();
            const [result] = await conexao.promise().execute(SQL, [this._modelo, this._ano, this._marca, this._disponivel, this.id_carros]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar o carro:', error);
            return false;
        }
    }



    readAll = async () => { 
        const SQL = 'SELECT * FROM carros;';
        
        try {
            const conexao = Banco.getConexao();
            const [matrizrRespostas] = await conexao.promise().execute(SQL);
            return matrizrRespostas;
        } catch (error) {
            console.error('Erro ao ler carros:', error);
            return [];
        }
    }

    readByID = async () => {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM carros WHERE id_carros = ?;';
        
        try {
            const [matrizrRespostas] = await conexao.promise().execute(SQL, [this.id_carros]);
            return matrizrRespostas;
        } catch (error) {
            console.error('Erro ao ler carro pelo ID:', error);
            return null;
        }
    }

    get idCarro() {
        return this.id_carros;
    }

    set idCarro(novoIdCarro) {
        this.id_carros = novoIdCarro;
    }

    get modelo() {
        return this._modelo;
    }

    set modelo(novoModelo) {
        this._modelo = novoModelo;
    }

    get ano() {
        return this._ano;
    }

    set ano(novoAno) {
        this._ano = novoAno;
    }

    get marca() {
        return this._marca;
    }

    set marca(novaMarca) {
        this._marca = novaMarca;
    }

    get disponivel() {
        return this._disponivel;
    }

    set disponivel(novoDisponivel) {
        this._disponivel = novoDisponivel;
    }



}

module.exports = Carro;
