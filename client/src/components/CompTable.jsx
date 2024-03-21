import "../styles/CompTable.css";
import Cell from "./Cell";
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';


function CompTable({compName, compTable, years, classes, selectedSeason}) {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (compTable) {
      setIsLoading(false);
    }
  }, [compTable]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  let reversedYears = {};
  if(compName == "RAT"){
    reversedYears = years.sort((a, b) => {
      const numA = parseInt(a, 10); 
      const numB = parseInt(b, 10); 
      return numA - numB; 
    });
  }
  else{
    reversedYears = [...years].reverse(); 
  }

  const sortedClasses = classes.sort((a, b) => {
    const numA = parseInt(a, 10); 
    const numB = parseInt(b, 10); 
    return numA - numB; 
  });

  const totalColumns = reversedYears.length+1; 
  const totalRows = classes.length+1; 

  const rowYears = reversedYears; 
  
  const columnNumbers = sortedClasses; 

  const keywords = compName.split(" ").map(word => word.toLowerCase()).join(", ");
  
  const cells = Array.from({ length: totalColumns * totalRows }, (_, index) => {
    const row = Math.floor(index / totalColumns);
    const column = index % totalColumns;
    return { id: index + 1, row, column };
  });

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
      <Helmet>
        <meta name="keywords" content={`${keywords}`} />
        <meta name="description" content={`Задачи, Решения и Отговори от състезание по математика ${compName} | Klasirane.com`} />
      </Helmet>
      <div className="gridTable" style={{ gridTemplateColumns: `repeat(${totalColumns}, min-content)`,  gridTemplateRows: `repeat(${totalRows}, 150px)`}}>
        {cells.map((cell) => {
          const cellContent = getCellContent(cell);
          let cellClass = 'cell';
          if (cell.row === 0 && cell.column === 0) cellClass = 'start';
          else if (cell.row === 0) cellClass = 'row';
          else if (cell.column === 0) cellClass = 'column';

          const isDataCell = cell.row > 0 && cell.column > 0;
          let cellData = isDataCell ? compTable[reversedYears[cell.column - 1]][sortedClasses[cell.row - 1]] : null;

          return (
            <div key={cell.id} className={cellClass}>
              {cellClass === 'cell' ? <Cell competitionName={compName} cellData = {cellData} seasonName={selectedSeason} year={reversedYears[cell.column-1]} className={sortedClasses[cell.row-1]} /> : <label>{cellContent}</label>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CompTable;
