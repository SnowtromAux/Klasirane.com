import React, { useState } from 'react';
import CookieConsent from 'react-cookie-consent';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeComponent from "./components/HomePage";
import GeneralCompWrapper from "./components/GeneralCompWrapper";

import Footer from "./components/Footer";
import NotFoundPage from './components/PageNotFound';
import PrivacyPolicy from './components/PrivacyPolicy';
import { useEffect } from 'react';
import Cookies from './components/Cookies';
import { Helmet } from 'react-helmet';

function App() {
  useEffect(() => {
    console.clear();
  } , [])
  return (
    <div>
      <Helmet>
        <title>Klasirane</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charset="UTF-8" />
        <meta property="og:url" content="http://klasirane.com/" />
        <meta property="og:title" content ="Klasirane.com : Задачи, Математика, Състезания, Решения" />
        <meta property="og:description" content ="МАТЕМАТИКА - Задачи, Решения и Отговори от математически Състезания и Турнири || Mathematics Problems and Solutions | Klasirane.com | класиране" />
        <meta property="description" content ="МАТЕМАТИКА - Задачи, Решения и Отговори от математически Състезания и Турнири || Mathematics Problems and Solutions | Klasirane.com | класиране" />
      
        <link href="http://klasirane.com/" rel="canonical" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        <meta name="author" content="Станислав Димитров" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="keywords" content="класиране , задачи , отговори , решения , олимпиада , състезание , турнир , математика , рейтинг , станислав , димитров , чобанов" />

      </Helmet>
      <Router>
          {/* <ScrollToTop /> */}
          <Routes>
            <Route exact path="/" element={<HomeComponent />} />
            <Route exact path="/competitions/:competitionName" element = {<GeneralCompWrapper />}></Route>
            <Route path="/competitions/:competitionName/:season" element={<GeneralCompWrapper />} />
            <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route exact path="/cookies" element={<Cookies />} />
            <Route path="*" element={<NotFoundPage />} />
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
          }}
        >
          Този уебсайт използва бисквитки, за да подобри потребителското изживяване. Продължавайки да разглеждате сайта, вие се съгласявате с използването на бисквитки от наша страна.
        </CookieConsent>
      </Router>
    </div>
  );
}

export default App;
