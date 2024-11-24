const express = require('express');
const router = express.Router();
const artistaController = require('../controllers/artistaController');
const upload = require('../middlewares/upload');

// Rota para listar todos os artistas
router.get('/', artistaController.getAllArtistas);

// Rota para exibir o formulário de criação de um novo artista
router.get('/add', artistaController.renderAddArtistaForm);

// Rota para criar um novo artista
router.post('/add', upload.single('foto'), artistaController.addArtista);

// Rota para exibir um artista específico
router.get('/:id', artistaController.getArtistaById);

// Rota para exibir o formulário de edição de um artista específico
router.get('/:id/edit', artistaController.renderEditArtistaForm);

// Rota para atualizar um artista
router.put('/:id', artistaController.updateArtista);

// Rota para deletar um artista
router.delete('/:id', artistaController.deleteArtista);

module.exports = router;