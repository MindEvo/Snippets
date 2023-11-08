// MAIN ROUTER FUNCTION
const router = require('express').Router();

// JSON MOCK DATA FILES
const snippets = require('../../../mock_database/snippets.json');
const bookmarks = require('../../../mock_database/bookmarks.json');
const users = require('../../../mock_database/users.json');

// GET /snippets
router.get('/', (req, res) => {
    const { query } = req;
    const language = query.language

    let result = snippets;

    if (language) {
        result = snippets.filter((snippet) => {
            return snippet.language.toLowerCase() === language.toLowerCase();
        });
    }
    res.json(result);
});


// GET /snippets/:id
router.get('/:id', (req, res) => {
    const { params } = req;
    const id = parseInt(params.id);

    const snippet = snippets.find((snippet) => snippet.id === id );

    if (snippet) {
        res.json(snippet);
    } else {
        res.status(404).json({ error: `No snippet found by id: ${id}` });
    }
});


// POST /snippets
router.post('/', (req, res) => {
    const { body } = req;

    // Mapping from an array of objects to array of numbers
    const ids = snippets.map((snippet) => snippet.id);
    const id = Math.max(...ids) + 1;

    const created = new Date().toString();

    const snippet = { id, ...body, created };
    snippets.push(snippet);

    res.json(snippet);
});

// POST BODY EXAMPLE (String, String, String, Number)
// {
//     "title": "Python Function for Fibonacci Sequence",
//     "snippet": "def fibonacci(n):\n    if n <= 0:\n        return []\n    elif n == 1:\n        return [0]\n    elif n == 2:\n        return [0, 1]\n    else:\n        fib = [0, 1]\n        while len(fib) < n:\n            fib.append(fib[-1] + fib[-2])\n        return fib",
//     "programming_language": "Python",
//     "user_id": 1
// }


// PUT /snippets/:id
router.put('/:id', (req, res) => {
    const { params, body } = req;
    delete body.created;

    const id = parseInt(params.id);

    const snippet = snippets.find((snippet) => snippet.id === id);

    if (snippet) {
        const updated = { ...snippet, ...body, id };

        res.json(updated);
    } else {

        res.status(404).json( { error: `No snippet found by id: `} );
    }
});


// DELETE /snippets/:id
router.delete('/:id', (req, res) => {
    const { params } = req;
    const id = parseInt(params.id);

    const index = snippets.findIndex((snippet) => snippet.id === id);

    // if found returns the index, else returns -1
    if (index !== -1) {

        //remove the bookmarks from the snippet
        const snippet = snippets[index];
        const snippet_id = snippet.id;

        for (let i=bookmarks.length-1; i>=0; --i) {
            if (bookmarks[i].snippet_id === snippet_id) {
                bookmarks.splice(i, 1);
            }
        }
        
        //remove the snippet
        snippets.splice(index, 1);
        res.json( { message: `success`, type: `snippet`, removed: id} );
    } else {
        res.status(404).json( { error: `No snippet found by id: ${id}`} );
    }
});


module.exports = router;