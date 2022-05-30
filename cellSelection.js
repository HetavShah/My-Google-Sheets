let ctrlKey;
document.addEventListener("keyup", (e) => {
  ctrlKey = e.ctrlKey;
});
document.addEventListener("keydown", (e) => {
  ctrlKey = e.ctrlKey;
});

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
    handleSelectedCells(cell);
  }
}

let rangeStorage = [];
function handleSelectedCells(cell) {
  cell.addEventListener("click", (e) => {
    // Select Cells Range
    if (!ctrlKey) {
      if (rangeStorage.length === 1) {
        defaultSelectedCellsUI(rangeStorage);
        // console.log("Changing Range Storage Here");
        rangeStorage=[];
        
      }
      return;
    }
    if (rangeStorage.length >= 2) {
      defaultSelectedCellsUI(rangeStorage);
      rangeStorage = [];
    }

    let rid = Number(cell.getAttribute("rid"));
    let cid = Number(cell.getAttribute("cid"));
    rangeStorage.push([rid, cid]);
    // console.log(rangeStorage);
    SelectedCellsUI();
  });
}

function SelectedCellsUI() {
  
  defaultSelectedCellsUI();
  let [startRow, endRow, startCol, endCol] = getStartEndRowCol();
  // console.log(startRow,endRow,startCol,endCol);
  for (let i = startRow; i <= endRow; i++) {
    for (let j = startCol; j <= endCol; j++) {
      if (j === startCol) {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.style.borderLeft = "3px solid blue";
        cell.style.borderLeftStyle = "dotted";
      }

      if (i === startRow) {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.style.borderTop = "3px solid blue";
        cell.style.borderTopStyle = "dotted";
      }

      if (i === endRow) {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.style.borderBottom = "3px solid blue";
        cell.style.borderBottomStyle = "dotted";
      }

      if (j === endCol) {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.style.borderRight = "3px solid blue";
        cell.style.borderRightStyle = "dotted";
      }
    }
  }
  if (!isNaN(startRow) &&!isNaN(endRow) &&!isNaN(startCol) &&!isNaN(endCol)) {
    let startCell = `${String.fromCharCode(startCol + 65)}${startRow + 1}`;
    let endCell = `${String.fromCharCode(endCol + 65)}${endRow + 1}`;
    let selectedAddress;
    if(startCell!=endCell)
    {

       selectedAddress = `${startCell}:${endCell}`;
    }
    else
    {
      selectedAddress=`${startCell}`;
    }
    // console.log(startCell ,endCell);
    addressBar.value = selectedAddress;
  }
}

function getStartEndRowCol(RangeStorage=rangeStorage) {
  if (RangeStorage.length === 2) {
    let startRow = RangeStorage[0][0];
    let endRow = RangeStorage[1][0];
    let startCol = RangeStorage[0][1];
    let endCol = RangeStorage[1][1];
    if (RangeStorage[0][0] > RangeStorage[1][0]) {
      startRow = RangeStorage[1][0];
      endRow = RangeStorage[0][0];
    }
    if (RangeStorage[0][1] > RangeStorage[1][1]) {
      startCol = RangeStorage[1][1];
      endCol = RangeStorage[0][1];
    }
    return [startRow, endRow, startCol, endCol];
  } 
  else if(RangeStorage.length===0){
    // console.log(rangeStorage.length);
    return [];
  }
    
  else return [RangeStorage[0][0], RangeStorage[0][0], RangeStorage[0][1], RangeStorage[0][1]]
}

function defaultSelectedCellsUI() {
  let [startRow, endRow, startCol, endCol] = getStartEndRowCol();
  // console.log(startRow,endRow,startCol,endCol);

  for (let i = startRow; i <= endRow; i++) {
    for (let j = startCol; j <= endCol; j++) {
      let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
      cell.style.border = "1px solid #c0c0c0";
    }
  }
}

