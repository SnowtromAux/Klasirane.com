const ftp = require('basic-ftp');


const getNames = async (res , path) => {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        await client.access({
            host: '192.168.1.104',
            user: 'stenli',
            password: '1234',
            secure: true,
            secureOptions: { rejectUnauthorized: false },
        });

        const list = await client.list(path);
        const names = list.map(item => item.name);

        res.status(200).send(names);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
}

module.exports = getNames;