const mongoose = require('mongoose');

const SnippetSchema = new mongoose.Schema({
    title: String,
    snippet: String,
    language: String,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created: { type: Date, default: Date.now },
}, {
    toObject: { virtuals: true},
    toJSON: { virtuals: true }
});

SnippetSchema.virtual('bookmarks', {
    ref: 'Bookmark',
    localField: '_id',
    foreignField: 'snippet_id'
});

SnippetSchema.post('findOneAndDelete', async function(doc) {
    const Bookmark = mongoose.model('Bookmark');
    try {
        await Bookmark.deleteMany({ _id: { snippet_id: doc._id } });
    } catch (error) {
        console.log('Error deleting associated bookmarks')
    }
});

const Snippet = mongoose.model('Snippet', SnippetSchema);

module.exports = Snippet;