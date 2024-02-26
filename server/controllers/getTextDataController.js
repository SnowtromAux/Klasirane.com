const fs = require('fs');
const path = require('path');

const getTextData = async (res , text_path) => {

    const filePath = path.join(__dirname , ".." , "ftp" , text_path);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error');
        }
        // Send the file content as the response
        res.send(data);
    });
}

module.exports = getTextData;