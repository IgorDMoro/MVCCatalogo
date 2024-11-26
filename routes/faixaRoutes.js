
const express = require('express');
const router = express.Router();
const faixaController = require('../controllers/faixaController');

// Rota para listar todos os faixas
router.get('/', faixaController.getAllFaixas);

// Rota para adicionar uma nova faixa sem disco vinculado
router.post('/sem-disco', faixaController.addFaixaSemDisco);

// Rota para criar um novo faixa
router.post('/', faixaController.addFaixa);

// Rota para exibir um faixa específico
router.get('/:id', faixaController.getFaixaById);

// Rota para exibir o formulário de edição de um faixa específico
router.get('/:id/edit', faixaController.renderEditFaixaForm);

// Rota para atualizar um faixa
router.post('/:id/edit', faixaController.updateFaixa);

// Rota para exibir o formulário de vinculação de disco
router.get('/vincular-disco/:id', faixaController.renderVincularDiscoForm);

// Rota para processar a vinculação de disco
router.post('/vincular-disco/:id', faixaController.vincularDisco);

// Rota para deletar um faixa
router.post('/:id', faixaController.deleteFaixa);

module.exports = router;
