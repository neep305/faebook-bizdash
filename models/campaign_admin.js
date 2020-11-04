const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampaignAdmin = new Schema({
    prdCd: {type: String, required: true},
    prdNm: {type: String, required: true},
    campaignId: {type: String, required: true},
    campaignNm: {type: String, required: true},
    categoryNm: {type: String, required: true},
    contentsAttr: {type: String, require: true},
    testVar: {type: Array, required: true},
    channel: {type: String, required: true},
    mediatype: {type: String, required: true}
},{timestamps:true});

module.exports = mongoose.model('campaign_admin', CampaignAdmin);