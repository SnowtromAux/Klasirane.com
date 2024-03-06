import React, { useState, useEffect } from 'react';
import "../styles/Klasirane.css";
import mail from '../assets/mail.png';

const Klasirane = (props) => {
  const isNarrowScreen = window.innerWidth < 746;

  const { path , page } = props;
  const compName = props.compName || "";

  const [title , setTitle] = useState("");
  const [description , setDescription] = useState("");
  const [img  , setImg] = useState("");
  const [mailText  , setMailText] = useState("");

  
  useEffect(() => {
      const fetchTitleData = async () => {
        try {
          const response = await fetch(`http://15.188.118.216:3001/${page}/klasirane/title/${path}/${compName}`);
          const klasirane_title = await response.text();
          setTitle(klasirane_title);
        } catch (error) {
          console.error('Error fetching title:', error);
        }
      };
  
      const fetchDescriptionData = async () => {
        try {
          const response = await fetch(`http://15.188.118.216:3001/${page}/klasirane/description/${path}/${compName}`);
          const desc = await response.text();
          setDescription(desc);
        } catch (error) {
          console.error('Error fetching description:', error);
        }
      };

      const fetchImgData = async () => {
        try {
          const response = await fetch(`http://15.188.118.216:3001/${page}/klasirane/logo/${path}/${compName}`);
          const blob = await response.blob();
          setImg(URL.createObjectURL(blob));
        } catch (error) {
          console.error('Error fetching description:', error);
        }
      }

      const fetchMailTextData = async () => {
        try {
          const response = await fetch(`http://15.188.118.216:3001/${page}/klasirane/mailData/${path}/${compName}`);
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
            <a href = "mailto:snowtromgs@gmail.com">
              <img src={mail} alt="mail icon"></img>
            </a>
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
