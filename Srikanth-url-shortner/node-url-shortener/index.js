const express = require('express');
const cors = require('cors');
const rateLimit = require("express-rate-limit");

const connectDB = require('./config/database');
const urlRouter = require('./routes/urlRoute');
const codeRouter = require('./routes/urlCode');

const app = express();
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

connectDB();

app.use(cors());
//  apply to all requests
app.use(limiter);
app.use(express.json({ extended: true }));

app.use('/', codeRouter);
app.use('/api', urlRouter);
app.use('**', (req, res) => {
    res.send(`<h4>Not found</h4>`);
});


const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);

});