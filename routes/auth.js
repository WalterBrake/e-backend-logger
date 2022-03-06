const config = require('../../db/config')
const { Router } = require('express')



const schemas = require('../validators/authorization');
const middleware = require('../middlewares/joi');

const router = Router()



// Initialize Controller
const authorizationsController = require('../controllers/authorizationsController')

// Get All
router.get('/authorizations', authorizationsController.list)

// Get One
router.get('/authorizations/:id', authorizationsController.show)

// Create
router.post('/authorizations', middleware(schemas.create, 'body'), authorizationsController.create)

// Update
router.put('/authorizations/:id', middleware(schemas.update, 'body'), authorizationsController.update)

// Delete
router.delete('/authorizations/:id', authorizationsController.delete)

module.exports = router