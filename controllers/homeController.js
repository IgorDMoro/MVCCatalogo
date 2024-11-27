const { Op, sequelize } = require('sequelize');
const { Disco, Artista, Genero, Faixa } = require('../models'); // Certifique-se de que Faixa está importada

const buscar = async (req, res) => {
    const query = req.query.q || ''; // Termo de busca

    try {
        // Busca discos pelo título, ignorando acentos
        const discos = await Disco.findAll({
            where: sequelize.where(
                sequelize.fn('unaccent', sequelize.col('titulo')),
                { [Op.iLike]: sequelize.fn('unaccent', `%${query}%`) }
            ),
            include: [
                {
                    model: Artista,
                    where: sequelize.where(
                        sequelize.fn('unaccent', sequelize.col('Artista.nome')),
                        { [Op.iLike]: sequelize.fn('unaccent', `%${query}%`) }
                    )
                }
            ]
        });

        // Busca artistas pelo nome, ignorando acentos
        const artistas = await Artista.findAll({
            where: sequelize.where(
                sequelize.fn('unaccent', sequelize.col('nome')),
                { [Op.iLike]: sequelize.fn('unaccent', `%${query}%`) }
            )
        });

        // Busca gêneros pelo nome, ignorando acentos
        const generos = await Genero.findAll({
            where: sequelize.where(
                sequelize.fn('unaccent', sequelize.col('nome')),
                { [Op.iLike]: sequelize.fn('unaccent', `%${query}%`) }
            )
        });

        // Busca faixas pelo título, ignorando acentos
        const faixas = await Faixa.findAll({
            where: sequelize.where(
                sequelize.fn('unaccent', sequelize.col('titulo')),
                { [Op.iLike]: sequelize.fn('unaccent', `%${query}%`) }
            )
        });

        // Renderiza os resultados com discos, artistas, gêneros e faixas encontrados
        res.render('resultados', {
            query,
            discos,
            artistas,
            generos,
            faixas // Passando faixas para a view
        });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        res.status(500).send('Erro ao realizar a busca.');
    }
};

module.exports = { buscar };
