const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('./user.model');

const config = require('../../config.json');

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
        const users = await User.find(filter).select('-password');
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
        const virtuals = [];
        if (query.snippets) {
            virtuals.push('snippets');
        } 
        user = await User.findOne({  _id: id }).select('-password').populate(virtuals);        
        if (user) {
            res.json(user);
        } else {
            res.status(404).json( { error: `No user found by id: ${id}`});
        }
    } catch(error) {
        res.status(500).json({ error: error.toString() });
    }    
}

const registerUser = async (req, res) => {
    const { body } = req;
    const { username, password } = body;

    if (!password || !username) {
        return res
            .status(400)
            .json({ error: 'Username and Password are required' });
    }

    try {
        // gen salt which changes each time the function is called
        const salt = await bcrypt.genSalt(10);
        // use the password + salt to create a hashed password
        const hashed = await bcrypt.hash(password, salt);

        const userDoc = new User({ ...body, password: hashed });
        const saved = await userDoc.save();

        // POJO: plain old javascript object
        const user = saved.toObject();
        delete user.password;
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username.toLowerCase() })
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials'})
        }
        const authenticated = await bcrypt.compare(password, user.password);
        if (authenticated) {
            const token = jwt.sign(
                { id: user._id, username: user.username },
                config.jwtsecret,
                { expiresIn: '24h' }
            );
            const authorized = user.toObject();
            delete authorized.password;
            res.header('Authorization', `Bearer ${token}`).json(authorized);
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch(error) {
        res.status(500).json({ error: error.toString() });
    }
}

const updateUser = async (req, res) => {
    const { params, body } = req;
    const id = params.id;
    try {
        const user = await User.findOneAndUpdate({ _id: id}, body);
        if(user) {
            res.json(user);
        } else {
            res.status(404).json({ error: `No User found by id: ${id}`});
        }
    } catch(error) {
        res.status(500).json({ error: error.toString() });
    }
}


module.exports = {
    getUsers,
    getUserById,
    registerUser,
    loginUser,
    updateUser
};