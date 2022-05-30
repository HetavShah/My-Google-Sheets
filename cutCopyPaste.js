
let  copyBtn=document.querySelector(".copy");
let  cutBtn=document.querySelector(".cut");
let  pasteBtn=document.querySelector(".paste");





let copyData=[]; 

copyBtn.addEventListener("click",(e)=>{
   
    CopyDataFun();
  
});


function CopyDataFun(){
    // console.log(rangeStorage.length);
    copyData=[];

    // console.log("Data Copy");
    // if(rangeStorage.length<2)return;

    let [startRow,endRow,startCol,endCol]=getStartEndRowCol();

    for(let i=startRow;i<=endRow;i++){
        let copyRow=[];
        for(let j=startCol;j<=endCol;j++)
        {
            let cellProp={...sheetDB[i][j]};// Copied Object Using Spread Cuz If we Use = then It will copy Pointer to that memory Location
            // console.log(cellProp);
            copyRow.push(cellProp);
        }
        copyData.push(copyRow);
    }
    // console.log(copyData);
    // console.log(rangeStorage);
defaultSelectedCellsUI();
}


cutBtn.addEventListener("click",(e)=>{
 CopyDataFun();
//  console.log("Before Running The For Loop",copyData);
 let [startRow,endRow,startCol,endCol]=getStartEndRowCol();
 for(let i=startRow;i<=endRow;i++)
{
 for(let j=startCol;j<=endCol;j++)
 {
    let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
    let cellProp=sheetDB[i][j];
    cellProp.bold=false;
    cellProp.italic=false;
    cellProp.underline=false;
    cellProp.alignment= "left";
    cellProp.fontFamily= "monospace";
    cellProp.fontSize="14";
    cellProp.fontColor="#000000";
    cellProp.BGColor= "#f8f9fa"; // Just for Indication
    cellProp.value= "";
    cellProp.formula= "";
    cellProp.child=[];
    cell.click();

 }

}
// console.log("Before Starting of For loop",copyData);
// console.log("After Ending of For loop",copyData);
//  console.log("End of 2 for loop",copyData);

})




pasteBtn.addEventListener("click",(e)=>{
    let TargetAddress=addressBar.value;
    // console.log(TargetAddress);
    let [rid,cid]=decodeRIDCIDFromAddress(TargetAddress);
    let [startRow,endRow,startCol,endCol]=getStartEndRowCol();
    let TargetStartRow=rid;
    let TargetEndRow=rid+(endRow-startRow);
    let TargetStartCol=cid;
    let TargetEndCol=cid+(endCol-startCol);
    // console.log(startRow,endRow,startCol,endCol);
    // console.log(TargetStartRow,TargetEndRow,TargetStartCol,TargetEndCol);

    // r-> copydata row
    // c-> copydata column
    for(let i=TargetStartRow,r=0;i<=TargetEndRow;i++,r++)
    {
        for(let j=TargetStartCol,c=0;j<=TargetEndCol;j++,c++)
        {
            let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            if(!cell) continue;
            // DB change
            // let data={...copyData[r][c]};
            let cellProp=sheetDB[i][j]; 
           sheetDB[i][j]={...copyData[r][c]};
        //    console.log("Location Data",cellProp);
        //    console.log("Copied Data" ,data);
           sheetDB[i][j].formula="";
           sheetDB[i][j].child=[];

           // UI change

           cell.click();

            
        }
       
    }

    rangeStorage=[];
})

