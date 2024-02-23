import "../styles/Cell.css";

function Cell({ competitionName, seasonName, year, className }) {
  // Function to handle downloading the problem PDF
  const handleDownload = (pdfType) => {
    const url = `http://localhost:3001/competitions/${competitionName}/${seasonName}/${year}/${className}/${pdfType}`;
    // Trigger the download
    window.open(url, '_blank');
  };

  return (
    <div className="cell-wrapper">
        <div className="problem" onClick={() => handleDownload('probs')}>Задачи{seasonName}</div>
        <div className="solution" onClick={() => handleDownload('sol')}>Отговори</div>
        <div className="video">Видеореш.</div>
    </div>
  );
}


export default Cell;
