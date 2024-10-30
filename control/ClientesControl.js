// Importa o módulo express para criação de APIs.
const express = require('express');
// Importa o nome Clientes para realizar operações relacionadas à entidade Clientes.
const Clientes = require('../model/Clientes');

// Exporta a classe CarroControl, que controla as operações de CRUD (Create, Read, Update, Delete) para o Clientes.
module.exports = class CarroControl {
    // Método assíncrono para criar um novo clientes.
    async create(request, response) {
        // Cria uma nova instância do nome Clientes.
        var clientes = new Clientes();
        // Atribui os valores passados no corpo da requisição (request body) à instância criada.
        clientes.nome = request.body.clientes.nome;
        clientes.telefone = request.body.clientes.telefone;
        clientes.email = request.body.clientes.email;
        clientes.senha = request.body.clientes.senha;
        
        // Chama o método create() do nome Clientes para inserir o novo clientes no banco de dados.
        const isCreated = await clientes.create();
        // Cria um objeto de resposta contendo o código, status e a mensagem de sucesso ou erro.
        const objResposta = {
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'Clientes criado com sucesso' : 'Erro ao criar o clientes'
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para excluir um clientes existente.
    async delete(request, response) {
        // Cria uma nova instância do nome Clientes.
        var clientes = new Clientes();
        // Atribui o ID do clientes passado como parâmetro na URL (request params) à instância criada.
        clientes.id_clientes = request.params.id_clientes;
        // Chama o método delete() do nome Clientes para excluir o clientes do banco de dados.
        const isDeleted = await clientes.delete();
        // Cria um objeto de resposta com o código, status e a mensagem de sucesso ou erro.
        const objResposta = {
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'Clientes excluído com sucesso' : 'Erro ao excluir o clientes'
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para atualizar um clientes existente.
    async update(request, response) {
        // Cria uma nova instância do nome Clientes.
        var clientes = new Clientes();
        // Atribui o ID e os valores do clientes passados na URL e no corpo da requisição, respectivamente.
        clientes.id_clientes = request.params.id_clientes;
        clientes.nome = request.body.clientes.nome;
        clientes.telefone = request.body.clientes.telefone;
        clientes.email = request.body.clientes.email;
        clientes.senha = request.body.clientes.senha;
        
        // Chama o método update() do nome Clientes para atualizar o clientes no banco de dados.
        const isUpdated = await clientes.update();
        // Cria um objeto de resposta com o código, status e a mensagem de sucesso ou erro.
        const objResposta = {
            cod: 1,
            status: isUpdated,
            msg: isUpdated ? 'Clientes atualizado com sucesso' : 'Erro ao atualizar o clientes'
        };
        // Envia a resposta HTTP com status 200 e o objeto de resposta.
        response.status(200).send(objResposta);
    }

    // Método assíncrono para obter todos os carros.
    async readAll(request, response) {
        // Cria uma nova instância do nome Clientes.
        var clientes = new Clientes();
        // Chama o método readAll() para buscar todos os carros no banco de dados.
        const resultado = await clientes.readAll();
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

    // Método assíncrono para obter um clientes pelo ID.
    async realAllById(request, response) {
        // Cria uma nova instância do nome Clientes.
        var clientes = new Clientes();
        // Atribui o ID do clientes passado como parâmetro na URL (request params) à instância criada.
        clientes.id_clientes = request.params.id_clientes;

        // Chama o método readByID() para buscar o clientes pelo ID no banco de dados.
        const resultado = await clientes.readByID();
        // Cria um objeto de resposta contendo o código, status, mensagem e o clientes encontrado (ou não).
        const objResposta = {
            cod: 1,
            status: true,
            msg: resultado ? 'Clientes encontrado' : 'Clientes não encontrado',
            clientes: resultado
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
                    const clientes = new Clientes();
                    clientes.nome = linha[0].trim();
                    clientes.telefone = parseInt(linha[1].trim());
                    clientes.email = linha[2].trim();
                    clientes.senha = linha[3].trim() === 'true'; // Assume que disponível está como 'true' ou 'false'
                    clientes.create();
                    carros.push(clientes);
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
