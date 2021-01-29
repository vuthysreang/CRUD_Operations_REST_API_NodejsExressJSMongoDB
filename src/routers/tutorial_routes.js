const Router = require('express').Router();
const tutorialsController = require('../controllers/tutorial_controller');
const tutorialsRoutes = require('../controllers/tutorial_controller');

// Post new tutorial
Router.post('/api/tutorials', tutorialsRoutes.createTutorials);

// Get all Tutorials and By Title
Router.get('/api/tutorials', tutorialsRoutes.findAllTutorials);

// Find all Tutorials with published = true
Router.get('/api/tutorials/published', tutorialsRoutes.findAllPublished);

// Get Tutorials by Id
Router.get('/api/tutorials/:id', tutorialsRoutes.findByIdTutorials);

// Update Tutorial by Id
Router.put('/api/tutorials/:id', tutorialsRoutes.updateByIdTutorials);

// Delete Tutorial by Id
Router.delete('/api/tutorials/:id', tutorialsRoutes.deleteByIdTutorials);

// Delete All Tutorials from Database
Router.delete('/api/tutorials', tutorialsRoutes.deleteAllTutorials);






module.exports = Router;