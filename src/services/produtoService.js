const database = require('../database')

module.exports = {
    buscarTodos: () => { // lista todos os produtos
        return new Promise((aceito, rejeitado) => {

            database.query('SELECT * FROM produtos', (error, results) => {
                if(error) {rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarUm:(codigo) => { // consulta um produto
        return new Promise((aceito, rejeitado) => {
            database.query('SELECT * FROM produtos WHERE codigo = ?', [codigo], (error, results) => {
                if(error) {rejeitado(error); return; }
                if(results.length > 0){
                    aceito(results[0]);
                }else{
                    aceito(false);
                }
            });
        });
    },

    inserir:(nome, preco) => { // retorna apenas um produto
        return new Promise((aceito, rejeitado) => {

            database.query('INSERT INTO produtos (nome, preco) VALUES (?, ?)', [nome, preco], (error, results) => {        
                if(error) {rejeitado(error); return; }
                aceito(results.insertCodigo);  
            });
        });
    },

    alterar:(codigo, nome, preco) => { //  altera um produto pelo código
        return new Promise((aceito, rejeitado) => {

            database.query('UPDATE produtos SET nome = ?, preco = ? WHERE codigo = ?', [nome, preco, codigo], (error, results) => {        
                if(error) {rejeitado(error); return; }
                aceito(results);  
            });
        });
    },

    excluir: (codigo) => { // exclui o produto pelo código
        return new Promise((aceito, rejeitado) => {

            database.query('DELETE FROM produtos WHERE codigo = ?',[codigo], (error, results) => {
                if(error) {rejeitado(error); return; }
                aceito(results);
            });
        });
    }

};