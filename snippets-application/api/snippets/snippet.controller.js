const Snippet = require('./snippet.model');


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
    let snippet = null;
    try {
        snippet = await Snippet.findOne({ _id: id });
        if (snippet) {
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

// const updateSnippet = async (req, res) => {
//     const { params, body } = req;
//     const id = params.id;
//     try {
//         const updated = await Snippet.findOneAndUpdate({ _id: id }, body)
//         if (updated) {
//             res.json(updated);
//         } else {
//             res.status(404).json( { error: `No snippet found by id: `} );
//         }
//     } catch(error) {
//         res.status(500).json({ error: error.toString() });
//     }
// }

const deleteSnippet = async (req, res) => {
    const { params } = req;
    const id = params.id;
    try {
        const deleted = await Snippet.findOneAndDelete({ _id: id });
        if (deleted) {
            res.json({ message: 'success', snippet: id})
        } else {
            res.status(404).json({ error: `No snippet found by id: ${id}`});
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }

    //TODO: find and remove the bookmarks associated with the snippet
}

module.exports = {
    getSnippets,
    getSnippetById,
    createSnippet,
    deleteSnippet
}