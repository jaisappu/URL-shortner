const express = require('express');
const validUrl = require('valid-url');
const shortId = require('shortid');
const config = require('config');

const routes = express.Router();

const URlModel = require('../models/url');

const BASE_URL = config.get('baseUrl');


routes.post('/url-shorten', (req, res, next) => {
    console.log(req.body.longUrl);
    if (req.body && req.body.longUrl) {
        const longUrl = req.body.longUrl;
        if (!validUrl.isUri(BASE_URL)) {
            res.status(401).send({ msg: 'Invalid base url' });
        }
        if (validUrl.isUri(longUrl)) {
            try {
                const urlCode = req.body.urlCode ? req.body.urlCode : shortId.generate();
                URlModel.findOne({ longUrl })
                    .then(doc => {
                        if (doc) {
                            res.send({ data: doc, msg: 'Loaded successfully' });
                        } else {
                            const shortUrl = BASE_URL + "/" + urlCode;
                            const currentDate = new Date();
                            const expireDate = new Date().setDate(currentDate.getDate() + 1);
                            let url = new URlModel({
                                longUrl,
                                urlCode,
                                shortUrl,
                                createdAt: currentDate,
                                updatedAt: currentDate,
                                expireAt: expireDate
                            });
                            url.save().then(doc => {
                                res.send({ data: doc, msg: 'Saved successfully' });
                            });
                        }
                    })

            } catch (err) {
                console.error(err);
                res.status(500).send({ msg: "Server error" });
            }
        } else {
            res.status(401).send({ msg: "Invalid longUrl" });
        }
    } else {
        res.status(401).send({ msg: "Missing required fields" });
    }
});

routes.get('/url-shorten', async (req, res, next) => {
    URlModel.find()
        .then(docs => {
            res.send({ msg: "Fetched all docs", data: docs });
        }).catch(err => {
            console.error(err);
            res.status(500).send({ msg: "Server error" });
        });
});

routes.get('/url-shorten/:code', async (req, res, next) => {
    console.log(req.params);

    if (req && req.params.code) {
        try {
            const urlCode = req.params.code;
            URlModel.findOne({ urlCode })
                .then(doc => {
                    console.log("doc:", doc);
                    if (doc) {
                        res.send({ data: doc, msg: 'Loaded successfully' });
                    } else {
                        res.send({ msg: "No URL found", data: null });
                    }
                }).catch(err => {
                    console.error(err);
                    res.status(500).send({ msg: "Server error" });
                });
        } catch (err) {
            console.error(err);
            res.status(500).send({ msg: "Server error" });
        }
    } else {
        res.status(401).send({ msg: "Missing URL code" });
    }
});




module.exports = routes;