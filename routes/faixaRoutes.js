
const express = require('express');
const router = express.Router();
const faixaController = require('../controllers/faixaController');

// Rota para listar todos os faixas
router.get('/', faixaController.getAllFaixas);

// Rota para exibir o formulário de criação de um novo faixa
router.get('/new', faixaController.renderAddFaixaForm);

// Rota para criar um novo faixa
router.post('/', faixaController.addFaixa);

// Rota para exibir um faixa específico
router.get('/:id', faixaController.getFaixaById);

// Rota para exibir o formulário de edição de um faixa específico
router.get('/:id/edit', faixaController.renderEditFaixaForm);

// Rota para atualizar um faixa
router.put('/:id', faixaController.updateFaixa);

// Rota para deletar um faixa
router.delete('/:id', faixaController.deleteFaixa);

module.exports = router;
