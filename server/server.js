const express = require('express');
const cors = require('cors');
const ftp = require('basic-ftp');
const { Writable } = require('stream');

const app = express();
const port = 3001;

app.use(cors());

app.get('/home/:id', async (req, res) => {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        await client.access({
            host: '10.108.6.36',
            user: 'stenli',
            password: '1234',
            secure: true,
            secureOptions: { rejectUnauthorized: false },
        });

        const remoteFilePath = `/home/${req.params.id}`;
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
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
