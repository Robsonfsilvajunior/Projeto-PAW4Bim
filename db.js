const express = require('express');
const mysql = require('mysql2');
const app = express();

// Conectar ao banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'nome_do_banco_de_dados'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados');
});

app.use(express.json()); // Para ler JSON no corpo das requisições

// Teste de rota
app.get('/', (req, res) => {
    res.send('API funcionando');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
