import "../styles/Cell.css";

function Cell({ competitionName, seasonName, year, className }) {
  // Function to handle downloading the problem PDF
  const handleDownload = (pdfType) => {
    const url = `http://localhost:3001/competitions/${competitionName}/${seasonName}/${year}/${className}/${pdfType}`;
    // Trigger the download
    window.open(url, '_blank');
  };
  console.log(competitionName);
  console.log(seasonName);
  console.log(year);
  console.log(className);

  return (
    <div className="cell-wrapper">
        <div className="problem" onClick={() => handleDownload('problems')}>Задачи</div>
        <div className="solution" onClick={() => handleDownload('solutions')}>Отговори</div>
        <div className="video">Видеореш.</div>
    </div>
  );
}


export default Cell;
