const express = require('express');
const router = express.Router();
const path = require('path');

const getPdf = require('../controllers/getPdfController');
const checkPdf = require('../controllers/checkPdfController');
const checkTxt = require('../controllers/checkTxtController');
const getNames = require('../controllers/getListOfNamesController');
const getTextData = require('../controllers/getTextDataController');
const getImage = require('../controllers/getImageController');
const getCompetitionData = require('../controllers/getCompetitionDataController');


router.get('/:competitionName/alldata', async (req, res) => {
    getCompetitionData(res , `/competitions/${req.params.competitionName}/`);
});

//PDF
router.get('/:competitionName/:seasonName/:year/:className/:pdfType', async (req, res) => {
    getPdf(res , req.params.competitionName, req.params.seasonName, req.params.year, req.params.className, req.params.pdfType);
});

router.get('/get/:competitionName/:seasonName/:year/:className/videolink', async (req, res) => {
    getTextData(res , `/competitions/${req.params.competitionName}/${req.params.seasonName}/${req.params.year}/${req.params.className}/video.txt`);
});


//Main Data
router.get('/dir/get-names/:compName', async (req, res) => {
    getNames(res , `/competitions/${req.params.compName}/Main`);
});


//Sicademy Data
router.get('/sicademy/description/:id/:compName', async (req, res) => {
    getTextData(res , `/competitions/${req.params.compName}/Main/${req.params.id}/description.txt`);
});

router.get('/sicademy/button/:id/:compName', async (req, res) => {
    getTextData(res , `/competitions/${req.params.compName}/Main/${req.params.id}/button.txt`);
});

router.get('/sicademy/logo/:id/:compName', async (req, res) => {
    getImage(res , `/competitions/${req.params.compName}/Main/${req.params.id}/logo.png`);
});

//Ad Data
router.get('/ad/text/:id/:compName', async (req, res) => {
    getTextData(res , `/competitions/${req.params.compName}/Main/${req.params.id}/script.txt`);
});


//Klasirane Data
router.get('/klasirane/title/:id/:compName', async (req, res) => {
    getTextData(res , `/competitions/${req.params.compName}/Main/${req.params.id}/title.txt`);
});

router.get('/klasirane/description/:id/:compName', async (req, res) => {
    getTextData(res , `/competitions/${req.params.compName}/Main/${req.params.id}/description.txt`);
});

router.get('/klasirane/mailData/:id/:compName', async (req, res) => {
    getTextData(res , `/competitions/${req.params.compName}/Main/${req.params.id}/mail-text.txt`);
});

router.get('/klasirane/logo/:id/:compName', async (req, res) => {
    getImage(res , `/competitions/${req.params.compName}/Main/${req.params.id}/logo.png`);
});


//New Data
router.get('/new/title/:id/:compName', async (req, res) => {
    getTextData(res , `/competitions/${req.params.compName}/Main/${req.params.id}/title.txt`);
});

router.get('/new/description/:id/:compName', async (req, res) => {
    getTextData(res , `/competitions/${req.params.compName}/Main/${req.params.id}/description.txt`);
});

router.get('/new/logo/:id/:compName', async (req, res) => {
    getImage(res , `/competitions/${req.params.compName}/Main/${req.params.id}/logo.png`);
});

router.get('/new/alt/:id/:compName', async (req, res) => {
    getTextData(res , `/competitions/${req.params.compName}/Main/${req.params.id}/alt.txt`);
});


//Comp Info Data
router.get('/comp-data/title/:id/:compName', async (req, res) => {
    getTextData(res , `/competitions/${req.params.compName}/Main/${req.params.id}/title.txt`);
});

router.get('/comp-data/description/:id/:compName', async (req, res) => {
    getTextData(res , `/competitions/${req.params.compName}/Main/${req.params.id}/description.txt`);
});

router.get('/comp-data/logo/:id/:compName', async (req, res) => {
    getImage(res , `/competitions/${req.params.compName}/Main/${req.params.id}/logo.png`);
});

router.get('/comp-data/alt/:id/:compName', async (req, res) => {
    getTextData(res , `/competitions/${req.params.compName}/Main/${req.params.id}/alt.txt`);
});

router.get('/comp-data/last-added/:id/:compName', async (req, res) => {
    getTextData(res , `/competitions/${req.params.compName}/Main/${req.params.id}/last.txt`);
});


//Banner Data
router.get('/banner/text/:id/:bannerType/:compName', async (req, res) => {
    getTextData(res , `/competitions/${req.params.compName}/Main/${req.params.id}/${req.params.bannerType}/alt.txt`);
});

router.get('/banner/logo/:id/:bannerType/:compName', async (req, res) => {
    getImage(res , `/competitions/${req.params.compName}/Main/${req.params.id}/${req.params.bannerType}/banner.png`);
});

router.get('/banner/link/:id/:bannerType/:compName', async (req, res) => {
    getTextData(res , `/competitions/${req.params.compName}/Main/${req.params.id}/${req.params.bannerType}/link.txt`);
});


module.exports = router;