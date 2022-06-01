let collectedChartDB=[];
let chartDB=[];
// Storage
let collectedSheetDB = [];
let sheetDB = [];


{
  let addSheetBtn = document.querySelector(".sheet-add-icon");
   addSheetBtn.click();
   
}
  // Selectors for cell Properties
  
let AllCells=document.querySelectorAll(".cell");
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let BGColor = document.querySelector(".background-color-prop");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

let activeColorprop = "#d1d8e0";
let inactiveColorprop = "#ecf0f1";


// attach property Listener

// 2-way Binding
// let addressBar=document.querySelector(".address-bar");
bold.addEventListener("click", (e) => {
  let address = addressBar.value;
  let addressRange=address.split(":");
  // console.log(addressRange);
  if(addressRange.length===2)
  {
    let [startRow,endRow,startCol,endCol]=getStartEndRowCol();

    for(let i=startRow;i<=endRow;i++)
    {
      for(let j=startCol;j<=endCol;j++)
      {
        let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        let cellProp=sheetDB[i][j];
        cellProp.bold = !cellProp.bold; // Data change
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; //UI change
        bold.style.backgroundColor = cellProp.bold
        ? activeColorprop
        : inactiveColorprop;

      }
    }
  }

  else
  {
    let [cell, cellProp] = activecell(address);

    // Modification
    cellProp.bold = !cellProp.bold; // Data change
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; //UI change
    bold.style.backgroundColor = cellProp.bold
      ? activeColorprop
      : inactiveColorprop;
  }
 
});


italic.addEventListener("click", (e) => {
  let address = addressBar.value;
  let addressRange=address.split(":");
  // console.log(addressRange);
  if(addressRange.length===2)
  {
    let [startRow,endRow,startCol,endCol]=getStartEndRowCol();

    for(let i=startRow;i<=endRow;i++)
    {
      for(let j=startCol;j<=endCol;j++)
      {
        let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        let cellProp=sheetDB[i][j];
        cellProp.italic = !cellProp.italic; // Data change
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; //UI change
        italic.style.backgroundColor = cellProp.italic
        ? activeColorprop
        : inactiveColorprop;

      }
    }
  }

  else
  {
    let [cell, cellProp] = activecell(address);

    // Modification
    cellProp.italic = !cellProp.italic; // Data change
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; //UI change
    italic.style.backgroundColor = cellProp.italic
      ? activeColorprop
      : inactiveColorprop;
  }
});


underline.addEventListener("click", (e) => {
  let address = addressBar.value;
  let addressRange=address.split(":");
  // console.log(addressRange);
  if(addressRange.length===2)
  {
    let [startRow,endRow,startCol,endCol]=getStartEndRowCol();

    for(let i=startRow;i<=endRow;i++)
    {
      for(let j=startCol;j<=endCol;j++)
      {
        let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        let cellProp=sheetDB[i][j];
        cellProp.underline = !cellProp.underline; // Data change
        cell.style.textDecoration = cellProp.underline ? "underline" : "none"; //UI change
        underline.style.backgroundColor = cellProp.underline
        ? activeColorprop
        : inactiveColorprop;

      }
    }
  }

  else
  {
    let [cell, cellProp] = activecell(address);

    // Modification
    cellProp.underline = !cellProp.underline; // Data change
    cell.style.textDecoration = cellProp.underline ? "underline" : "none"; //UI change
    underline.style.backgroundColor = cellProp.underline
      ? activeColorprop
      : inactiveColorprop;
  }
});


fontSize.addEventListener("change", (e) => {

  let address = addressBar.value;
  let addressRange=address.split(":");
  // console.log(addressRange);
  if(addressRange.length===2)
  {
    let [startRow,endRow,startCol,endCol]=getStartEndRowCol();

    for(let i=startRow;i<=endRow;i++)
    {
      for(let j=startCol;j<=endCol;j++)
      {
        let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        let cellProp=sheetDB[i][j];
        cellProp.fontSize = fontSize.value; // Data change
        cell.style.fontSize = cellProp.fontSize + "px"; //UI change

      }
    }
  }
  else{
    let [cell, cellProp] = activecell(address);
    cellProp.fontSize = fontSize.value;
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;
  }

});



fontFamily.addEventListener("change", (e) => {
  let address = addressBar.value;
  let addressRange=address.split(":");
  // console.log(addressRange);
  if(addressRange.length===2)
  {
    let [startRow,endRow,startCol,endCol]=getStartEndRowCol();

    for(let i=startRow;i<=endRow;i++)
    {
      for(let j=startCol;j<=endCol;j++)
      {
        let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        let cellProp=sheetDB[i][j];
        cellProp.fontFamily =fontFamily.value; // Data change
        cell.style.fontFamily = cellProp.fontFamily; //UI change

      }
    }
  }
  else{
    let [cell, cellProp] = activecell(address);
    cellProp.fontFamily = fontFamily.value;
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
  }
});

fontColor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let addressRange=address.split(":");
  // console.log(addressRange);
  if(addressRange.length===2)
  {
    let [startRow,endRow,startCol,endCol]=getStartEndRowCol();

    for(let i=startRow;i<=endRow;i++)
    {
      for(let j=startCol;j<=endCol;j++)
      {
        let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        let cellProp=sheetDB[i][j];
        cellProp.fontColor =fontColor.value; // Data change
        cell.style.fontColor = cellProp.fontColor; //UI change
        cell.click();

      }
    }
    defaultSelectedCellsUI();
    rangeStorage=[];
  }
  else{
    let [cell, cellProp] = activecell(address);
    cellProp.fontColor = fontColor.value;
    cell.style.fontColor = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
  }
});


BGColor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let addressRange=address.split(":");
  // console.log(addressRange);
  if(addressRange.length===2)
  {
    let [startRow,endRow,startCol,endCol]=getStartEndRowCol();

    for(let i=startRow;i<=endRow;i++)
    {
      for(let j=startCol;j<=endCol;j++)
      {
        let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        let cellProp=sheetDB[i][j];
        cellProp.BGColor =BGColor.value; // Data change
        cell.style.BGColor = cellProp.BGColor; //UI change
        cell.click();

      }
    }
    defaultSelectedCellsUI();
    rangeStorage=[];
  }
  else{
    let [cell, cellProp] = activecell(address);
    cellProp.BGColor = BGColor.value;
    cell.style.BGColor = cellProp.BGColor;
    BGColor.value = cellProp.BGColor;
    cell.click();
  }
});


alignment.forEach((alignElem) => {
  alignElem.addEventListener("click", (e) => {

    let address = addressBar.value;
    let addressRange=address.split(":");
    let alignValue=e.target.classList[0];

    if(addressRange.length===2)
    {
      let [startRow,endRow,startCol,endCol]=getStartEndRowCol();
      for(let i=startRow;i<=endRow;i++)
    {
      for(let j=startCol;j<=endCol;j++)
      {
        let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        // console.log(cell,i,j);
        let cellProp=sheetDB[i][j];
        cellProp.alignment=alignValue;
        cell.style.textAlign=cellProp.alignment;

      }
    }  
    }

    else{
      let [cell, cellProp] = activecell(address);
      // console.log(alignValue);
      cellProp.alignment = alignValue; // Data change
      cell.style.textAlign = cellProp.alignment; // UI change(1)
    }

    switch (alignValue) {
      case "left":
        leftAlign.style.backgroundColor = activeColorprop;
        centerAlign.style.backgroundColor = inactiveColorprop;
        rightAlign.style.backgroundColor = inactiveColorprop;
        break;
      case "center":
        leftAlign.style.backgroundColor = inactiveColorprop;
        centerAlign.style.backgroundColor = activeColorprop;
        rightAlign.style.backgroundColor = inactiveColorprop;
        break;
      case "right":
        leftAlign.style.backgroundColor = inactiveColorprop;
        centerAlign.style.backgroundColor = inactiveColorprop;
        rightAlign.style.backgroundColor = activeColorprop;
        break;
    }

  });
});


for(let i=0;i<AllCells.length;i++)
{
    AddListenerToAttachCellProperties(AllCells[i]);
}


function AddListenerToAttachCellProperties(cell){
  cell.addEventListener("click",(e)=>{
   let address=addressBar.value;
  //  console.log(address);
   let [rid,cid]= decodeRIDCIDFromAddress(address);
   let cellProp=sheetDB[rid][cid];
  //  console.log("clicking on",address,cellProp);

        //  cell properties
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "none";
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGColor;
        cell.style.textAlign = cellProp.alignment;
        cell.innerText=cellProp.value;
        
        // UI Properties
        bold.style.backgroundColor = cellProp.bold ? activeColorprop : inactiveColorprop;
        fontSize.value = cellProp.fontSize;
        fontFamily.value = cellProp.fontFamily;
        formulaBar.value=cellProp.formula===""?cellProp.value:cellProp.formula;
        italic.style.backgroundColor = cellProp.italic ? activeColorprop : inactiveColorprop;       
        underline.style.backgroundColor = cellProp.underline ? activeColorprop : inactiveColorprop;
        fontColor.value = cellProp.fontColor;
        BGColor.value = cellProp.BGColor;
        switch (cellProp.alignment) {
            case "left":
              leftAlign.style.backgroundColor = activeColorprop;
              centerAlign.style.backgroundColor = inactiveColorprop;
              rightAlign.style.backgroundColor = inactiveColorprop;
              break;
            case "center":
              leftAlign.style.backgroundColor = inactiveColorprop;
              centerAlign.style.backgroundColor = activeColorprop;
              rightAlign.style.backgroundColor = inactiveColorprop;
              break;
            case "right":
              leftAlign.style.backgroundColor = inactiveColorprop;
              centerAlign.style.backgroundColor = inactiveColorprop;
              rightAlign.style.backgroundColor = activeColorprop;
              break;
          }
        
    })


}


function activecell(address) {
  let [rid, cid] = decodeRIDCIDFromAddress(address);
  // Access Cell And Storage Object
  let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
  let cellProp = sheetDB[rid][cid];
  return [cell, cellProp];
}

function decodeRIDCIDFromAddress(address) {
  // address -> "A1";
  let decodedAddress=address.split(":");
  if(decodedAddress.length===2)
  {
    let rid=Number(decodedAddress[1].slice(1))-1;
    let cid = Number(decodedAddress[1].charCodeAt(0)) - 65;
    return [rid,cid];
  }

  let rid = Number(address.slice(1)) - 1;
  let cid = Number(address.charCodeAt(0)) - 65;
  return [rid, cid];
}

addressBar.addEventListener("keydown",(e)=>{

  if(e.key=="Enter")
  {
    if(addressBar.value)
    {
      let address=addressBar.value;
      // console.log("Value Of Address",address);
      if(isValidAddress(address))
      {
        PreviousAddress=address;
        // console.log(PreviousAddress);
        defaultSelectedCellsUI();
        rangeStorage=[];
        decodedAddress=address.split(":");
        for(let i=0;i<decodedAddress.length;i++)
        {
          let [rid,cid]=decodeRIDCIDFromAddress(decodedAddress[i]);
          // console.log(rid,cid);
          rangeStorage.push([rid,cid]);
        }
        // console.log(rangeStorage);
        SelectedCellsUI();
      }
      else{
        // console.log(PreviousAddress);
        addressBar.value=PreviousAddress;
      }

    }
    else{
      // console.log(PreviousAddress);
      addressBar.value=PreviousAddress;
    }
  }
})

function isValidAddress(address)
{
  let decodedAddress=address.split(":");
  // console.log(decodedAddress);
  for(let i=0;i<decodedAddress.length && decodedAddress.length<=2;i++)
  {
     let [rid,cid]=decodeRIDCIDFromAddress(decodedAddress[i]);

     if(!(rid>=0 && rid<=rows && cid<=columns && cid>=0))
     {
       return false;
     }


  }
  return true;
}
