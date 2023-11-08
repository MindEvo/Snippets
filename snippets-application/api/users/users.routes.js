// MAIN ROUTER
const router = require('express').Router();
const controller = require('./user.controller');


// GET /users
router.get('/', controller.getUsers);

// GET /users/:id
router.get('/:id', controller.getUserById);

// POST /users
router.post('/', controller.createUser);

// PUT /users/:id
router.put('/:id', controller.updateUser);


module.exports = router;