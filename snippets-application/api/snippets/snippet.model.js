const mongoose = require('mongoose');

const SnippetSchema = new mongoose.Schema({
    // idx: Number,
    title: String,
    snippet: String,
    language: String,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created: { type: Date, default: Date.now },
    times_bookmarked: Number
}, {
    toObject: { virtuals: true},
    toJSON: { virtuals: true }
});

const Snippet = mongoose.model('Snippet', SnippetSchema);

module.exports = Snippet;