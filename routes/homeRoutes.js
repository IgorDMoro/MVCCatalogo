const express = require('express');
const router = express.Router();
const { Op } = require('sequelize'); // Importa operadores do Sequelize
const { Disco, Artista, Genero } = require('../models'); // Certifique-se de importar os modelos corretamente

// Rota inicial
router.get('/', (req, res) => {
    res.render('home'); // Renderiza home.ejs
});

// Rota para busca
router.get('/busca', async (req, res) => {
    const query = req.query.q; // Obtém o termo de busca enviado pelo formulário

    if (!query) {
        // Caso o usuário não digite nada, renderiza a home com uma mensagem de erro
        return res.render('home', { message: 'Por favor, insira um termo para buscar!' });
    }

    try {
        // Realiza a busca nos modelos: discos, artistas e gêneros
        const discos = await Disco.findAll({
            where: { titulo: { [Op.iLike]: `%${query}%` } } // Busca pelo título (case-insensitive)
        });

        const artistas = await Artista.findAll({
            where: { nome: { [Op.iLike]: `%${query}%` } }
        });

        const generos = await Genero.findAll({
            where: { nome: { [Op.iLike]: `%${query}%` } }
        });

        // Renderiza uma página de resultados com os dados encontrados
        res.render('resultados', { query, discos, artistas, generos });
    } catch (error) {
        console.error('Erro ao realizar a busca:', error);
        res.render('home', { message: 'Ocorreu um erro ao realizar a busca. Tente novamente mais tarde.' });
    }
});

module.exports = router;
