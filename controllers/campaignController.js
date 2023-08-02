const Campaign = require('../models/Campaigns');
const mongoose = require('mongoose');

// get all campaigns
const getCampaigns = async (req, res) => {
    const campaigns = await Campaign.find({});
    res.status(200).json(campaigns)
}

const getNewCampaigns = async (req, res) => {
    const campaigns = await Campaign.find({ newPost: true });
    res.status(200).json(campaigns)
}

// const getKachin = async (req, res) => {
//     const campaigns = await Campaign.find({ location: 'kachin' });
//     res.status(200).json(campaigns)
// }

// const getKayin = async (req, res) => {
//     const campaigns = await Campaign.find({ location: 'kayin' });
//     res.status(200).json(campaigns)
// }

// const getKayah = async (req, res) => {
//     const campaigns = await Campaign.find({ location: 'kayah' });
//     res.status(200).json(campaigns)
// }

// const getChin = async (req, res) => {
//     const campaigns = await Campaign.find({ location: 'chin' });
//     res.status(200).json(campaigns)
// }

// const getMon = async (req, res) => {
//     const campaigns = await Campaign.find({ location: 'mon' });
//     res.status(200).json(campaigns)
// }

// const getRakhine = async (req, res) => {
//     const campaigns = await Campaign.find({ location: 'rakhine' });
//     res.status(200).json(campaigns)
// }

// const getShan = async (req, res) => {
//     const campaigns = await Campaign.find({ location: 'shan' });
//     res.status(200).json(campaigns)
// }

// const getYangon = async (req, res) => {
//     const campaigns = await Campaign.find({ location: 'yangon' });
//     res.status(200).json(campaigns)
// }

// const getMandalay = async (req, res) => {
//     const campaigns = await Campaign.find({ location: 'mandalay' });
//     res.status(200).json(campaigns)
// }

// const getAyeyarwady = async (req, res) => {
//     const campaigns = await Campaign.find({ location: 'ayeyarwady' });
//     res.status(200).json(campaigns)
// }

// const getBago = async (req, res) => {
//     const campaigns = await Campaign.find({ location: 'bago' });
//     res.status(200).json(campaigns)
// }

// const getMagway = async (req, res) => {
//     const campaigns = await Campaign.find({ location: 'magway' });
//     res.status(200).json(campaigns)
// }

// const getSagaing = async (req, res) => {
//     const campaigns = await Campaign.find({ location: 'sagaing' });
//     res.status(200).json(campaigns)
// }

// const getTanintharyi = async (req, res) => {
//     const campaigns = await Campaign.find({ location: 'tanintharyi' });
//     res.status(200).json(campaigns)
// }

// get a single campaign
const getCampaign = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'this campaign post does not exist' })
    }

    const campaign = await Campaign.findById(id);

    if (!campaign) {
        return res.status(404).json({ error: 'this campaign post does not exist' })
    }

    res.status(200).json(campaign)
}

// creat new campaign
const createCampaign = async (req, res) => {
    const { title, startDate, endDate, text, name, url, target, prize, forWhom, payment, newPost } = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title')
    }
    if (!text) {
        emptyFields.push('text')
    }
    if (!url) {
        emptyFields.push('url')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'please fill in the required fields', emptyFields })
    }
    try {
        let imageUrl = '';
        if (req.file) {
            imageUrl = req.file.path;
        }
        const campaign = await Campaign.create({ title, img: imageUrl, startDate, endDate, text, name, url, target, prize, forWhom, payment, newPost })
        res.status(200).json(campaign)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a campaign
const deleteCampaign = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'this campaign post does not exist' })
    }

    const campaign = await Campaign.findOneAndDelete({ _id: id });
    const updatedCampaign = await Donation.find({ newPost: true })

    if (!campaign) {
        return res.status(404).json({ error: 'this campaign post does not exist' })
    }

    res.status(200).json(updatedCampaign)
}

// update a campaign
const updateCampaign = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'this campaign post does not exist' })
    }

    const campaign = await Campaign.findOneAndUpdate({ _id: id }, { ...req.body }, {
        new: true
    });
    const updatedAllCampaigns = await Campaign.find({ newPost: true })

    if (!campaign) {
        return res.status(404).json({ error: 'this campaign post does not exist' })
    }

    res.status(200).json(updatedAllCampaigns)
}

module.exports = {
    getCampaigns,
    getNewCampaigns,
    getCampaign,
    createCampaign,
    deleteCampaign,
    updateCampaign,
    // getKachin,
    // getKayin,
    // getKayah,
    // getChin,
    // getMon,
    // getRakhine,
    // getShan,
    // getYangon,
    // getMandalay,
    // getAyeyarwady,
    // getBago,
    // getMagway,
    // getSagaing,
    // getTanintharyi
}