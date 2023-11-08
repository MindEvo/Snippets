const User = require('./user.model');
const util = require('../util');

const getUsers = async (req, res) => {
    const { query } = req;
    const language = query.language;
    const years = parseInt(query.years_experience);
    const username = query.username;

    let filter = {};

    if (language) {
        filter = { languages: { $in: [language] } }
    }
    if (years) {
        filter = { years_experience: { $gte: years } }
    }
    if (username) {
        filter = { username: { $regex: username, $options: 'i'} }
    }

    try {
        const users = await User.find(filter);
        res.json(users);
    } catch(error) {
        res.status(500).json({ error: error.toString() });
    }
}

const getUserById = async (req, res) => {
    const { params, query } = req;
    const id = params.id;

    let user = null;
    try {
        if (query.snippets === 'true') {
            const user = await User.findOne(
                { 
                    _id: id 
                }
            ).populate('snippets'); 
        } else {
            user = await User.findOne( { _id: id } );
        }
        
        if (user) {
            res.json(user);
        } else {
            res.status(404).json( { error: `No user found by id: ${id}`});
        }
    } catch(error) {
        res.status(500).json({ error: error.toString() });
    }


        // res.json(user);
        // res.status(404).json({ error: `No user found by id: ${id}` });
    
}

module.exports = {
    getUsers
};