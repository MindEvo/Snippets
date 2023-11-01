// MAIN ROUTER
const router = require('express').Router();

// JSON MOCK DATA FILES
const users = require('../../../mock_database/users.json');
const snippets = require('../../../mock_database/snippets.json');


// GET /users
router.get('/', (req, res) => {
    const { query } = req;
    const language = query.language;
    const years = parseInt(query.years_experience);
    const username = query.username;

    let result = users;

    if (language) {
        result = users.filter((user) => {

            return user.languages.includes(language);
        });
    }

    if (years) {
        result = users.filter((user) => {

            return user.years_experience >= years;
        });
    }

    if (username) {
        result = users.filter((user) => {

            return user.username.includes(username);
        });

    }

    res.json(result);
});


// GET /users/:id
router.get('/:id', (req, res) => {
    const { params, query } = req;
    const id = parseInt(params.id);

    const user = users.find((user) => user.id === id );

    if (user) {
        if (query.snippets === 'true') {            
            user.snippets = snippets
            .filter((snippet) => {
                return snippet.user_id === id;                
            })
            .map(snippet => {
                const { title, user_id} = snippet;
                return { title, user_id };
            })
        }

        res.json(user);
    } else {

        res.status(404).json({ error: `No user found by id: ${id}` });
    }
});


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

// POST BODY EXAMPLE (String, Number, String Array)
// {
//     "username": "Corvo",
//     "years_experience": 15,
//     "programming_languages": ["python", "ruby", "javascript", "rust"]
// }


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