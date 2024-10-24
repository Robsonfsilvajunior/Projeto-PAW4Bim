// Importa o módulo express para criação de APIs.
const express = require('express');
const Cliente = require('../model/Cliente'); // Alterado para o modelo Cliente
const MeuTokenJWT = require('../model/MeuTokenJWT');

module.exports = class LoginControl {

    async login(request, response) {
        const cliente = new Cliente();
        cliente.email = request.body.cliente.email;
        cliente.senha = request.body.cliente.senha;

        const logou = await cliente.login();

        if (logou == true) {
            const payloadToken = {
                email: cliente.idCliente, // Alterado para cliente
                role: "cliente", // Role cliente ao invés de funcionário
                name: cliente.nomeCliente,
                idCliente: cliente.idCliente
            };
            const jwt = new MeuTokenJWT();
            const token_string = jwt.gerarToken(payloadToken);

            const objResposta = {
                status: true,
                cod: 1,
                msg: 'Logado com sucesso',

                cliente: {
                    idCliente: cliente.idCliente,
                    nome: cliente.nomeCliente,
                    email: cliente.email,
                },
                token: token_string,
            };
            return response.status(200).send(objResposta);
        } else {
            const objResposta = {
                status: false,
                msg: 'Usuário ou senha inválidos'
            };
            return response.status(401).send(objResposta);
        }
    }
};