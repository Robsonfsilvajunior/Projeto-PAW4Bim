const mysql = require('mysql2');

module.exports = class Banco {
    // Propriedades estáticas para armazenar informações de conexão com o banco de dados
    static HOST = '127.0.0.1';
    static USER = 'root';
    static PASSWORD = '';
    static DATABASE = 'projpaw';
    static PORT = 3306;
    static CONEXAO = null;

    // Método privado para estabelecer uma conexão com o banco de dados
    static conectar() {
        // Verifica se já existe uma conexão estabelecida
        if (Banco.CONEXAO === null) {
            // Tenta estabelecer uma nova conexão utilizando as informações fornecidas
            Banco.CONEXAO = mysql.createConnection({
                host: Banco.HOST,
                user: Banco.USER,
                password: Banco.PASSWORD,
                database: Banco.DATABASE,
                port: Banco.PORT,
            });

            // Verifica se ocorreu algum erro na conexão
            Banco.CONEXAO.connect((err) => {
                if (err) {
                    const objResposta = {
                        msg: "Erro ao conectar no banco",
                        erro: err.message
                    }
                    console.log(objResposta);
                }
            });
        }
    }

    // Método público para obter a conexão com o banco de dados
    static getConexao() {
        // Verifica se já existe uma conexão estabelecida
        if (Banco.CONEXAO === null || Banco.CONEXAO.state === 'disconnected') {
            // Se não houver, estabelece uma nova conexão
            Banco.conectar();

        }
        // Retorna a conexão
        return Banco.CONEXAO;
    }
}

module.exports = Banco;