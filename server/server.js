const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

// const corsOptions = {
//     origin: 'http://klasirane.com',
//     optionsSuccessStatus: 200
// };
  
// app.use(cors(corsOptions));

app.use(cors());

const comp_router = require('./routers/CompRouter.js');
app.use("/competitions" , comp_router);

const home_router = require('./routers/HomeRouter.js');
app.use("/home" , home_router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

