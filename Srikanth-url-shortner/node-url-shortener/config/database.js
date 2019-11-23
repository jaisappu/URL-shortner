const mongoose = require('mongoose');

const config = require('config');
const dbURI = config.get('mongoURI');

const connectDB = () => {
    mongoose.connect(dbURI, { useNewUrlParser: true })
        .then(res => {
            if (res) {
                console.log("Database connected");

            }
        }).catch(err => {
            console.error(err);
            console.log("Database connection failed");
            process.exit(1);
        });
}

module.exports = connectDB;