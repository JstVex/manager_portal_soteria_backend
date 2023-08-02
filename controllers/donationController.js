const Donation = require('../models/Donations');
const mongoose = require('mongoose');

// get all donations
const getDonations = async (req, res) => {
    const donations = await Donation.find({});
    res.status(200).json(donations)
}

const getNewDonations = async (req, res) => {
    const donations = await Donation.find({ newPost: true });
    res.status(200).json(donations)
}

// const getKachin = async (req, res) => {
//     const donations = await Donation.find({ location: 'kachin' });
//     res.status(200).json(donations)
// }

// const getKayin = async (req, res) => {
//     const donations = await Donation.find({ location: 'kayin' });
//     res.status(200).json(donations)
// }

// const getKayah = async (req, res) => {
//     const donations = await Donation.find({ location: 'kayah' });
//     res.status(200).json(donations)
// }

// const getChin = async (req, res) => {
//     const donations = await Donation.find({ location: 'chin' });
//     res.status(200).json(donations)
// }

// const getMon = async (req, res) => {
//     const donations = await Donation.find({ location: 'mon' });
//     res.status(200).json(donations)
// }

// const getRakhine = async (req, res) => {
//     const donations = await Donation.find({ location: 'rakhine' });
//     res.status(200).json(donations)
// }

// const getShan = async (req, res) => {
//     const donations = await Donation.find({ location: 'shan' });
//     res.status(200).json(donations)
// }

// const getYangon = async (req, res) => {
//     const donations = await Donation.find({ location: 'yangon' });
//     res.status(200).json(donations)
// }

// const getMandalay = async (req, res) => {
//     const donations = await Donation.find({ location: 'mandalay' });
//     res.status(200).json(donations)
// }

// const getAyeyarwady = async (req, res) => {
//     const donations = await Donation.find({ location: 'ayeyarwady' });
//     res.status(200).json(donations)
// }

// const getBago = async (req, res) => {
//     const donations = await Donation.find({ location: 'bago' });
//     res.status(200).json(donations)
// }

// const getMagway = async (req, res) => {
//     const donations = await Donation.find({ location: 'magway' });
//     res.status(200).json(donations)
// }

// const getSagaing = async (req, res) => {
//     const donations = await Donation.find({ location: 'sagaing' });
//     res.status(200).json(donations)
// }

// const getTanintharyi = async (req, res) => {
//     const donations = await Donation.find({ location: 'tanintharyi' });
//     res.status(200).json(donations)
// }

// get a single donation
const getDonation = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'this donation post does not exist' })
    }

    const donation = await Donation.findById(id);

    if (!donation) {
        return res.status(404).json({ error: 'this donation post does not exist' })
    }

    res.status(200).json(donation)
}

// create new donation
const createDonation = async (req, res) => {
    const { title, startDate, endDate, text, name, url, target, payment, location, newPost } = req.body;

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
    if (!location) {
        emptyFields.push('location')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'please fill in the required fields', emptyFields })
    }
    try {
        let imageUrl = '';
        if (req.file) {
            imageUrl = req.file.path;
        }
        const donation = await Donation.create({ title, img: imageUrl, startDate, endDate, text, name, url, target, payment, location, newPost })
        res.status(200).json(donation)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a donation
const deleteDonation = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'this donation post does not exist' })
    }

    const donation = await Donation.findOneAndDelete({ _id: id });
    const updatedDonations = await Donation.find({ newPost: true })

    if (!donation) {
        return res.status(404).json({ error: 'this donation post does not exist' })
    }

    res.status(200).json(updatedDonations)
}

// update a donation
const updateDonation = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'this donation post does not exist' })
    }

    const donation = await Donation.findOneAndUpdate({ _id: id }, { ...req.body }, {
        new: true
    });
    const updatedAllDonations = await Donation.find({ newPost: true })

    if (!donation) {
        return res.status(404).json({ error: 'this donation post does not exist' })
    }

    res.status(200).json(updatedAllDonations)
}

module.exports = {
    getDonations,
    getNewDonations,
    getDonation,
    createDonation,
    deleteDonation,
    updateDonation,
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