const config = require('../../db/config')
const { Router } = require('express')



const schemas = require('../../validators/aplication');
const middleware = require('../middlewares/joi');

const router = Router()



// Initialize Controller
const aplicationsController = require('../controllers/aplicationsController')

// Get All
router.get('/aplications', aplicationsController.list)

// Get One
router.get('/aplications/:id', aplicationsController.show)

// Create
router.post('/aplications', middleware(schemas.create, 'body'), aplicationsController.create)

// Update
router.put('/aplications/:id', middleware(schemas.update, 'body'), aplicationsController.update)

// Delete
router.delete('/aplications/:id', aplicationsController.delete)

module.exports = router