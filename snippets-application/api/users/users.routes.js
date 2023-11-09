// MAIN ROUTER
const router = require('express').Router();
const controller = require('./user.controller');


router.get('/', controller.getUsers);
router.get('/:id', controller.getUserById);
router.post('/', controller.createUser);
router.put('/:id', controller.updateUser);


module.exports = router;