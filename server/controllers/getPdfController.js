const ftp = require('basic-ftp');


const getNames = async (res , competitionName, seasonName, year, className, pdfType) => {
    const pdfFileName = pdfType === 'probs' ? 'probs.pdf' : 'sol.pdf'; 
    const pdfFilePath = `/competitions/${competitionName}/${seasonName}/${year}/${className}/${pdfFileName}`;
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        await client.access({
            host: '127.0.0.1',
            user: 'lubod',
            password: '1234',
            secure: true,
            secureOptions: { rejectUnauthorized: false },
        });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${pdfFileName}`);

        await client.downloadTo(res, pdfFilePath);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
}

module.exports = getNames;