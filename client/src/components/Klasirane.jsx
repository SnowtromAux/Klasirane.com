import React, { useState, useEffect } from 'react';
import "../styles/HomeNew.css";
import mail from '../assets/mail.png';

const Klasirane = (props) => {
  const [isNarrowScreen, setIsNarrowScreen] = useState(window.innerWidth < 700);

  const { path } = props;

  const [title , setTitle] = useState("");
  const [description , setDescription] = useState("");
  const [img  , setImg] = useState("");
  const [mailText  , setMailText] = useState("");

  
  useEffect(() => {
      const fetchTitleData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/home/klasirane/title/${path}/`);
          const klasirane_title = await response.text();
          setTitle(klasirane_title);
        } catch (error) {
          console.error('Error fetching title:', error);
        }
      };
  
      const fetchDescriptionData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/home/klasirane/description/${path}/`);
          const desc = await response.text();
          setDescription(desc);
        } catch (error) {
          console.error('Error fetching description:', error);
        }
      };

      const fetchImgData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/home/klasirane/logo/${path}/`);
          const blob = await response.blob();
          setImg(URL.createObjectURL(blob));
        } catch (error) {
          console.error('Error fetching description:', error);
        }
      }

      const fetchMailTextData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/home/klasirane/mailData/${path}/`);
          const mail_text = await response.text();
          setMailText(mail_text);
        } catch (error) {
          console.error('Error fetching description:', error);
        }
      };
  
      fetchTitleData();
      fetchDescriptionData();
      fetchImgData();
      fetchMailTextData();
    }, [path]);

  return (
    <div className="homenew-wrapper">
      <div className="homenew-top">
        <div>
          <img src={img} alt="competition icon"></img>
        </div>

        <label dangerouslySetInnerHTML={{ __html: title }}></label>
      </div>
      <div className="homenew-middle">
        <label dangerouslySetInnerHTML={{ __html: description }}></label>
      </div>
      {!isNarrowScreen ? (
        <div className="homenew-bottom">
          <div className="homenew-mail">
            <img src={mail} alt="mail icon"></img>
          </div>
          <div className="homenew-mail-text" dangerouslySetInnerHTML={{ __html: mailText }}></div>
        </div>
      ) : (
        <div className="homenew-bottom">
          <div className="homenew-mail-text" dangerouslySetInnerHTML={{ __html: mailText }}></div>
          <div className="homenew-mail">
            <img src={mail} alt="mail icon"></img>
          </div>
        </div>
      )}
    </div >

  );
}

export default Klasirane;