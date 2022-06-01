let canvasCont=document.querySelector(".canvas-cont");
let chartBtn=document.querySelector(".chart");

let availableCharts=["bar","line","pie"]

let chartObject={
  type:"",
  x_data:[],
  y_data:[],
  chart_name:"",
  chart_obj:{}
}




chartBtn.addEventListener("click",(e)=>{

    // DB Change
      let newChart={...chartObject};

      let param1=prompt("Enter Chart Type","line");
      if(!param1 || availableCharts.indexOf(param1)===-1)
      {
        alert("Chart Type Not Available as of now . Chart is Not Created");
        return;
      }
      newChart.type=param1;

      let param2=prompt("Enter Address Range for X axis Values");

      if(!param2 || !isValidAddress(param2))
      {
        alert(" Not valid Address for X range. Chart is Not Created");
        return;
      }
      
      let cellDataX=getCellDataFromRange(param2);
      newChart.x_data=cellDataX;
      // console.log(newChart.x_data);

      let param3=prompt("Enter Address Range for Y axis Values")
      if(!param3 || !isValidAddress(param3))
      {
        alert(" Not valid Address for Y range. Chart is Not Created");
        return;
      }
      
      let cellDataY=getCellDataFromRange(param3);
      newChart.y_data=cellDataY;

      let chartName=`Chart-${chartDB.length}`
      let param4=prompt("Enter Chart Name",chartName);
      newChart.chart_name=param4;


      chartDB.push(newChart);
      // console.log(newChart);

      // UI Change
   let newCanvas= createChartUI(newChart);

      let config=createChartConfig(newChart);
    let chart=new Chart(
      newCanvas.getContext('2d'),
      config
      );
      newCanvas.style.backgroundColor="white";
      newChart.chart_obj=chart;

      let allCharts=document.querySelectorAll(".myChart");

for(let i=0;i<allCharts.length;i++)
{
  addEventListenerOnCharts(allCharts[i]);
}

function addEventListenerOnCharts(chart){

  chart.addEventListener("mousedown",(e)=>{
    if(e.button===2)
    {
      let ans=confirm("This Chart Will Be Deleted");
      if(ans)
      {
        let charID=chart.getAttribute("charid");
        let canID=chart.getAttribute("canid");
         collectedChartDB[canID].splice(charID,1);
         chart.remove();
         resetCanvasId();
      }
    }

  })
}
    
  });

  function createChartConfig(newChart){


    const labels = newChart.x_data;
    
    const data = {
      labels: labels,
      datasets: [{
        data: newChart.y_data.map(Number),
        label: newChart.chart_name,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
       
      }]
    };
    
    const config = {
      type: newChart.type,
      data: data,
      options: {
      
          maintainAspectRatio: false
      }
    };


    return config;
  }

function createChartUI(){
  let newCanvasDiv=document.createElement("div");
  newCanvasDiv.setAttribute("class","myChart");
  newCanvasDiv.setAttribute("canid",canvasIdx);
  newCanvasDiv.setAttribute("charid",chartDB.length-1);

    let newresizerdivne=document.createElement("div");
    newresizerdivne.setAttribute("class","resizer ne");
    newresizerdivne.setAttribute("canid",canvasIdx);
    newresizerdivne.setAttribute("charid",chartDB.length-1);
    newCanvasDiv.appendChild(newresizerdivne);

    let newresizerdivnw=document.createElement("div");
    newresizerdivnw.setAttribute("class","resizer nw");
    newresizerdivnw.setAttribute("canid",canvasIdx);
    newresizerdivnw.setAttribute("charid",chartDB.length-1);
    newCanvasDiv.appendChild(newresizerdivnw);

    let newresizerdivse=document.createElement("div");
    newresizerdivse.setAttribute("class","resizer se");
    newresizerdivse.setAttribute("canid",canvasIdx);
    newresizerdivse.setAttribute("charid",chartDB.length-1);
    newCanvasDiv.appendChild(newresizerdivse);

    let newresizerdivsw=document.createElement("div");
    newCanvasDiv.appendChild(newresizerdivsw);
    newresizerdivsw.setAttribute("canid",canvasIdx);
    newresizerdivsw.setAttribute("charid",chartDB.length-1);
    newresizerdivsw.setAttribute("class","resizer sw");

    let newCanvas=document.createElement("canvas");
    canvasCont.appendChild(newCanvasDiv);
    newCanvasDiv.appendChild(newCanvas);
    resizableDiv(".myChart",canvasIdx,chartDB.length-1);

    return newCanvas;
}

  function hideSheetChart(canvasIdx)
  {
    let allSelectedCanvas=document.querySelectorAll(`.myChart[canID="${canvasIdx}"`);

    for(let i=0;i<allSelectedCanvas.length;i++)
    {
      allSelectedCanvas[i].style.zIndex=-1;
    }
  }

  
  function showSheetChart(canvasIdx)
  {
    let allSelectedCanvas=document.querySelectorAll(`.myChart[canID="${canvasIdx}"`);

    for(let i=0;i<allSelectedCanvas.length;i++)
    {
      allSelectedCanvas[i].style.zIndex=4;
    }
  }
  
  function removeSheetChart(canvasIdx)
  {
    let allSelectedCanvas=document.querySelectorAll(`.myChart[canID="${canvasIdx}"`);

    for(let i=0;i<allSelectedCanvas.length;i++)
    {
      allSelectedCanvas[i].remove();
    }

  }

  function resetCanvasId()
  {
    let allCharts=document.querySelectorAll(".myChart");
    let k=0;
    for(let i=0;i<collectedChartDB.length;i++)
    {
      for (let j=0;j<collectedChartDB[i].length;j++)
      {
        let canID=allCharts[k].getAttribute("canid");
        let charID=allCharts[k].getAttribute("charid");
        if(canID!=i || charID!=j)
        {
          allCharts[k].setAttribute("canid",i);
          allCharts[k].setAttribute("charid",j);
        }
        k++;
      }
    }

  }

function getCellDataFromRange(address)
{
  let arr=[];
  let cellData=[];
let decodedAddress=address.split(":");
for(let i=0;i<decodedAddress.length;i++)
{
  arr.push(decodeRIDCIDFromAddress(decodedAddress[i]));
}
// console.log(arr);
let [startRow,endRow,startCol,endCol]=getStartEndRowCol(arr);
// console.log(startRow,endRow,startCol,endCol);
for(let i=startRow;i<=endRow;i++)
{
  for(let j=startCol;j<=endCol;j++)
  {
    // console.log(sheetDB[i][j].value);
    cellData.push(sheetDB[i][j].value);
  }
}

return cellData;

}





