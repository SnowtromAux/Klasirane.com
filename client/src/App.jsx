import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeComponent from "./components/HomePage";
import Footer from "./components/Footer"
// import CreateComponent from "./components/CreatePage";


// import React, { useEffect , useState } from 'react';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomeComponent />} />
        {/* <Route exact path="/competition/:id" element = {<CompetitionComponent />}></Route> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
