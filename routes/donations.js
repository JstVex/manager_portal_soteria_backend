const express = require('express');
const {
    getDonations,
    getNewDonations,
    getDonation,
    createDonation,
    deleteDonation,
    updateDonation,
} = require('../controllers/donationController');


const router = express();

// get webs
router.get('/', getDonations);

router.get('/new', getNewDonations);

// router.get('/kachin', getKachin);
// router.get('/kayah', getKayah);
// router.get('/kayin', getKayin);
// router.get('/chin', getChin);
// router.get('/mon', getMon);
// router.get('/rakhine', getRakhine);
// router.get('/shan', getShan);
// router.get('/yangon', getYangon);
// router.get('/mandalay', getMandalay);
// router.get('/ayeyarwady', getAyeyarwady);
// router.get('/bago', getBago);
// router.get('/magway', getMagway);
// router.get('/sagaing', getSagaing);
// router.get('/tanintharyi', getTanintharyi);

//get a single web
router.get('/:id', getDonation);

// creat a web
router.post('/', createDonation);

// delete a web
router.delete('/:id', deleteDonation);

//update a web
router.patch('/:id', updateDonation);

module.exports = router;