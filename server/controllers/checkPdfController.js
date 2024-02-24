const fs = require('fs');
const path = require('path');
// Adjusted function name for clarity
const checkPdf = async (req, res) => {
    const { competitionName, seasonName, year, className, pdfType } = req.params;
    const pdfFileName = pdfType === 'probs' ? 'probs.pdf' : 'sol.pdf';
    const baseDir = path.join(__dirname, "..", "ftp");
    const pdfFilePath = path.join(baseDir, 'competitions', competitionName, seasonName, year, className, pdfFileName);

    try {
        if (fs.existsSync(pdfFilePath)) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = checkPdf;
