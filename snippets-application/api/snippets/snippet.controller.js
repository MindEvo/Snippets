const Snippet = require('./snippet.model');
const Bookmark = require('../bookmarks/bookmark.model');

const getSnippets = async(req, res) => {
    const { query } = req;
    const language = query.language;
    let filter = {};
    if (language) {
        filter = { language: { $regex: language, $options: 'i' } }
    }
    try {
        const snippets = await Snippet.find(filter);
        res.json(snippets);
    } catch(error) {
        res.status(500).json({ error: error.toString() });
    }
}

const getSnippetById = async (req, res) => {
    const { params, query } = req;
    const id = params.id;
    
    try {
        let snippet = await Snippet.findOne({ _id: id })
        if (snippet) {
            if (query.includeBookmarks) {
                snippet = await snippet.populate('bookmarks');
            }
            else if (query.includeTimesBookmarked) {
                const bookmarksCount = await Bookmark.countDocuments({ snippet_id: id});
                snippet = snippet.toObject();
                snippet.times_bookmarked = bookmarksCount;
            }
            res.json(snippet);
        } else {
            res.status(404).json({ error: `No snippet found with id: ${id}`});
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

const createSnippet = async (req, res) => {
    const { body } = req;
    try {
        const snippetDoc = new Snippet(body);
        const snippet = await snippetDoc.save();
        res.json(snippet);
    } catch(error) {
        res.status(500).json({ error: error.toString() })
    }
}

const deleteSnippet = async (req, res) => {
    const { params } = req;
    const id = params.id;
    try {
        const deleted = await Snippet.findOneAndDelete({ _id: id });
        if (deleted) {
            res.json({ message: 'success', snippet: deleted._id});
        } else {
            res.status(404).json({ error: `No snippet found by id: ${id}`});
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

module.exports = {
    getSnippets,
    getSnippetById,
    createSnippet,
    deleteSnippet
}