const express = require('express');
const PessoaController = require('./controllers/PessoaController');

const routes = express.Router();

routes.get('/pessoas', PessoaController.index);
routes.post('/pessoas/add', PessoaController.store);

module.exports = routes;