import "../styles/HomeNew.css";
import img from '../assets/test-image-1.png';
import mail from '../assets/mail.png';

function App() {
  return (
    <div className="homenew-wrapper">
      <div className="homenew-top">
        <div>
          <img src={img} alt="competition icon"></img>
        </div>

        <label>Klasirane - библиотека със задачи от национални и международни математически състезания</label>
      </div>
      <div className="homenew-middle">
        <label>Има лъч светлина в училищата и образованието ни. Имаме предвид все по-голямата популярност, която придобива Математиката. Все повече деца имат желание да премерят сили със съучениците си и да участват в математически състезания и турнири. <br /><br />Този сайт е създаден за да помага на всички малки математици. В него ще намерите много Задачи, Решения и Отговори от различни математически състезания. Като започнем от покриващите учебния материал Коледно Математическо Състезание или Великденско Математическо Състезание, минем през любимите на математиците англоезично Австралийско Кенгуру или турнирът Черноризец Храбър и стигнем до Международната Олимпиада по Математика, която обхваща материал, който не се изучава и в Университета. <br /><br />Klasirane предлага много задачи и решения от повече от 30 национални и международни състезания и турнири по математика. Навигацията на сайта предоставя възможност за избор на математически задачи от дадено състезание или избор на задачи за съответен клас, като във втория случай ще получите сортирани резултати от всички състезания, които се провеждат за интересуващия ви клас. <br /><br />Както сами разбирате, електронната библиотека със задачи по математика Klasirane е в процес на непрекъснато изграждане и обновяване. Събирането на богата база от задачи от математически състезания е сериозен ангажимент, но ние имаме вярата и амбицията да създадем обширен архив със задачи и решения от реномирани състезания и турнири, който да помага на децата математици. За това разбира се можете да помогнете и вие - </label>
      </div>
      <div className="homenew-bottom">
        <div className="homenew-mail">
          <img src={mail} alt="mail icon"></img>
        </div>
        <div className="homenew-mail-text">Mоля, изпращайте ни задачи или решения от интересни състезания, за които виждате, че не са качени на този сайт.</div>
      </div>
    </div>

  );
}

export default App;
