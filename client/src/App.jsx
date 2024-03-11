import "./App.css";
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeComponent from "./components/HomePage";
import GeneralCompWrapper from "./components/GeneralCompWrapper";
import Footer from "./components/Footer";
import NotFoundPage from './components/PageNotFound';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

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
      </Helmet>
      <Router>
          {/* <ScrollToTop /> */}
          <Routes>
            <Route exact path="/" element={<HomeComponent />} />
            <Route exact path="/competitions/:competitionName" element = {<GeneralCompWrapper />}></Route>
            <Route path="/competitions/:competitionName/:season" element={<GeneralCompWrapper />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
      </Router>
    </div>
  );
}

export default App;
