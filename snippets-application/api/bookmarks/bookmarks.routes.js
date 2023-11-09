// MAIN ROUTER
const router = require('express').Router();
const controller = require('./bookmark.controller');


router.get('/', controller.getBookmarks);

//GET /bookmarks/:id
router.get('/:id', (req, res) => {
    const { params } = req;
    const id = parseInt(params.id);

    const bookmark = bookmarks.find((bookmark) => bookmark.id === id);

    if (bookmark) {
        res.json(bookmark);
    } 
    else {
        res.status(404).json({ error: `No bookmark found by id: ${id}` })
    }
});

// POST /bookmarks/
router.post('/', (req, res) => {
    const { body } = req;

    // Assign the bookmark id
    const ids = bookmarks.map((bookmark) => bookmark.id)
    const id = Math.max(...ids) + 1;

    // Check if the snippet exists
    const snippet = snippets.find((snippet) => snippet.id === parseInt(body.snippet_id));
    if (snippet) {

        // Check if the user has already bookmarked the snippet
        const marked = bookmarks.find((bookmark) => bookmark.user_id === body.user_id && bookmark.snippet_id === snippet.id)
        if (!marked) {

            // Add the bookmark
            const bookmark = { id, ...body };
            bookmarks.push(bookmark);

            // Increment the snippet's bookmark total
            snippet.bookmarks += 1;

            // Add the bookmark to the user
            const user_id = body.user_id;
            const user = users.find((user) => user.id === user_id );
            user.bookmarks.push(id);

            res.json(bookmark);
            res.json(snippet);
            res.json(user);
        } else {

            res.status(404).json( { error: `User has already bookmarked snippet: ${snippet.title}`})
        }

    } else {

        res.status(404).json( { error: `No snippet found by id: ${body.snippet_id}`});
    }
});

// DELETE /bookmarks/:id
router.delete('/:id', (req, res) => {
    const { params } = req;
    const id = parseInt(params.id);

    const index = bookmarks.findIndex((bookmark) => bookmark.id === id);

    if (index !== -1) {
        bookmarks.splice(index, 1);

        res.json( { message: `success`, type: `bookmark`, removed: id} );
    } else {
        res.status(404).json( { error: `No bookmark found by id: ${id}`} );
    }
});


module.exports = router;