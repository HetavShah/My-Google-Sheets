
let availableFunctions=["SUM","SUB","MUL","INTERPOLATE"]
let arrExp=[];

for(let i=0;i<rows;i++)
 {
     for(let j=0;j<columns;j++)
     {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur",(e)=>{
            let address=addressBar.value;
            let [activeCell,cellProp]=activecell(address);
            let enteredData=activeCell.innerText;
            if(enteredData==cellProp.value) return;
            cellProp.value=enteredData;
            // console.log("Removing Child");
            RemoveChildToParent(cellProp.formula);
            cellProp.formula="";
            updateChildrenCells(address);
            // console.log(" Manually Changed Cell Value of Cell : ",address,sheetDB);
        })
     }
 }

 let formulaBar=document.querySelector(".formula-bar");
 formulaBar.addEventListener("keydown",(e)=>{
     let inputFormula=formulaBar.value;
     if(e.key==="Enter" && formulaBar.value)
     {  
         let address=addressBar.value;
         let [cell,cellProp]=activecell(address);
         // If change in Formula then remove Old Parent-children relation and add new Parent children relation
         if(inputFormula!==cellProp.formula) RemoveChildToParent(cellProp.formula);


        let evaluatedValue=evaluateFormula(inputFormula);
        setCellUIAndCellProp(evaluatedValue,inputFormula,address);
        AddChildToParent(inputFormula);
        // console.log(sheetDB);
        updateChildrenCells(address); 
        // console.log(sheetDB);

     }
 })

function evaluateExpression(formula)
{
    let encodedFormula=formula.split(" ");
// console.log(formula);
    for(let i=0;i<encodedFormula.length;i++)
    {
        if(isValidAddress(encodedFormula[i]))
        {
            // console.log(encodedFormula[i]);
            let [rid,cid]= decodeRIDCIDFromAddress(encodedFormula[i]);
            let cellProp=sheetDB[rid][cid];
            encodedFormula[i]=cellProp.value;
        }
        
    }
   encodedFormula= encodedFormula.toString().replace(/,/g,"");
//    console.log(encodedFormula);
   let trueFormula=encodedFormula.replace(/[^-()\d/*+.]/g, '');
//    console.log("Formula2",formula2);
   if(trueFormula===encodedFormula)
   {
       try{
           return eval(encodedFormula);
       }
       catch{
        encodedFormula="ERROR";
        return encodedFormula;
       }
   }
   else 
   {
      encodedFormula="ERROR";
      return encodedFormula;
   }
}



function setCellUIAndCellProp(evaluatedValue,formula,address){
    let [cell,cellProp]=activecell(address);

    // UI update
    cell.innerText=evaluatedValue;

    // DB update
    cellProp.value=evaluatedValue;
    cellProp.formula=formula;
    
}

function AddChildToParent(formula)
{
        evaluateFormula(formula);
    for(let i=0;i<arrExp.length;i++)
    {   formula=arrExp[i];
        let encodedFormula=formula.split(" ");
        let childAddress=addressBar.value;
        for(let i=0;i<encodedFormula.length;i++)
        {
            if(isValidAddress(encodedFormula[i]))
            {
                let [cell,ParentCellProp]=activecell(encodedFormula[i]);
                     ParentCellProp.child.push(childAddress);
                    //  console.log(ParentCellProp);
            }
            
        }

    }
}


function RemoveChildToParent(formula)
{
    evaluateFormula(formula);
    for(let i=0;i<arrExp.length;i++)
    {
        formula=arrExp[i]
        // console.log(formula);
        let encodedFormula=formula.split(" ");
        let childAddress=addressBar.value;
        for(let i=0;i<encodedFormula.length;i++)
        {
           if(isValidAddress(encodedFormula[i]))
           {
            let [cell,ParentCellProp]=activecell(encodedFormula[i]);
            let idx=ParentCellProp.child.indexOf(childAddress);
            ParentCellProp.child.splice(idx,1);
           }
            
        }
    }
}

function updateChildrenCells(parentAddress)
{
    let [parentCell,parentCellProp]=activecell(parentAddress);
    let children=parentCellProp.child;
    // console.log(children);
    for(let i=0;i<children.length;i++)
    {
        let childAddress=children[i];
        if(childAddress==parentAddress)return;
        let [childCell,childCellProp]=activecell(childAddress);
        let childFormula=childCellProp.formula;
        let evaluatedValue=evaluateFormula(childFormula);
        // console.log("From UpdateChildrencell",evaluatedValue);
        setCellUIAndCellProp(evaluatedValue,childFormula,childAddress);
        updateChildrenCells(childAddress);

    }
}


function evaluateFormula(expression)
{
    let ExpressionType=expression.split(" ",2);
    if(ExpressionType[0]==="=")
    {
        let idx=availableFunctions.indexOf(ExpressionType[1]);
        if(idx!=-1)
        { 
        expression=expression.split(" ").slice(2).join(" ");
        expression=expression.slice(1,expression.length-1);
         arrExp=expression.split(",");
        //  console.log(arrExp);
       let ans= HandleInbuiltFunction(idx,arrExp);
       return ans;
        }
        else{
            return "ERROR";
        }


    }
    else{
        arrExp=[];
        arrExp.push(expression);
       return evaluateExpression(expression);
    }
}

function HandleInbuiltFunction(idx,arrExp)
{
    let value=0;
    switch(idx){
        case 0:
            value=sumFunction(arrExp);
            break;
        case 1:
            value=subFunction(arrExp);
            break;
        case 2:
            value=mulFunction(arrExp);
            break;
        case 3:
            value=interpolateFunction(arrExp);
            break;


        default:
            
    }

    return value;

}

function sumFunction(arrExp)
{   
    let checkAddress=[];
   checkAddress.push(arrExp[0].replace(" ",""));
   checkAddress.push(arrExp[1].replace(" ",""));
   for(let i=0;i<checkAddress.length;i++)
   {
       if(isValidAddress(checkAddress[i]))
       {
           let arr=[];
           pushingCustomAddressRangeinStorage(arr,checkAddress[i]);
           let [startRow,endRow,startCol,endCol]=getStartEndRowCol(arr)
           let stringExpr=[];
           for(let i=startRow;i<=endRow;i++)
           {
               for(let j=startCol;j<=endCol;j++)
               {
                   let cellAddress = `${String.fromCharCode(j + 65)}${i + 1}`;
                   // console.log(cellAddress);
                   stringExpr.push(cellAddress);
               }
           }
          stringExpr= stringExpr.join(" + ");
          console.log(stringExpr);
       arrExp[i]=stringExpr;
           // console.log(startRow,endRow,startCol,endCol);
       }
   }
    // console.log(expr1);
    return (evaluateExpression(arrExp[0]) + evaluateExpression (arrExp[1]));
}

function subFunction(arrExp)
{
    let checkAddress=[];
   checkAddress.push(arrExp[0].replace(" ",""));
   checkAddress.push(arrExp[1].replace(" ",""));
   for(let i=0;i<checkAddress.length;i++)
   {
       if(isValidAddress(checkAddress[i]))
       {
           let arr=[];
           pushingCustomAddressRangeinStorage(arr,checkAddress[i]);
           let [startRow,endRow,startCol,endCol]=getStartEndRowCol(arr)
           let stringExpr=[];
           for(let i=startRow;i<=endRow;i++)
           {
               for(let j=startCol;j<=endCol;j++)
               {
                   let cellAddress = `${String.fromCharCode(j + 65)}${i + 1}`;
                   // console.log(cellAddress);
                   stringExpr.push(cellAddress);
               }
           }
          stringExpr= stringExpr.join(" - ");
          console.log(stringExpr);
       arrExp[i]=stringExpr;
           // console.log(startRow,endRow,startCol,endCol);
       }
   }
    // console.log(expr1);
    return (evaluateExpression(arrExp[0]) - evaluateExpression (arrExp[1]));
}

function mulFunction(arrExp)
{
    let checkAddress=[];
    checkAddress.push(arrExp[0].replace(" ",""));
    checkAddress.push(arrExp[1].replace(" ",""));
    for(let i=0;i<checkAddress.length;i++)
    {
        if(isValidAddress(checkAddress[i]))
        {
            let arr=[];
            pushingCustomAddressRangeinStorage(arr,checkAddress[i]);
            let [startRow,endRow,startCol,endCol]=getStartEndRowCol(arr)
            let stringExpr=[];
            for(let i=startRow;i<=endRow;i++)
            {
                for(let j=startCol;j<=endCol;j++)
                {
                    let cellAddress = `${String.fromCharCode(j + 65)}${i + 1}`;
                    // console.log(cellAddress);
                    stringExpr.push(cellAddress);
                }
            }
           stringExpr= stringExpr.join(" * ");
           console.log(stringExpr);
        arrExp[i]=stringExpr;
            // console.log(startRow,endRow,startCol,endCol);
        }
    }
     // console.log(expr1);
     return (evaluateExpression(arrExp[0]) * evaluateExpression (arrExp[1]));
}

function interpolateFunction(arrExp){
    let valueTobeFind=arrExp[0];
    let xrange;
    let yrange;
    let valAddress=arrExp[0].replace(" ","");
    let xaddress=arrExp[1].replace(" ","");
    let yaddress=arrExp[2].replace(" ","");
    let checkAddress=[];
    checkAddress.push(valAddress);
    checkAddress.push(xaddress);
    checkAddress.push(yaddress);
   
   if(isValidAddress(valAddress))
   { 
       [valueTobeFind]=getCellDataFromRange(valAddress);
    }
    if(isValidAddress(xaddress))
    {
        xrange=getCellDataFromRange(xaddress);
    }
    if(isValidAddress(yaddress))
    {
        yrange=getCellDataFromRange(yaddress);
    }

    for(let i=0;i<checkAddress.length;i++)
    {
        if(isValidAddress(checkAddress[i]))
        {
            let arr=[];
            pushingCustomAddressRangeinStorage(arr,checkAddress[i]);
            let [startRow,endRow,startCol,endCol]=getStartEndRowCol(arr)
            let stringExpr=[];
            for(let i=startRow;i<=endRow;i++)
            {
                for(let j=startCol;j<=endCol;j++)
                {
                    let cellAddress = `${String.fromCharCode(j + 65)}${i + 1}`;
                    // console.log(cellAddress);
                    stringExpr.push(cellAddress);
                }
            }
           stringExpr= stringExpr.join(" - ");
        //    console.log(stringExpr);
        arrExp[i]=stringExpr;
            // console.log(startRow,endRow,startCol,endCol);
        }
    }


    // console.log(valueTobeFind,xrange,yrange);

    xrange=xrange.map(Number);
    yrange=yrange.map(Number);
    valueTobeFind=[valueTobeFind].map(Number);
    let ans="Out Of Range";
    for (let i=0;i<xrange.length;i++)
    {
        if(xrange[i]>=valueTobeFind)
        {
                ans=yrange[i-1] + (valueTobeFind-xrange[i-1])*(yrange[i]-yrange[i-1])/(xrange[i]-xrange[i-1]);
                return ans;

        }

    }

    return ans;

    // console.log("This is Interpolate Function");
}

function pushingCustomAddressRangeinStorage(arr,range)
{
   range=range.split(":");

   for(let i=0;i<range.length;i++)
   {
       arr.push(decodeRIDCIDFromAddress(range[i]))
   }
//    console.log(arr);
}