import React, { useState, useEffect } from 'react';
import "../styles/Cell.css";

function Cell({ competitionName, seasonName, year, className }) {
  const [pdfAvailable, setPdfAvailable] = useState({ probs: false, sol: false });
  const [videoAvailable, setVideoAvailable] = useState(true);

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
    const checkVideoAvailability = async () => {

      console.clear();
      console.log(competitionName , seasonName , year , className)

      const encodedCompetitionName = encodeURIComponent(competitionName);
      const encodedSeasonName = encodeURIComponent(seasonName);
      const encodedYear = encodeURIComponent(year);
      const encodedClassName = encodeURIComponent(className);
      // const url = `http://localhost:3001/competitions/checkVideo/${encodedCompetitionName}/${encodedSeasonName}/${encodedYear}/${encodedClassName[0]}`;
      const url = `http://localhost:3001/competitions/getvid/${competitionName}/${seasonName}/${year}/${className}/go`;

      try {
        const response = await fetch(url);
        if (response.ok) {
          const isAvailable = await response.json(); 
          setVideoAvailable(isAvailable.available);
        } else {
          throw new Error('Failed to check video availability');
        }
      } catch (error) {
        console.error('Error checking video availability:', error);
        setVideoAvailable(false); // Assume not available if there's an error
      }
    };

    checkAvailability('probs');
    checkAvailability('sol');
    checkVideoAvailability();
  }, [competitionName, seasonName, year, className]);
  
  const handleDownload = (pdfType) => {
    if (!pdfAvailable[pdfType]) return;
    const url = `http://localhost:3001/competitions/${competitionName}/${seasonName}/${year}/${className}/${pdfType}`;
    
    window.open(url, '_blank');
  };

  const openVideo = async () => {
    const vidUrl = `http://localhost:3001/competitions/get/${competitionName}/${seasonName}/${year}/${className}/videolink`;
    try {
      const response = await fetch(vidUrl);
      const videoUrl = await response.text();
      if (videoUrl) window.open(videoUrl, '_blank');
      else console.log('No video URL found');
    } catch (error) {
      console.error('Error fetching video URL:', error);
    }
  };

  return (
    <div className="cell-wrapper">
       <div className="problem" onClick={() => handleDownload('probs')}>
          {pdfAvailable.probs ? 'Задачи' : '-'}
        </div>
        <div className="solution" onClick={() => handleDownload('sol')}>
          {pdfAvailable.sol ? 'Отговори' : '-'}
        </div>
        <div className="video" onClick={videoAvailable ? openVideo : undefined}>
            {videoAvailable ? 'Видеореш.' : '-'}
        </div>
    </div>
  );
}


export default Cell;
