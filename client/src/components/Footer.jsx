import "../styles/Footer.css";
import img from '../assets/facebook-icon-white.png';
// import mail from '../assets/mail.png';

function App() {
  return (
    <div className="footer-wrapper">
      <div className="footer-top">
        <div className="footer-facebook">
          <div className="footer-facebook-img" onClick={() => window.location.href = 'https://www.facebook.com/klasirane/'}>
            <img src={img} alt="competition icon"></img>
          </div>
          <label>Последвайте ни!</label>
        </div>
      </div>
      <div className="footer-middle">
        <div>Контакт</div>
        <div>Политика за поверителност</div>
        <div>Бисквитки</div>
      </div>
    </div>

  );
}

export default App;
