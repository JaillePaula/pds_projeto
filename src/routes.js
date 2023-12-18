const express = require ('express');
const router = express.Router();

const produtoController = require('./controllers/produtoController');

router.get('/produtos', produtoController.buscarTodos);
router.get('/produto/:codigo', produtoController.buscarUm);
router.post('/produto', produtoController.inserir);
router.put('/produto/:codigo', produtoController.alterar);
router.delete('/produto/:codigo', produtoController.excluir);


module.exports = router;