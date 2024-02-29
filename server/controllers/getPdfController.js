const fs = require('fs');
const path = require('path');

const getPdf = async (res, competitionName, seasonName, year, className, pdfType) => {
    const pdfFileName = pdfType === 'probs' ? 'probs.pdf' : 'sol.pdf';
    const baseDir = path.join(__dirname , ".." , "ftp");
    const pdfFilePath = path.join(baseDir, 'competitions', competitionName, seasonName, year, className, pdfFileName);

    try {
        if (fs.existsSync(pdfFilePath)) {
            const downloadFileName = `${competitionName}-${seasonName}-${year}-${className}-${pdfFileName}`;

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=${encodeURI(downloadFileName)}`);

            const readStream = fs.createReadStream(pdfFilePath);
            readStream.pipe(res);
        } else {
            res.status(404).send('File not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = getPdf;
