const express = require('express');

//Importa os Controllers
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//Rotas Login - Ongs | Uso o método POST pois tem a intenção de criar uma sessão
routes.post('/sessions', SessionController.create);

//Rotas Ongs
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

//Rotas Incidents
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

//Rotas Incidentes - Ongs
routes.get('/profile', ProfileController.index);

module.exports = routes;