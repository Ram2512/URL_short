const express = require('express');
const { handleGenrateNewShortURL, handleGetting, handleGetAnalytics }= require("../controllers/url");
const router = express.Router();

router.post('/',handleGenrateNewShortURL);

router.get('/:shortId',handleGetting);

router.get('/analytics/:shortId',handleGetAnalytics);

module.exports= router;