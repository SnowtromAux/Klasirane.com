const fs = require('fs');
const path = require('path');

const getPdf = async (res, competitionName, seasonName, year, className, pdfType) => {
    const pdfFileName = pdfType === 'probs' ? 'probs.pdf' : 'sol.pdf';
    const baseDir = path.join(__dirname , ".." , "ftp");
    const pdfFilePath = path.join(baseDir, 'competitions', competitionName, seasonName, year, className, pdfFileName);

    try {
        if (fs.existsSync(pdfFilePath)) {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=${pdfFileName}`);
            // Create a read stream and pipe it to the response
            const readStream = fs.createReadStream(pdfFilePath);
            readStream.pipe(res);
        } else {
            // Handle case where the file does not exist
            res.status(404).send('File not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = getPdf;
