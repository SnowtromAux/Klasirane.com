const fs = require('fs');
const path = require('path');

const getImage = async (res , img_path) => {
    const filePath = path.join(__dirname , ".." , "ftp" , img_path);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading image file');
        }

        res.contentType('image/jpeg');

        res.send(data);
    });
}

module.exports = getImage;