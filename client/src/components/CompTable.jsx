import "../styles/CompTable.css";
import Cell from "./Cell"

function CompTable({years, classes, selectedSeason}) {

  const totalColumns = years.length+1; 
  const totalRows = classes.length+1; 

  const rowYears = years; 
  const columnNumbers = classes; 



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
      <div className="gridTable" style={{ gridTemplateColumns: `repeat(${totalColumns}, 1fr)`,  gridTemplateRows: `repeat(${totalRows}, 1fr)`}}>
        {cells.map((cell) => {
          const cellContent = getCellContent(cell);
          let cellClass = 'cell';
          if (cell.row === 0 && cell.column === 0) cellClass = 'start';
          else if (cell.row === 0) cellClass = 'row';
          else if (cell.column === 0) cellClass = 'column';

          return (
            <div key={cell.id} className={cellClass}>
              {cellClass === 'cell' ? <Cell competitionName={"OMT"} seasonName={selectedSeason} year={years[cell.column-1]} className={classes[cell.row-1]} /> : <label>{cellContent}</label>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CompTable;
