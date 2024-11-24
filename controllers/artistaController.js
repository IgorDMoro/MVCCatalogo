const { Artista, Disco, Genero, ArtistaGenero, sequelize } = require('../models');

// Listar todos os artistas
const getAllArtistas = async (req, res) => {
    try {
        const artistas = await Artista.findAll({
            order: [['nome', 'ASC']] // Ordena por nome
        });
        res.render('artistas', { artistas });
    } catch (error) {
        res.status(500).send('Erro ao listar artistas');
    }
};

// Mostrar um artista específico e seus discos e gêneros
const getArtistaById = async (req, res) => {
    try {
        const { id } = req.params;
        const artista = await Artista.findByPk(id, {
            include: [
                {
                    model: Disco,
                    as: 'discos',
                    attributes: ['id', 'titulo']
                },
                {
                    model: Genero,
                    as: 'generos',  // Certifique-se de que o alias aqui é o mesmo definido na associação
                    attributes: ['id', 'nome']
                }
            ]
        });

        if (!artista) {
            return res.status(404).send('Artista não encontrado');
        }

        res.render('artista', { artista });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar artista');
    }
};

// Exibir formulário para adicionar um novo artista
const renderAddArtistaForm = async (req, res) => {
    try {
      const generos = await Genero.findAll(); // Busca todos os gêneros cadastrados
      res.render('artistasAdd', { generos }); // Passa os gêneros para a view
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao carregar o formulário de adição');
    }
  };

// Adicionar um novo artista
const addArtista = async (req, res) => {
    const transaction = await sequelize.transaction(); // Inicia uma transação para garantir consistência
    try {
      const { nome, nacionalidade, generos } = req.body;
  
      // Substitui separadores de caminho do Windows por '/' e remove 'public/' se necessário
      const foto = req.file
        ? req.file.path.replace(/\\/g, '/').replace('public/', '')
        : null;
  
      // Cria o artista
      const novoArtista = await Artista.create(
        { nome, nacionalidade, foto },
        { transaction }
      );
  
      // Verifica se há gêneros e cria os vínculos na tabela ArtistaGenero
      if (generos && generos.length > 0) {
        const generosArray = Array.isArray(generos) ? generos : [generos]; // Garante que generos é um array
        const artistaGeneros = generosArray.map((generoId) => ({
          artistaId: novoArtista.id,
          generoId,
        }));
        await ArtistaGenero.bulkCreate(artistaGeneros, { transaction });
      }
  
      await transaction.commit(); // Confirma a transação
      res.redirect('/artistas'); // Redireciona após adicionar o artista
    } catch (error) {
      await transaction.rollback(); // Reverte a transação em caso de erro
      console.error(error); // Loga o erro no console para depuração
      res.status(500).send('Erro ao adicionar artista');
    }
  };
  

// Exibir formulário para edição de artista
const renderEditArtistaForm = async (req, res) => {
    try {
        const artista = await Artista.findByPk(req.params.id);
        if (artista) {
            res.render('artistas/edit', { artista });
        } else {
            res.status(404).send('Artista não encontrado');
        }
    } catch (error) {
        res.status(500).send('Erro ao carregar formulário de edição');
    }
};

// Atualizar um artista existente
const updateArtista = async (req, res) => {
    try {
        const { nome, nacionalidade, generos, foto } = req.body;
        await Artista.update({ nome, nacionalidade, foto }, {
            where: { id: req.params.id }
        });
        res.redirect('/artistas');
    } catch (error) {
        res.status(500).send('Erro ao atualizar artista');
    }
};

// Deletar um artista
const deleteArtista = async (req, res) => {
    try {
        await Artista.destroy({
            where: { id: req.params.id }
        });
        res.redirect('/artistas');
    } catch (error) {
        res.status(500).send('Erro ao deletar artista');
    }
};

module.exports = {
    getAllArtistas,
    getArtistaById,
    renderAddArtistaForm,
    addArtista,
    renderEditArtistaForm,
    updateArtista,
    deleteArtista
};