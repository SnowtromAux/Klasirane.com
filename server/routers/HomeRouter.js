const express = require('express');
const router = express.Router();
const path = require('path');

const getTextData = require('../controllers/getTextDataController');
const getNames = require('../controllers/getListOfNamesController');
const getImage = require('../controllers/getImageController');



//Main Data
router.get('/:id', async (req, res) => {
    getTextData(res , `/home/${req.params.id}`);
});

router.get('/dir/get-names', async (req, res) => {
    getNames(res , `/home/main-data`);
});


//Sicademy Data
router.get('/sicademy/description/:id', async (req, res) => {
    getTextData(res , `/home/main-data/${req.params.id}/description.txt`);
});

router.get('/sicademy/button/:id', async (req, res) => {
    getTextData(res , `/home/main-data/${req.params.id}/button.txt`);
});

router.get('/sicademy/logo/:id', async (req, res) => {
    getImage(res , `/home/main-data/${req.params.id}/logo.png`);
});

//Ad Data
router.get('/ad/text/:id', async (req, res) => {
    getTextData(res , `/home/main-data/${req.params.id}/script.txt`);
});


//Klasirane Data
router.get('/klasirane/title/:id', async (req, res) => {
    getTextData(res , `/home/main-data/${req.params.id}/title.txt`);
});

router.get('/klasirane/description/:id', async (req, res) => {
    getTextData(res , `/home/main-data/${req.params.id}/description.txt`);
});

router.get('/klasirane/mailData/:id', async (req, res) => {
    getTextData(res , `/home/main-data/${req.params.id}/mail-text.txt`);
});

router.get('/klasirane/logo/:id', async (req, res) => {
    getImage(res , `/home/main-data/${req.params.id}/logo.png`);
});


//New Data
router.get('/new/title/:id', async (req, res) => {
    getTextData(res , `/home/main-data/${req.params.id}/title.txt`);
});

router.get('/new/description/:id', async (req, res) => {
    getTextData(res , `/home/main-data/${req.params.id}/description.txt`);
});

router.get('/new/logo/:id', async (req, res) => {
    getImage(res , `/home/main-data/${req.params.id}/logo.png`);
});

router.get('/new/alt/:id', async (req, res) => {
    getTextData(res , `/home/main-data/${req.params.id}/alt.txt`);
});


//Banner Data
router.get('/banner/text/:id/:bannerType/alt', async (req, res) => {
    getTextData(res , `/home/main-data/${req.params.id}/${req.params.bannerType}/alt.txt`);
});

router.get('/banner/logo/:id/:bannerType/logo', async (req, res) => {
    getImage(res , `/home/main-data/${req.params.id}/${req.params.bannerType}/banner.png`);
});

router.get('/banner/link/:id/:bannerType/link', async (req, res) => {
    getTextData(res , `/home/main-data/${req.params.id}/${req.params.bannerType}/link.txt`);
});

module.exports = router;