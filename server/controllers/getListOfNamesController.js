const fs = require('fs');
const path = require('path');

const getNames = async (res , dir_path) => {
    const filePath = path.join(__dirname , ".." , "ftp" , dir_path);

    fs.readdir(filePath, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error');
        }

        const directories = files.filter(file => file.isDirectory()).map(dir => dir.name);
        res.send(directories);
    });
}

module.exports = getNames;

