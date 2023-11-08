const mongoose = require('mongoose');

// BUILD THE MONGO URL CONNECTION STRING
const { username, password, projectname } = require('./config.json');
const mongoURL = `mongodb+srv://${username}:${password}@cluster0.ukcv5ux.mongodb.net/${projectname}?retryWrites=true&w=majority`;

// CONNECT TO MONGO
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log(`Connected to Mongo DB`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    connectDB
};