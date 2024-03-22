import React, { useState, useEffect } from 'react';
import "../styles/Cell.css";

function Cell({ competitionName, cellData, seasonName, year, className }) {
  
  const pdfAvailable = {
    probs: cellData['probs.pdf'],
    sol: cellData['sol.pdf'],
    rat: cellData['rat.pdf']
  };

  const videoAvailable = cellData['video.txt'];
  const handleDownload = (pdfType) => {
    if (!pdfAvailable[pdfType]) return;
    const url = `https://klasirane.com/api/competitions/${competitionName}/${seasonName}/${year}/${className}/${pdfType}`;
    
    window.open(url, '_blank');
  };

  const openVideo = async () => {
    const vidUrl = `https://klasirane.com/api/competitions/get/${competitionName}/${seasonName}/${year}/${className}/videolink`;
    try {
      const response = await fetch(vidUrl);
      const videoUrl = await response.text();
      if (videoUrl) window.open(videoUrl, '_blank');
      // else console.log('No video URL found');
    } catch (error) {
      console.error('Error fetching video URL:', error);
    }
  };

  return (
    <div className="cell-wrapper">
      {pdfAvailable.rat ? (
          <div className='rat' onClick={() => handleDownload('rat')}>
            Рейтинг
          </div>
      ) : (
          <div className='cell-content'>
          <div className="problem" onClick={() => handleDownload('probs')}>
            <div className='problem-text'>
              {pdfAvailable.probs ? 'Задачи' : '-'}
            </div>
          </div>
          <div className="solution" onClick={() => handleDownload('sol')}>
              {pdfAvailable.sol ? 'Реш/Отг' : '-'}
          </div>
          <div className="video" onClick={videoAvailable ? openVideo : undefined}>
              {videoAvailable ? 'Видеореш.' : '-'}
          </div>
        </div>
      )}
    </div>
  );
}


export default Cell;
