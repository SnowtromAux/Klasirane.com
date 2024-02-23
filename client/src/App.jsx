import "./App.css";
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeComponent from "./components/HomePage";
import Footer from "./components/Footer"
// import CreateComponent from "./components/CreatePage";


// import React, { useEffect , useState } from 'react';

function App() {
  return (
    <div>
      <Helmet>
        <title>Klasirane</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Your page description" />
        <meta charset="UTF-8" />
        <meta name="description" content="Your website description here" />
        <meta name="author" content="Stenli" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />

        <meta name="keywords" content="your, desired, keywords, here" />
        {/* Add more meta tags if needed */}
      </Helmet>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomeComponent />} />
          {/* <Route exact path="/competition/:id" element = {<CompetitionComponent />}></Route> */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
