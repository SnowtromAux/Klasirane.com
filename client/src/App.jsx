import React, { useState } from 'react';
import CookieConsent from 'react-cookie-consent';
import "./App.css";
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeComponent from "./components/HomePage";
import GeneralCompWrapper from "./components/GeneralCompWrapper";

import Footer from "./components/Footer";
import NotFoundPage from './components/PageNotFound';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PrivacyPolicy from './components/PrivacyPolicy';
import Cookies from './components/Cookies';

function App() {
  const [isPageNotFound, setIsPageNotFound] = useState(false);
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
      </Helmet>
      <Router>
          {/* <ScrollToTop /> */}
          <Routes>
            <Route exact path="/" element={<HomeComponent />} />
            <Route exact path="/competitions/:competitionName" element = {<GeneralCompWrapper />}></Route>
            <Route path="/competitions/:competitionName/:season" element={<GeneralCompWrapper />} />
            <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route exact path="/cookies" element={<Cookies />} />
            <Route path="*" element={<NotFoundPage setIsPageNotFound={setIsPageNotFound} />} />
          </Routes>
        <Footer />
        <CookieConsent
          location="bottom"
          buttonText="Разбирам"
          cookieName="userConsent"
          style={{ background: "#369" }}
          buttonStyle={{ color: "white", fontSize: "14px" }}
          expires={150}
          onAccept={() => {
            // Include logic here for what happens after acceptance.
            console.log("Consent given.");
          }}
        >
          Този уебсайт използва бисквитки, за да подобри потребителското изживяване. Продължавайки да разглеждате сайта, вие се съгласявате с използването на бисквитки от наша страна.
        </CookieConsent>
      </Router>
    </div>
  );
}

export default App;
