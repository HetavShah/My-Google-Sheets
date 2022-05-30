let rows=100;
let columns=26;


let addressColCont=document.querySelector(".address-col-cont");

for(let i=0;i<rows;i++)
{
    let addressCol=document.createElement("div");
    addressCol.setAttribute("class","address-col")
    addressCol.innerText=i+1;
    addressColCont.appendChild(addressCol);
}
let addressRowCont=document.querySelector(".address-row-cont");

for(let i=0;i<columns;i++)
{
    let addressRow=document.createElement("div");
    addressRow.setAttribute("class","address-row");

    addressRow.innerText=String.fromCharCode(i+65);
    addressRowCont.appendChild(addressRow);

}

let cellsCont=document.querySelector(".cells-cont"); 

for(let i=0;i<rows;i++)
{
    let rowCont=document.createElement("div");
    rowCont.setAttribute("class","row-cont");
    for(let j=0;j<columns;j++)
    {
        let cell=document.createElement("div");
        cell.setAttribute("class","cell");
        cell.setAttribute("spellcheck","false");
        // Attributes for Cell Storage Identification
        cell.setAttribute("rid",i);
        cell.setAttribute("cid",j);
        cell.setAttribute("contenteditable","true");
        rowCont.appendChild(cell);
        addListnerForAddressBarDisplay(cell,i,j);
    }
    cellsCont.appendChild(rowCont);
}
let addressBar=document.querySelector(".address-bar")
function addListnerForAddressBarDisplay(cell,i,j)
{
   cell.addEventListener("click",(e)=>{
       let rowID=i+1;
       let ColumnID=String.fromCharCode(65+j);
       addressBar.value=`${ColumnID}${rowID}`;
       PreviousAddress=addressBar.value;
   })

   }

 

