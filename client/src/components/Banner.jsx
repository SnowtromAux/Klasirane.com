import "../styles/Banner.css";
import { useEffect, useState } from 'react';

const Banner = (props) => {
  const { path , page } = props;
  const compName = props.compName || "";

  const [img1 , setImg1] = useState("");
  const [link1 , setLink1] = useState("");
  const [alt1 , setAlt1] = useState("");

  
  const [img2 , setImg2] = useState("");
  const [link2 , setLink2] = useState("");
  const [alt2 , setAlt2] = useState("");

  useEffect(() => {
    const fetchBannerImg1 = async () => {
      try {
        const response = await fetch(`http://15.188.118.216:3001/${page}/banner/logo/${path}/banner1/${compName}/logo`);
        const blob = await response.blob();
        setImg1(URL.createObjectURL(blob));
      } catch (error) {
        console.error('Error fetching ad script:', error);
      }
    };

    const fetchBannerImg2 = async () => {
      try {
        const response = await fetch(`http://15.188.118.216:3001/${page}/banner/logo/${path}/banner2/${compName}/logo`);
        const blob = await response.blob();
        setImg2(URL.createObjectURL(blob));
      } catch (error) {
        console.error('Error fetching ad script:', error);
      }
    };

    const fetchBannerAlt1 = async () => {
      console.log(path)
        try {
          const response = await fetch(`http://15.188.118.216:3001/${page}/banner/text/${path}/banner1/${compName}/alt`);
          const alternative = await response.text();
          setAlt1(alternative);
        } catch (error) {
          console.error('Error fetching ad script:', error);
        }
    };

    const fetchBannerAlt2 = async () => {
      try {
        const response = await fetch(`http://15.188.118.216:3001/${page}/banner/text/${path}/banner2/${compName}/alt`);
        const alternative = await response.text();
        setAlt2(alternative);
      } catch (error) {
        console.error('Error fetching ad script:', error);
      }
  };

    const fetchBannerLink1 = async () => {
        try {
          const response = await fetch(`http://15.188.118.216:3001/${page}/banner/link/${path}/banner1/${compName}/link`);
          const l = await response.text();
          setLink1(l);
        } catch (error) {
          console.error('Error fetching ad script:', error);
        }
      };
      
    const fetchBannerLink2 = async () => {
      try {
        const response = await fetch(`http://15.188.118.216:3001/${page}/banner/link/${path}/banner2/${compName}/link`);
        const l = await response.text();
        setLink2(l);
      } catch (error) {
        console.error('Error fetching ad script:', error);
      }
    };


    fetchBannerImg1();
    fetchBannerImg2();

    fetchBannerAlt1();
    fetchBannerAlt2();

    fetchBannerLink1();
    fetchBannerLink2();
}, [path]);

  return (
    <div className="big-banner-wrapper">
      <div className="banner-wrapper">
          <a href = {link1} target = "_blank" rel="noreferrer">
              <img src = {img1} alt = {alt1}></img>
          </a>
      </div>
      <div className="banner-wrapper">
          <a href = {link2} target = "_blank" rel="noreferrer">
              <img src = {img2} alt = {alt2}></img>
          </a>
      </div>
    </div>
  );
}

export default Banner;
