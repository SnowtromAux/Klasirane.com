import "../styles/New.css";
import React, { useState, useEffect } from 'react';

const New = (props) => {
  const { path , page } = props;
  const compName = props.compName || "";


  const [title , setTitle] = useState("");
  const [description , setDescription] = useState("");
  const [img  , setImg] = useState("");
  const [alt  , setAlt] = useState("");
  
  useEffect(() => {
      const fetchTitleData = async () => {
        try {
          const response = await fetch(`https://klasirane.com/api/${page}/new/title/${path}/${compName}`);
          const new_title = await response.text();
          setTitle(new_title);
        } catch (error) {
          console.error('Error fetching title:', error);
        }
      };
  
      const fetchDescriptionData = async () => {
        try {
          const response = await fetch(`https://klasirane.com/api/${page}/new/description/${path}/${compName}`);
          const desc = await response.text();
          setDescription(desc);
        } catch (error) {
          console.error('Error fetching description:', error);
        }
      };

      const fetchImgData = async () => {
        try {
          const response = await fetch(`https://klasirane.com/api/${page}/new/logo/${path}/${compName}`);
          const blob = await response.blob();
          setImg(URL.createObjectURL(blob));
        } catch (error) {
          console.error('Error fetching description:', error);
        }
      }

      const fetchAltData = async () => {
        try {
          const response = await fetch(`https://klasirane.com/api/${page}/new/alt/${path}/${compName}`);
          const alternative = await response.text();
          setAlt(alternative)
        } catch (error) {
          console.error('Error fetching alt:', error);
        }
      }
  
      fetchTitleData();
      fetchDescriptionData();
      fetchImgData();
      fetchAltData();
    }, [path]);

  return (
    <div className="new-wrapper">
      <div className="new-top">
        <div className="new-top-div-img">
          <img src={img} alt={alt}></img>
        </div>

        <label dangerouslySetInnerHTML={{ __html: title }}></label>
      </div>
      <div className="new-middle">
        <label dangerouslySetInnerHTML={{ __html: description }}></label>
      </div>
    </div>

  );
}

export default New;