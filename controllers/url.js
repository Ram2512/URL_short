const  shortid = require("shortid");
const URL = require('../models/url');



async function handleGenrateNewShortURL(req, res) {
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error: "url is required"})
    }

    const shortId= shortid();
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    });

    return res.json({id: shortId});
}

async function handleGetting(req,res) {
    // const body = req.body;

    const shortId= req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{
        $push: {
            visitHistory:{
                timestamp: Date.now()
            }
        }
    });
    res.redirect(entry.redirectURL);
    
}

async function handleGetAnalytics(req,res) {
    const shortId= req.params.shortId;
    const result = await URL.findOne({ shortId })
    return res.json({
        totalclicks : result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    handleGenrateNewShortURL,
    handleGetting,
    handleGetAnalytics
};