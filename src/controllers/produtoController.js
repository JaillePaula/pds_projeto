const produtoService = require('../services/produtoService');

module.exports = {

    buscarTodos: async (req, res) => {
        let json = {error: '', result: []};

        let produtos = await produtoService.buscarTodos();

        for(let i in produtos){
            json.result.push({
                codigo: produtos[i].codigo,
                descricao: produtos[i].nome
            });
        }
        res.json(json);
    },

    buscarUm: async (req, res) => {
        let json = {error: '', result:{}};

        let codigo = req.params.codigo;
        let produto = await produtoService.buscarUm(codigo);

        if(produto){
            json.result = produto;
        }

        res.json(json);
    },

    inserir: async (req, res) => {
        let json = {error: '', result:{}};

        let nome = req.body.nome;
        let preco = req.body.preco; 
        
        if(nome && preco){
            let produtoCodigo = await produtoService.inserir(nome, preco); //não recebe o código pois está no banco de dados com auto_increment

            json.result = {
                codigo: produtoCodigo,
                nome,
                preco
            };
        }else{
            json.error = 'Campos não enviados!';
        }

        res.json(json);
    },

    alterar: async (req, res) => {
        let json = {error: '', result:{}};

        let codigo = req.params.codigo;
        let nome = req.body.nome;
        let preco = req.body.preco; 
        
        if(codigo && nome && preco){
            await produtoService.alterar(codigo, nome, preco); 
            json.result = {
                codigo,
                nome,
                preco
            };
        }else{
            json.error = 'Campos não enviados!';
        }

        res.json(json);
    },
    excluir: async(req, res) => {
        let json = {error: '', result:{}};

        await produtoService.excluir(req.params.codigo);
    }

}