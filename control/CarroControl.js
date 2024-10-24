// Importa o módulo express para criação de APIs.
const express = require('express');
// Importa o modelo Carro para realizar operações relacionadas à entidade Carro.
const Carro = require('../model/Carro');

// Exporta a classe CarroControl, que controla as operações de CRUD (Create, Read, Update, Delete) para o Carro.
module.exports = class CarroControl {
    // Método assíncrono para criar um novo carro.
    async create(request, response) {
        // Cria uma nova instância do modelo Carro.
        var carro = new Carro();
        // Atribui os valores passados no corpo da requisição (request body) à instância criada.
        carro.modelo = request.body.carro.modelo;
        carro.ano = request.body.carro.ano;
        carro.marca = request.body.carro.marca;
        carro.disponivel = request.body.carro.disponivel;
        
        // Chama o método create() do modelo Carro para inserir o novo carro no banco de dados.
        const isCreated = await carro.create();
        // Cria um objeto de resposta contendo o código, status e a mensagem de sucesso ou erro.
        const objResposta = {
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'Carro criado com sucesso' : 'Erro ao criar o carro'
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para excluir um carro existente.
    async delete(request, response) {
        // Cria uma nova instância do modelo Carro.
        var carro = new Carro();
        // Atribui o ID do carro passado como parâmetro na URL (request params) à instância criada.
        carro.idCarro = request.params.idCarro;
        // Chama o método delete() do modelo Carro para excluir o carro do banco de dados.
        const isDeleted = await carro.delete();
        // Cria um objeto de resposta com o código, status e a mensagem de sucesso ou erro.
        const objResposta = {
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'Carro excluído com sucesso' : 'Erro ao excluir o carro'
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para atualizar um carro existente.
    async update(request, response) {
        // Cria uma nova instância do modelo Carro.
        var carro = new Carro();
        // Atribui o ID e os valores do carro passados na URL e no corpo da requisição, respectivamente.
        carro.idCarro = request.params.idCarro;
        carro.modelo = request.body.carro.modelo;
        carro.ano = request.body.carro.ano;
        carro.marca = request.body.carro.marca;
        carro.disponivel = request.body.carro.disponivel;
        
        // Chama o método update() do modelo Carro para atualizar o carro no banco de dados.
        const isUpdated = await carro.update();
        // Cria um objeto de resposta com o código, status e a mensagem de sucesso ou erro.
        const objResposta = {
            cod: 1,
            status: isUpdated,
            msg: isUpdated ? 'Carro atualizado com sucesso' : 'Erro ao atualizar o carro'
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para obter todos os carros.
    async readAll(request, response) {
        // Cria uma nova instância do modelo Carro.
        var carro = new Carro();
        // Chama o método readAll() para buscar todos os carros no banco de dados.
        const resultado = await carro.readAll();
        // Cria um objeto de resposta contendo o código, status, mensagem e a lista de carros.
        const objResposta = {
            cod: 1,
            status: true,
            msg: 'Executado com sucesso',
            carros: resultado
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para obter um carro pelo ID.
    async realAllById(request, response) {
        // Cria uma nova instância do modelo Carro.
        var carro = new Carro();
        // Atribui o ID do carro passado como parâmetro na URL (request params) à instância criada.
        carro.idCarro = request.params.idCarro;

        // Chama o método readByID() para buscar o carro pelo ID no banco de dados.
        const resultado = await carro.readByID();
        // Cria um objeto de resposta contendo o código, status, mensagem e o carro encontrado (ou não).
        const objResposta = {
            cod: 1,
            status: true,
            msg: resultado ? 'Carro encontrado' : 'Carro não encontrado',
            carro: resultado
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    async createByCSV(request, response) {
        const multer = require('multer'); //npm install multer --save
        const csv = require('csv-parser'); //npm install csv-parser --save
        const fs = require('fs');
        const upload = multer({ dest: 'uploads/' });

        // Verifica se o arquivo foi enviado
        if (!request.file) {
            return response.status(400).send({
                cod: 0,
                status: false,
                msg: "Nenhum arquivo foi enviado."
            });
        }

        const carros = [];

        fs.readFile(request.file.path, 'utf8', (err, data) => {
            if (err) {
                console.error('Erro ao ler o arquivo CSV:', err);
                return;
            }

            const linhas = data.split('\n');
            // Assumindo que a primeira linha não é um cabeçalho e contém dados
            for (let i = 0; i < linhas.length; i++) {
                const linha = linhas[i].split(',');

                if (linha.length >= 4) { // Verifica se há pelo menos 4 colunas
                    const carro = new Carro();
                    carro.modelo = linha[0].trim();
                    carro.ano = parseInt(linha[1].trim());
                    carro.marca = linha[2].trim();
                    carro.disponivel = linha[3].trim() === 'true'; // Assume que disponível está como 'true' ou 'false'
                    carro.create();
                    carros.push(carro);
                }
            }

            const objResposta = {
                cod: 1,
                status: true,
                msg: 'Cadastrado com sucesso',
                carros: carros
            };
            response.status(201).send(objResposta);
        });
    }
};
