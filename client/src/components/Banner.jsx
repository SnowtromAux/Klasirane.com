import "../styles/Banner.css";
import { useEffect, useState } from 'react';

const Banner = (props) => {
  const { path , page } = props;
  const compName = props.compName || "";

  const [img , setImg] = useState("");
  const [link , setLink] = useState("");
  const [alt , setAlt] = useState("");

  useEffect(() => {
    const fetchBannerImg = async () => {
      try {
        const response = await fetch(`http://localhost:3001/${page}/banner/logo/${path}/${compName}`);
        const blob = await response.blob();
        setImg(URL.createObjectURL(blob));
      } catch (error) {
        console.error('Error fetching ad script:', error);
      }
    };

    const fetchBannerAlt = async () => {
        try {
          const response = await fetch(`http://localhost:3001/${page}/banner/text/${path}/${compName}`);
          const alternative = await response.text();
          setAlt(alternative);
        } catch (error) {
          console.error('Error fetching ad script:', error);
        }
    };

    const fetchBannerLink = async () => {
        try {
          const response = await fetch(`http://localhost:3001/${page}/banner/link/${path}/${compName}`);
          const l = await response.text();
          setLink(l);
        } catch (error) {
          console.error('Error fetching ad script:', error);
        }
      };


    fetchBannerImg();
    fetchBannerAlt();
    fetchBannerLink();
}, [path]);

  return (
    <div className="banner-wrapper">
        <a href = {link} target = "_blank" rel="noreferrer">
            <img src = {img} alt = {alt}></img>
        </a>
    </div>
  );
}

export default Banner;
