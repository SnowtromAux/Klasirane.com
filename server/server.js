// server.js
const cors = require("cors");
const express = require("express");
const app = express();
const path = require("path");

const allowedOrigins = ["http://localhost:3000"]; // Replace with the port your React app is served on

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
