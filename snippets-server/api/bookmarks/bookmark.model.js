const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
    snippet_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Snippet'},
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})

const Bookmark = mongoose.model('Bookmark', BookmarkSchema);

module.exports = Bookmark;