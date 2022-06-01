
let activeSheetColor = "#ced6e0";
let sheetsFolderCont = document.querySelector(".sheets-folder-cont");
let addSheetBtn = document.querySelector(".sheet-add-icon");
let PreviousAddress;
let PreviousSheetIdx=0;
let sheetIdx=0;
let canvasIdx;
addSheetBtn.addEventListener("click", (e) => {
  let sheet = document.createElement("div");
  sheet.setAttribute("class", "sheet-folder");

  let allSheetFolders = document.querySelectorAll(".sheet-folder");
  sheet.setAttribute("id", allSheetFolders.length);

  sheet.innerHTML = `
        <div class="sheet-content">Sheet-${allSheetFolders.length + 1}</div>
    `;

  sheetsFolderCont.appendChild(sheet);
  sheet.scrollIntoView();
  // DB
  createSheetDB();
  handleSheetRemoval(sheet);
  handleSheetActiveness(sheet);
  sheet.click();
});


function handleSheetRemoval(sheet)
{
  sheet.addEventListener("mousedown" ,(e)=>{

    if(e.button!==2) return
    let allSheetFolders = document.querySelectorAll(".sheet-folder");

    if(allSheetFolders.length===1)
    {
      alert("You Need To Have At least 1 Sheet")
      return ;
    }

    let response=confirm("Your Sheet Will be Removed Permenently Are you Sure ?");

    if(response)
    {
      let removedsheetIdx=Number(sheet.getAttribute("id"));
      collectedSheetDB.splice(removedsheetIdx,1);
      collectedChartDB.splice(removedsheetIdx,1);
      // console.log(collectedChartDB);  
      removeSheetChart(removedsheetIdx);
      resetCanvasId();
      handleSheetUIRemoval(sheet);
      // By default Assign sheetDB to 1st Sheet;
       sheetDB=collectedSheetDB[0];
       chartDB=collectedChartDB[0];
       handleSheetProperties();
       canvasIdx=0;
       showSheetChart(canvasIdx);
       let currentSheet=document.querySelector(`.sheet-folder[id="${0}"]`);
       currentSheet.click();

    }


  })
}

function handleSheetDB(sheetIdx)
{
  sheetDB=collectedSheetDB[sheetIdx];
}

function handleChartDB(sheetIdx)
{
  chartDB=collectedChartDB[sheetIdx];
}

function handleSheetUIRemoval(sheet)
{

    // UI remove
    sheet.remove();
    let allSheetsFolders = document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allSheetsFolders.length;i++)
    {
      allSheetsFolders[i].setAttribute("id",i);
      let sheetContent=allSheetsFolders[i].querySelector(".sheet-content");
      sheetContent.innerText=`Sheet-${i+1}`;
      allSheetsFolders[i].style.backgroundColor="transparent";
    }

    allSheetsFolders[0].style.backgroundColor=activeSheetColor;


}



function handleSheetUI(sheet)
{
  let allSheetsFolders=document.querySelectorAll(".sheet-folder");
  for(let i=0;i<allSheetsFolders.length;i++)
  {
    allSheetsFolders[i].style.backgroundColor="transparent"
  }
  sheet.style.backgroundColor=activeSheetColor;
}



function handleSheetProperties()
{
  for(let i=0;i<rows;i++)
  {
    for(let j=0;j<columns;j++)
    {
      let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
      cell.click();
    }
  }
    // By default click on first cell
let firstCell=document.querySelector(".cell");
firstCell.click();
let addressBar=document.querySelector(".address-bar");
PreviousAddress=addressBar.value;

};




function handleSheetActiveness(sheet)
{
  
  sheet.addEventListener("click",(e)=>{
      canvasIdx=sheetIdx;
      hideSheetChart(canvasIdx);
      sheetIdx=Number(sheet.getAttribute("id"));
      canvasIdx=sheetIdx;
      // console.log(canvasIdx);
     handleSheetDB(sheetIdx);
     handleChartDB(sheetIdx);
     handleSheetProperties();
     handleSheetUI(sheet);
     showSheetChart(canvasIdx);
   })
}



function createSheetDB() {
  let sheetDB = [];
  for (let i = 0; i < rows; i++) {
    let sheetRow = [];
    for (let j = 0; j < columns; j++) {
      let cellProp = {
        bold: false,
        italic: false,
        underline: false,
        alignment: "left",
        fontFamily: "monospace",
        fontSize: "14",
        fontColor: "#000000",
        BGColor: "#f8f9fa", // Just for Indication
        value: "",
        formula: "",
        child: [],
      };
      sheetRow.push(cellProp);
    }

    sheetDB.push(sheetRow);
  }

  collectedSheetDB.push(sheetDB);
  collectedChartDB.push([]);
  
}


  

