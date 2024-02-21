import "../styles/Cell.css";

function Cell({pdfFile}) {
  const handleDownload = () => {
    if (pdfFile) {
      // Assuming 'pdfFile' is a direct URL to the PDF
      window.location.href = pdfFile;
    }
  };
  return (
    <div className = "cell-wrapper">
        <div className="problem" onClick={handleDownload}>Задачи</div>
        <div className="solution">Отговори</div>
        <div className="video">Видеореш.</div>
        
    </div>

  );
}

export default Cell;
