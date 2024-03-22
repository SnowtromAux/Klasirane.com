import "../styles/Footer.css";
import img from '../assets/facebook-icon-white.png';
import { Link } from 'react-router-dom';
// import mail from '../assets/mail.png';

function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="footer-top">
        <a href = 'https://www.facebook.com/klasirane/' target = "_blank" rel="noreferrer">

          <div className="footer-facebook">
            <div className="footer-facebook-img">
              <img src={img} alt="competition icon"></img>
            </div>
            <label>Последвайте ни!</label>
          </div>

        </a>
      </div>
      <div className="footer-middle">
        <div><a href="mailto:contact@klasirane.com" style={{ color: 'black' }}>Контакт</a></div>
        <div><Link to="/privacy-policy" style={{ color: 'black' }}>Политика за поверителност</Link></div>
        <div><Link to="/cookies" style={{ color: 'black' }}>Бисквитки</Link></div>
        <div><a href = "https://www.instagram.com/_alexdimitrow_/" style = {{textDecoration: "none" , color: 'black'}}></a></div>
      </div>
    </div>

  );
}

export default Footer;
