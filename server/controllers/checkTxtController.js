const fs = require('fs');
const path = require('path');
// Adjusted function name for clarity
const checkTxt = async (req, res) => {
    const filePath = path.join(__dirname, "..", "ftp", "competitions", req.params.competitionName, req.params.seasonName, req.params.year, req.params.className, "video.txt");
    try {
        if (fs.existsSync(filePath)) {
            res.json({ available: true });
        } else {
            res.json({ available: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error checking video availability');
    }
};

module.exports = checkTxt;
