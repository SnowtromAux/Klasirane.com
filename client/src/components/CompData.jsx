import "../styles/CompData.css";
import React, { useState, useEffect } from 'react';

const New = (props) => {
  const { path , page , compName } = props;
  const isNarrowScreen = window.innerWidth < 1365 && window.innerWidth >= 1161 || window.innerWidth < 1020;
  const checkScreen = window.innerWidth > 1161;

  const [title , setTitle] = useState("");
  const [description , setDescription] = useState("");
  const [img  , setImg] = useState("");
  const [alt  , setAlt] = useState("");
  const [last_added , setLastAdded] = useState("");
  
  useEffect(() => {
      const fetchTitleData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/${page}/comp-data/title/${path}/${compName}`);
          const new_title = await response.text();
          setTitle(new_title);
        } catch (error) {
          console.error('Error fetching title:', error);
        }
      };
  
      const fetchDescriptionData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/${page}/comp-data/description/${path}/${compName}`);
          const desc = await response.text();
          setDescription(desc);
        } catch (error) {
          console.error('Error fetching description:', error);
        }
      };

      const fetchImgData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/${page}/comp-data/logo/${path}/${compName}`);
          const blob = await response.blob();
          setImg(URL.createObjectURL(blob));
        } catch (error) {
          console.error('Error fetching description:', error);
        }
      }

      const fetchAltData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/${page}/comp-data/alt/${path}/${compName}`);
          const alternative = await response.text();
          setAlt(alternative)
        } catch (error) {
          console.error('Error fetching alt:', error);
        }
      }

      const fetchLastAddedData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/${page}/comp-data/last-added/${path}/${compName}`);
          const l_a = await response.text();
          setLastAdded(l_a);
        } catch (error) {
          console.error('Error fetching last added:', error);
        }
      }
  
      fetchTitleData();
      fetchDescriptionData();
      fetchImgData();
      fetchAltData();
      fetchLastAddedData();
    }, [path]);

  return (
    <div className="comp-data-wrapper">
      {!isNarrowScreen ? (
        <div className="comp-data-top">
          <div className="comp-data-div-img"  style={{width: "33%"}}>
            <img src={img} alt={alt}></img>
          </div>

          <div className="comp-data-top-right">
            <label className="comp-data-title" dangerouslySetInnerHTML={{ __html: title }}></label>
            <label className="comp-data-last-added" dangerouslySetInnerHTML={{ __html: last_added }}></label>  
          </div>
        </div>
      ) : (
        <div className="comp-data-top">
        <div className="comp-data-top-right" style={{gap: "10px"}}>
          <label className="comp-data-title" dangerouslySetInnerHTML={{ __html: title }}></label>
          <div className="comp-data-div-img" style={{width: "auto"}}>
            <img src={img} alt={alt} style={{borderRadius: "50px", width: checkScreen ? "500px" : ""}}></img>
          </div>
          <label className="comp-data-last-added" dangerouslySetInnerHTML={{ __html: last_added }}></label>  
        </div>
      </div>
      )}
      <div className="comp-data-middle">
        <label dangerouslySetInnerHTML={{ __html: description }}></label>
      </div>
    </div>

  );
}

export default New;
