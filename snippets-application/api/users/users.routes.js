// MAIN ROUTER
const router = require('express').Router();

const controller = require('./user.controller');

// GET /users
router.get('/', controller.getUsers);


// GET /users/:id
router.get('/:id', controller.getUserById);


// POST /users
router.post('/', (req, res) => {
    const { body } = req;

    const ids = users.map((user) => user.id);
    const id = Math.max(...ids) + 1;
    const bookmarks = [];

    const user = { id, ...body, bookmarks };
    users.push(user);

    res.json( { success: `Added new user: ${user.username}`});
});


// PUT /users/:id
router.put('/:id', (req, res) => {
    const { params, body } = req;
    const id = parseInt(params.id);
    const user = users.find((user) => user.id === id);

    if (user) {
        const updated = { ...user, ...body, id };
        res.json(updated);
    } else {
        res.status(404).json( { error: `No User found by id: ${id}` })
    }
});


module.exports = router;