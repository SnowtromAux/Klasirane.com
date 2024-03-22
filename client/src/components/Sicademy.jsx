import React from 'react';
import { useEffect , useState } from 'react';
import '../styles/Sicademy.css';

const Sicademy = (props) => {

    const { path , page} = props;
    const compName = props.compName || "";

    const [buttonTxt , setButtonTxt] = useState("");
    const [description , setDescription] = useState("");
    const [img  ,setImg] = useState("");
 
    
    useEffect(() => {
        const fetchButtonData = async () => {
          try {
            const response = await fetch(`https://klasirane.com/api/${page}/sicademy/button/${path}/${compName}`);
            const btn_txt = await response.text();
            setButtonTxt(btn_txt);
          } catch (error) {
            console.error('Error fetching button text:', error);
          }
        };
    
        const fetchDescriptionData = async () => {
          try {
            const response = await fetch(`https://klasirane.com/api/${page}/sicademy/description/${path}/${compName}`);
            const desc = await response.text();
            setDescription(desc);
          } catch (error) {
            console.error('Error fetching description:', error);
          }
        };
    
        const fetchLogoData = async () => {
          try {
            const response = await fetch(`https://klasirane.com/api/${page}/sicademy/logo/${path}/${compName}`);
            const blob = await response.blob();
            setImg(URL.createObjectURL(blob));
          } catch (error) {
            console.error('Error fetching logo:', error);
          }
        };
    
        fetchButtonData();
        fetchDescriptionData();
        fetchLogoData();
      }, [path]);


    return (
        <div id="sign-up-wrapper">
          <div id="sicademy-logo">
              <img src={img} alt="Sicademy Logo" />
          </div>
          <div id="sicademy-info">
              <label dangerouslySetInnerHTML={{ __html: description }}></label>
              <a href="https://www.sicademy.bg" target="_blank" rel="noopener noreferrer">
              <button id="sicademy-link" dangerouslySetInnerHTML={{ __html: buttonTxt }}></button>
              </a>
          </div>
        </div>
    );
};

export default Sicademy;
