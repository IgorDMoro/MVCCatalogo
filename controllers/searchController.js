const { Disco, Artista, Genero } = require('../models');
const { Op } = require('sequelize');

const search = async (req, res) => {
    const query = req.query.q; // Recebe o termo de busca do campo "q"

    if (!query || query.trim() === '') {
        return res.render('home', { results: [], query: '', message: 'Insira um termo para buscar.' });
    }

    try {
        const discos = await Disco.findAll({
            where: {
                titulo: { [Op.iLike]: `%${query}%` }
            }
        });

        const artistas = await Artista.findAll({
            where: {
                nome: { [Op.iLike]: `%${query}%` }
            }
        });

        const generos = await Genero.findAll({
            where: {
                nome: { [Op.iLike]: `%${query}%` }
            }
        });

        const results = { discos, artistas, generos };

        res.render('home', { results, query, message: null });
    } catch (error) {
        console.error('Erro na busca:', error);
        res.status(500).send('Erro ao processar a busca');
    }
};

module.exports = { search };
