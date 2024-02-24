const express = require('express');
const router = express.Router();
const path = require('path');

const getPdf = require('../controllers/getPdfController');
const checkPdf = require('../controllers/checkPdfController');
const checkTxt = require('../controllers/checkTxtController');
const getNames = require('../controllers/getListOfNamesController');
const getTextData = require('../controllers/getTextDataController');

//Forming table
//Seasons
router.get('/:competitionName/seasons', async (req, res) => {
    getNames(res , `/competitions/${req.params.competitionName}/`);
});
//Years
router.get('/:competitionName/:seasonName/years', async (req, res) => {
    getNames(res , `/competitions/${req.params.competitionName}/${req.params.seasonName}/`);
});
//classes
router.get('/:competitionName/:seasonName/:year/classes', async (req, res) => {
    getNames(res , `/competitions/${req.params.competitionName}/${req.params.seasonName}/${req.params.year}/`);
});

//PDF
router.get('/:competitionName/:seasonName/:year/:className/:pdfType', async (req, res) => {
    getPdf(res , req.params.competitionName, req.params.seasonName, req.params.year, req.params.className, req.params.pdfType);
});

// New endpoint for checking PDF availability
router.get('/check/:competitionName/:seasonName/:year/:className/:pdfType', async (req, res) => {
    checkPdf(req, res);
});


router.get('/text/:competitionName/:seasonName/:year/:className', async (req, res) => {
    getTextData(res , `/competitions/${req.params.competitionName}/${req.params.seasonName}/${req.params.year}/${req.params.className}/video.txt`);
});

router.get('/checkVideo/:competitionName/:seasonName/:year/:className', async (req, res) => {
    console.log("HSHSHSHSHSHSH");
    console.log(req.params);
    checkTxt(req, res);
});



module.exports = router;