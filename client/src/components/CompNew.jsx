import "../styles/CompNew.css";
import React, { useState, useEffect } from 'react';

const CompNew = (props) => {

  const { path } = props;

  const [title , setTitle] = useState("");
  const [description , setDescription] = useState("");
  const [img  , setImg] = useState("");
  const [alt  , setAlt] = useState("");
  
  useEffect(() => {
      const fetchTitleData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/competitions/OMT/new/title/${path}/get/txt`);
          const new_title = await response.text();
          setTitle(new_title);
        } catch (error) {
          console.error('Error fetching title:', error);
        }
      };
  
      const fetchDescriptionData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/competitions/OMT/new/description/${path}/get/txt`);
          const desc = await response.text();
          setDescription(desc);
        } catch (error) {
          console.error('Error fetching description:', error);
        }
      };

      const fetchImgData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/competitions/OMT/new/logo/${path}/get/txt`);
          const blob = await response.blob();
          setImg(URL.createObjectURL(blob));
        } catch (error) {
          console.error('Error fetching description:', error);
        }
      }

      const fetchAltData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/competitions/OMT/new/alt/${path}/get/txt`);
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
        <div>
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

export default CompNew;
