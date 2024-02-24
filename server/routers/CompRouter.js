const express = require('express');
const router = express.Router();
const path = require('path');

const getPdf = require('../controllers/getPdfController');
const getNames = require('../controllers/getListOfNamesController');

//Forming table
//Seasons
router.get('/competitions/:competitionName/seasons', async (req, res) => {
    getNames(res , `/competitions/${req.params.competitionName}/`);
});
//Years
router.get('/competitions/:competitionName/:seasonName/years', async (req, res) => {
    getNames(res , `/competitions/${req.params.competitionName}/${req.params.seasonName}/`);
});
//classes
router.get('/competitions/:competitionName/:seasonName/:year/classes', async (req, res) => {
    getNames(res , `/competitions/${req.params.competitionName}/${req.params.seasonName}/${req.params.year}/`);
});


//PDF
router.get('/competitions/:competitionName/:seasonName/:year/:className/:pdfType', async (req, res) => {
    getNames(res , req.params.competitionName, req.params.seasonName, req.params.year, req.params.className, req.params.pdfType);
});



module.exports = router;