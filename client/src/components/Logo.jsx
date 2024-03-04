import "../styles/Logo.css";
import logo from '../assets/klasirane-logo.png';

function App() {
  return (
    <div className = "logo-wrapper">
      <img src = {logo} alt = "klasirane-logo" onClick = {() => {window.location.href = "/"}}></img>
    </div>

  );
}

export default App;
