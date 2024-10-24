const express = require('express');
const Aluguel = require('../model/Aluguel'); // Novo modelo para Aluguel

module.exports = class AluguelControl {
    // Criar novo aluguel
    async create(request, response) {
        const aluguel = new Aluguel();
        aluguel.idCarro = request.body.aluguel.idCarro; // ID do carro sendo alugado
        aluguel.idCliente = request.body.aluguel.idCliente; // ID do cliente que aluga
        aluguel.dataInicio = request.body.aluguel.dataInicio;
        aluguel.dataFim = request.body.aluguel.dataFim;
        aluguel.valor = request.body.aluguel.valor;

        const isCreated = await aluguel.create();
        const objResposta = {
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'Aluguel criado com sucesso' : 'Erro ao criar aluguel'
        };
        response.status(200).send(objResposta);
    }

    // Atualizar aluguel
    async update(request, response) {
        const aluguel = new Aluguel();
        aluguel.idAluguel = request.params.idAluguel;
        aluguel.dataFim = request.body.aluguel.dataFim;
        aluguel.valor = request.body.aluguel.valor;

        const isUpdated = await aluguel.update();
        const objResposta = {
            cod: 1,
            status: isUpdated,
            msg: isUpdated ? 'Aluguel atualizado com sucesso' : 'Erro ao atualizar aluguel'
        };
        response.status(200).send(objResposta);
    }

    // Excluir aluguel
    async delete(request, response) {
        const aluguel = new Aluguel();
        aluguel.idAluguel = request.params.idAluguel;

        const isDeleted = await aluguel.delete();
        const objResposta = {
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'Aluguel excluído com sucesso' : 'Erro ao excluir aluguel'
        };
        response.status(200).send(objResposta);
    }

    // Ler todos os aluguéis
    async readAll(request, response) {
        const aluguel = new Aluguel();
        const resultado = await aluguel.readAll();
        const objResposta = {
            cod: 1,
            status: true,
            msg: 'Executado com sucesso',
            alugueis: resultado
        };
        response.status(200).send(objResposta);
    }

    // Ler aluguel por ID
    async readById(request, response) {
        const aluguel = new Aluguel();
        aluguel.idAluguel = request.params.idAluguel;

        const resultado = await aluguel.readByID();
        const objResposta = {
            cod: 1,
            status: true,
            msg: resultado ? 'Aluguel encontrado' : 'Aluguel não encontrado',
            aluguel: resultado
        };
        response.status(200).send(objResposta);
    }
};