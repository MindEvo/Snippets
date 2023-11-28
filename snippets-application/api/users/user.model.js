const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        unique: true,
        lowercase: true,
        required: true
    },
    password: { type: String, required: true },
    years_experience: Number,
    languages: [String]
}, {
    toObject: { virtuals: true},
    toJSON: { virtuals: true }
});

UserSchema.virtual('snippets', {    
    ref: 'Snippet',
    localField: '_id',
    foreignField: 'user_id'
});

const User = mongoose.model('User', UserSchema);

module.exports = User;