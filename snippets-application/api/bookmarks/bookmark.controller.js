const Bookmark = require('./bookmark.model');

const getBookmarks = async (req, res) => {
    try {

    } catch(error) {
        res.status(500).json({ error: error.toString() });
    }
}


module.exports = {
    getBookmarks,
}