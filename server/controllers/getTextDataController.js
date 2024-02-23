const ftp = require('basic-ftp');
const { Writable } = require('stream');

const getTextData = async (res , path) => {
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

        const remoteFilePath = `${path}`;
        let text_to_send = '';
        const writableStream = new Writable({
            write(chunk, encoding, callback) {
              text_to_send += chunk.toString();
              callback();
            }
        });

        await client.downloadTo(writableStream , remoteFilePath)
        .then(()=>{
            res.status(200).send(text_to_send);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('');
    } finally {
        await client.close();
    }
}

module.exports = getTextData;