
const express = require('express');
const config = require('config');

const routes = express.Router();

const URlModel = require('../models/url');

routes.get('/:code', async (req, res, next) => {
    if (req && req.params.code) {
        try {
            const urlCode = req.params.code;
            URlModel.findOne({ urlCode })
                .then(doc => {
                    console.log("doc:", doc);
                    if (doc) {
                        res.redirect(doc.longUrl);
                    } else {
                        res.send(`<h3>URL Not found</h3>`);
                    }
                }).catch(err => {
                    console.error(err);
                    res.status(500).send(`<h3>Server error</h3>`);
                });
        } catch (err) {
            console.error(err);
            res.status(500).send(`<h3>Server error</h3>`);
        }
    } else {
        res.status(401).send(`<h3>Missing required fields</h3>`);
    }
});




module.exports = routes;