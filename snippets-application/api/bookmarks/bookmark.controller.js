const Bookmark = require('./bookmark.model');
const Snippet = require('../snippets/snippet.model');


const createBookmark = async (req, res) => {
    const { body } = req;
    console.log(req);
    const snippet_id = body.snippet_id;
    try {
        const snippet = await Snippet.findById(snippet_id);
        if (snippet) {
            const bookmarkDoc = new Bookmark(body);
            const bookmark = await bookmarkDoc.save();
            res.json(bookmark);
        } else {    
            res.status(404).json( { error: `No snippet found by id: ${body.snippet_id}`});
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

const deleteBookmark = async (req, res) => {
    const { params } = req;
    const id = params.id;
    try {
        const deleted = await Bookmark.findOneAndDelete({ _id: id });
        if (deleted) {    
            res.json( { message: `success`, type: `bookmark`, removed: id} );
        } else {
            res.status(404).json( { error: `No bookmark found by id: ${id}`} );
        }
    } catch(error) {
        res.status(500).json({ error: error.toString() });
    }

}


module.exports = {
    createBookmark,
    deleteBookmark
}