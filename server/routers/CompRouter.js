const express = require('express');
const router = express.Router();
const path = require('path');

const getPdf = require('../controllers/getPdfController');
const getNames = require('../controllers/getListOfNamesController');

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



module.exports = router;