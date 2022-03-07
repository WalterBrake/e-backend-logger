const { Router } = require('express')
//get schema
const schemas = require('../../validators/authorization');
//get valodator
const middleware = require('../middlewares/joi');

const router = Router()

// Get Controller
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