const express = require('express');
const cors = require('cors');
const ftp = require('basic-ftp');
const { Writable } = require('stream');

const app = express();
const port = 3001;

app.use(cors());

const comp_router = require('./routers/CompRouter.js');
app.use("/" , comp_router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
