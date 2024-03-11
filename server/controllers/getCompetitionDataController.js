const fs = require('fs');
const path = require('path');

const checkFilesExist = (dirPath, filesToCheck) => {
    const files = fs.readdirSync(dirPath);
    const fileExists = {};
    filesToCheck.forEach(file => {
        fileExists[file] = files.includes(file);
    });
    return fileExists;
};

const readCompetitionStructure = async (dirPath) => {
    const structure = {};

    const seasons = fs.readdirSync(dirPath, { withFileTypes: true })
                      .filter(dirent => dirent.isDirectory() && dirent.name !== "Main")
                      .map(dirent => dirent.name);

    for (const season of seasons) {
        const yearPath = path.join(dirPath, season);
        const years = fs.readdirSync(yearPath, { withFileTypes: true })
                        .filter(dirent => dirent.isDirectory())
                        .map(dirent => dirent.name);

        structure[season] = {};

        for (const year of years) {
            const classPath = path.join(yearPath, year);
            const classes = fs.readdirSync(classPath, { withFileTypes: true })
                              .filter(dirent => dirent.isDirectory())
                              .map(dirent => dirent.name);

            structure[season][year] = {};

            for (const className of classes) {
                const filesPath = path.join(classPath, className);
                structure[season][year][className] = checkFilesExist(filesPath, ['probs.pdf', 'sol.pdf', 'video.txt', 'rat.pdf']);
            }
        }
    }

    return structure;
};

const getCompetitionData = async (res, dirPath) => {
    const filePath = path.join(__dirname, "..", "ftp", dirPath);
    try {
        const competitionData = await readCompetitionStructure(filePath);
        res.send(competitionData);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error reading competition data');
    }
};

module.exports = getCompetitionData;
