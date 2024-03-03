import "../styles/CompData.css";
import React, { useState, useEffect } from 'react';

const New = (props) => {
  const { path , page , compName } = props;


  const [title , setTitle] = useState("");
  const [description , setDescription] = useState("");
  const [img  , setImg] = useState("");
  const [alt  , setAlt] = useState("");
  const [last_added , setLastAdded] = useState("");
  
  useEffect(() => {
      const fetchTitleData = async () => {
        try {
          const response = await fetch(`http://13.51.197.59:3001/${page}/comp-data/title/${path}/${compName}`);
          const new_title = await response.text();
          console.log(new_title)
          setTitle(new_title);
        } catch (error) {
          console.error('Error fetching title:', error);
        }
      };
  
      const fetchDescriptionData = async () => {
        try {
          const response = await fetch(`http://13.51.197.59:3001/${page}/comp-data/description/${path}/${compName}`);
          const desc = await response.text();
          console.log(desc)
          setDescription(desc);
        } catch (error) {
          console.error('Error fetching description:', error);
        }
      };

      const fetchImgData = async () => {
        try {
          const response = await fetch(`http://13.51.197.59:3001/${page}/comp-data/logo/${path}/${compName}`);
          const blob = await response.blob();
          setImg(URL.createObjectURL(blob));
        } catch (error) {
          console.error('Error fetching description:', error);
        }
      }

      const fetchAltData = async () => {
        try {
          const response = await fetch(`http://13.51.197.59:3001/${page}/comp-data/alt/${path}/${compName}`);
          const alternative = await response.text();
          setAlt(alternative)
        } catch (error) {
          console.error('Error fetching alt:', error);
        }
      }

      const fetchLastAddedData = async () => {
        try {
          const response = await fetch(`http://13.51.197.59:3001/${page}/comp-data/last-added/${path}/${compName}`);
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
    <div className="new-wrapper comp-data-wrapper">
      <div className="new-top comp-data-top">
        <div className="new-data-div-img">
          <img src={img} alt={alt}></img>
        </div>

        <div className="comp-data-top-right">
          <label className="comp-data-title" dangerouslySetInnerHTML={{ __html: title }}></label>
          <label className="comp-data-last-added" dangerouslySetInnerHTML={{ __html: last_added }}></label>  
        </div>
      </div>
      <div className="new-middle">
        <label dangerouslySetInnerHTML={{ __html: description }}></label>
      </div>
    </div>

  );
}

export default New;