import React, { useState, useEffect } from 'react';
import "../styles/Cell.css";

function Cell({ competitionName, seasonName, year, className }) {
  const [pdfAvailable, setPdfAvailable] = useState({ probs: false, sol: false });

  useEffect(() => {
    const checkAvailability = async (pdfType) => {
      const url = `http://localhost:3001/competitions/check/${competitionName}/${seasonName}/${year}/${className}/${pdfType}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setPdfAvailable(prev => ({ ...prev, [pdfType]: data.exists }));
      } catch (error) {
        console.error('Error checking PDF availability:', error);
      }
    };

    checkAvailability('probs');
    checkAvailability('sol');
  }, [competitionName, seasonName, year, className]);
  
  const handleDownload = (pdfType) => {
    if (!pdfAvailable[pdfType]) return;
    const url = `http://localhost:3001/competitions/${competitionName}/${seasonName}/${year}/${className}/${pdfType}`;
    
    window.open(url, '_blank');
  };

  return (
    <div className="cell-wrapper">
       <div className="problem" onClick={() => handleDownload('probs')}>
          {pdfAvailable.probs ? 'Задачи' : '-'}
        </div>
        <div className="solution" onClick={() => handleDownload('sol')}>
          {pdfAvailable.sol ? 'Отговори' : '-'}
        </div>
        <div className="video">Видеореш.</div>
    </div>
  );
}


export default Cell;
