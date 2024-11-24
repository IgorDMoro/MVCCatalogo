const { Genero } = require('../models');

// Listar todos os generos
const getAllGeneros = async (req, res) => {
    try {
        const generos = await Genero.findAll({
            order: [['nome', 'ASC']] // Ordena em ordem alfabetica
        });
        res.render('generos', { generos });
    } catch (error) {
        res.status(500).send('Erro ao listar generos');
    }
};

// Exibir um genero específico
const getGeneroById = async (req, res) => {
    try {
        const genero = await Genero.findByPk(req.params.id);
        if (genero) {
            res.render('generos/show', { genero });
        } else {
            res.status(404).send('Genero não encontrado');
        }
    } catch (error) {
        res.status(500).send('Erro ao exibir genero');
    }
};

// Exibir formulário para adicionar novo genero
const renderAddGeneroForm = (req, res) => {
    res.render('generosAdd');
};

// Adicionar um novo genero
const addGenero = async (req, res) => {
    try {
        const { nome } = req.body;
        await Genero.create({ nome });
        res.redirect('/generos');
    } catch (error) {
        res.status(500).send('Erro ao adicionar genero');
    }
};

// Exibir formulário para edição de genero
const renderEditGeneroForm = async (req, res) => {
    try {
        const genero = await Genero.findByPk(req.params.id);
        if (genero) {
            res.render('generos/edit', { genero });
        } else {
            res.status(404).send('Genero não encontrado');
        }
    } catch (error) {
        res.status(500).send('Erro ao carregar formulário de edição');
    }
};

// Atualizar um genero existente
const updateGenero = async (req, res) => {
    try {
        const { nome } = req.body;
        await Genero.update({ nome }, {
            where: { id: req.params.id }
        });
        res.redirect('/generos');
    } catch (error) {
        res.status(500).send('Erro ao atualizar genero');
    }
};

// Deletar um genero
const deleteGenero = async (req, res) => {
    try {
        await Genero.destroy({
            where: { id: req.params.id }
        });
        res.redirect('/generos');
    } catch (error) {
        res.status(500).send('Erro ao deletar genero');
    }
};

module.exports = {
    getAllGeneros,
    getGeneroById,
    renderAddGeneroForm,
    addGenero,
    renderEditGeneroForm,
    updateGenero,
    deleteGenero
};