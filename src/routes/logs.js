const config = require('../../db/config')
const { Router } = require('express')



const schemas = require('../../validators/log');
const middleware = require('../middlewares/joi');

const router = Router()



// Initialize Controller
const logsController = require('../controllers/logsController')

// Get All
router.get('/logs', logsController.list)

// Get One
router.get('/logs/:id', logsController.show)

// Create
router.post('/logs', middleware(schemas.create, 'body'), logsController.create)

// Update
router.put('/logs/:id', middleware(schemas.update, 'body'), logsController.update)

// Delete
router.delete('/logs/:id', logsController.delete)

module.exports = router