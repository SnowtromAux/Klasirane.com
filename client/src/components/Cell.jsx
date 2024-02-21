import "../styles/Cell.css";

function Cell({content}) {
  return (
    <div className = "cell-wrapper">
        <div className="problem">Задачи</div>
        <div className="solution">Отговори</div>
        <div className="video">Видеореш.</div>
        
    </div>

  );
}

export default Cell;
