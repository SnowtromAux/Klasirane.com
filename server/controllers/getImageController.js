const ftp = require('basic-ftp');
const fs = require('fs').promises;

const getImage = async (res , localPath , remotePath) => {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        await client.access({
            host: '192.168.0.127',
            user: 'stenli',
            password: '1234',
            secure: true,
            secureOptions: { rejectUnauthorized: false },
        });
        
        await client.downloadTo(localPath , remotePath);

        await new Promise((resolve, reject) => {
            res.sendFile(localPath, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
      
        await fs.unlink(localPath);

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
}

module.exports = getImage;