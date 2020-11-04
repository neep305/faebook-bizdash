const CampaignAdminModel = require(`${__basedir}/models/campaign_admin`);

const getAll = async()=>{
    return CampaignAdminModel.find({});
}

const getCampaignByPrd = async(prdCd)=>{
    return CampaignAdminModel.findOne({'prdCd':prdCd});
}

const getCampaignById = async(campaignId)=>{
    return CampaignAdminModel.findOne({'campaignId':campaignId});
}

const create = async(data)=>{
    const campaign = new CampaignAdminModel(data);
    return campaign.save();
}

const update = async(id,data)=>{
    const campaign = await getCampaignById(id);

    if (!campaign) {
        throw new Error(`Couldn't find campaign for updating data`);
    } 

    Object.keys(data).forEach((key)=>{
        campaign[key] = data[key];
    });
    return campaign.save();
}

const remove = async(query)=>{
    const result = await CampaignAdminModel.remove(query);

    return result.n;
}

module.exports = {
    getAll,
    getCampaignByPrd,
    getCampaignById,
    create,
    update,
    remove
}