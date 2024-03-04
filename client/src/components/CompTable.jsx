import "../styles/CompTable.css";
import Cell from "./Cell";
import React, { useState, useEffect } from 'react';

function CompTable({compName, years, classes, selectedSeason}) {

  const reversedYears = [...years].reverse(); 

  const sortedClasses = classes.sort((a, b) => {
    const numA = parseInt(a, 10); 
    const numB = parseInt(b, 10); 
    return numA - numB; 
  });

  const totalColumns = reversedYears.length+1; 
  const totalRows = classes.length+1; 

  const rowYears = reversedYears; 
  
  const columnNumbers = sortedClasses; 



  const cells = Array.from({ length: totalColumns * totalRows }, (_, index) => {
    const row = Math.floor(index / totalColumns);
    const column = index % totalColumns;
    return { id: index + 1, row, column };
  });

  // useEffect(() => {
  //   const checkAndFixElement = () => {
  //     const position = window.scrollY;
  //     const start_el = document.getElementsByClassName("start")[0];
  //     const table_el = document.getElementsByClassName("gridTable")[0];
  //     const y = start_el.getBoundingClientRect().top + position; 
  //     const height = table_el.getBoundingClientRect().height;
  //     const rowElements = document.getElementsByClassName("row");

      
  //   };

  //   window.addEventListener('scroll', checkAndFixElement);

  //   // Clean-up function
  //   return () => {
  //     window.removeEventListener('scroll', checkAndFixElement);
  //   };
  // }, []); 

  const getCellContent = (cell) => {
    if (cell.row === 0 && cell.column === 0) {
      return 'Години:'; 
    } else if (cell.row === 0) {
    
      return rowYears[cell.column - 1] || '';
    } else if (cell.column === 0) {
      
      return columnNumbers[cell.row - 1] || ''; 
    }
    return cell.id;
  };

  return (
    <div className='gridTable-container'>
      <div className="gridTable" style={{ gridTemplateColumns: `repeat(${totalColumns}, min-content)`,  gridTemplateRows: `repeat(${totalRows}, 150px)`}}>
        {cells.map((cell) => {
          const cellContent = getCellContent(cell);
          let cellClass = 'cell';
          if (cell.row === 0 && cell.column === 0) cellClass = 'start';
          else if (cell.row === 0) cellClass = 'row';
          else if (cell.column === 0) cellClass = 'column';

          return (
            <div key={cell.id} className={cellClass}>
              {cellClass === 'cell' ? <Cell competitionName={compName} seasonName={selectedSeason} year={reversedYears[cell.column-1]} className={sortedClasses[cell.row-1]} /> : <label>{cellContent}</label>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CompTable;
