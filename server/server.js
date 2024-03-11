const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

//const allowedOrigins = ['http://15.188.118.216:3000'];

// Use CORS middleware with options
app.use(cors());

const comp_router = require('./routers/CompRouter.js');
app.use("/competitions" , comp_router);

const home_router = require('./routers/HomeRouter.js');
app.use("/home" , home_router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

