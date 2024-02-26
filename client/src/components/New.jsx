import "../styles/New.css";
import React, { useState, useEffect } from 'react';

const New = (props) => {

  const { path } = props;

  const [title , setTitle] = useState("");
  const [description , setDescription] = useState("");
  const [img  , setImg] = useState("");
  const [alt  , setAlt] = useState("");
  
  useEffect(() => {
      const fetchTitleData = async () => {
        try {
          const response = await fetch(`http://13.51.197.59:3001/home/new/title/${path}/`);
          const new_title = await response.text();
          setTitle(new_title);
        } catch (error) {
          console.error('Error fetching title:', error);
        }
      };
  
      const fetchDescriptionData = async () => {
        try {
          const response = await fetch(`http://13.51.197.59:3001/home/new/description/${path}/`);
          const desc = await response.text();
          setDescription(desc);
        } catch (error) {
          console.error('Error fetching description:', error);
        }
      };

      const fetchImgData = async () => {
        try {
          const response = await fetch(`http://13.51.197.59:3001/home/new/logo/${path}/`);
          const blob = await response.blob();
          setImg(URL.createObjectURL(blob));
        } catch (error) {
          console.error('Error fetching description:', error);
        }
      }

      const fetchAltData = async () => {
        try {
          const response = await fetch(`http://13.51.197.59:3001/home/new/alt/${path}/`);
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

export default New;
