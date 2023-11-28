// MAIN ROUTER
const router = require('express').Router();
const controller = require('./user.controller');


router.get('/', controller.getUsers);
router.get('/:id', controller.getUserById);
router.post('/register', controller.registerUser);
router.post('/login', controller.loginUser);
router.put('/:id', controller.updateUser);


module.exports = router;