//servidor e rotas
const express = require('express');
const app = express();
const petshop = require('./petshop');

app.use(express.json());

app.listen(3000, () => {
  console.log('Servidor rodando!');
});

app.get('/pets', (req, res) => {
  return res.send(petshop.listarPets());
});

/*app.get('/pet/:nome', (req, res) => {
  const { nome } = req.params;
  let nomePet = nome;
  return res.send(petshop.buscarPet(nomePet));
});*/

app.post('/pets', (request, response) => {
  const {
    nome,
    tipo,
    idade,
    raca,
    peso,
    tutor,
    contato,
    vacinado,
    servicos,
  } = request.body;

  const pet = {
    nome,
    tipo,
    idade,
    raca,
    peso,
    tutor,
    contato,
    vacinado,
    servicos,
  };

  petshop.adicionarPets(pet);
  petshop.atualizaBanco();

  return response.json(pet);
});
