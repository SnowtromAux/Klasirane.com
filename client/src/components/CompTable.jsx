import "../styles/CompTable.css";
import Cell from "./Cell"

function CompTable() {

  const totalColumns = 20; 
  const totalRows = 10; 
  
  const rowYears = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005]; 
  const columnNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]; 

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
      <div className="gridTable">
        {cells.map((cell) => {
          const cellContent = getCellContent(cell);
          let cellClass = 'cell';
          if (cell.row === 0 && cell.column === 0) cellClass = 'start';
          else if (cell.row === 0) cellClass = 'row';
          else if (cell.column === 0) cellClass = 'column';

          return (
            <div key={cell.id} className={cellClass}>
              {cellClass === 'cell' ? <Cell content={cellContent} /> : <label>{cellContent}</label>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CompTable;
