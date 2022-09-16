(function()  {
    
   let count=0;
    //let coreJS=document.createElement('script');
    //coreJS.src='https://www.amcharts.com/lib/4/core.js';
    //document.head.appendChild(coreJS);
    
    //let chartsJS=document.createElement('script');
    //chartsJS.src='https://www.amcharts.com/lib/4/charts.js';
    //document.head.appendChild(chartsJS);
    
    //let animatedJS=document.createElement('script');
    //animatedJS.src='https://www.amcharts.com/lib/4/themes/animated.js';
    //document.head.appendChild(animatedJS);
    
    const amchartscorejs = "https://cdn.amcharts.com/lib/4/core.js";
    const amchartschartsjs = "https://cdn.amcharts.com/lib/4/charts.js";
    const amchartsanimatedjs = "https://cdn.amcharts.com/lib/4/themes/animated.js"; 
    console.log("021")
    console.log("1-Step");
    
    //This function is used to load the library
    
    function loadScript(src)
    {
    
    console.log("Step-9");
    
	  return new Promise(function(resolve, reject) 
    {
		let script = document.createElement('script');
		script.src = src;

		script.onload = () => {console.log("Load: " + src); resolve(script);}
		script.onerror = () => reject(new Error(`Script load error for ${src}`));

		document.head.appendChild(script)
	  });
	}
    
    
    console.log("Step-2");
    
  let template = document.createElement('template');
  template.innerHTML = `
  <style>
#chartdiv {
  width: 100%;
height:500px;
}
</style>
  <div id="chartdiv"></div>
  `;
  
  console.log("Step3");

    
   
  
  customElements.define('com-sap-sample-helloworld21', class HelloWorld21 extends HTMLElement     {
   constructor() {
			super(); 
      
      console.log("step-4");
		   let shadowRoot = this.attachShadow({mode: "open"});
		   shadowRoot.appendChild(template.content.cloneNode(true));
                   this._firstConnection = false;
	           this.countries=new Array();
	           this.grossValue=new Array();
           
           
           
        

      this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
            });
		
    
    }

        //Fired when the widget is added to the html DOM of the page
        connectedCallback(){
        
        console.log("Step-5");
        this._firstConnection = true;
        
        async function LoadLibs(callme) {
        console.log("Step - 7");
        
					try
          {
						console.log("Step-8");
						await loadScript(amchartscorejs);				
						await loadScript(amchartschartsjs);		
						await loadScript(amchartsanimatedjs);
            
					} 
          catch (e) 
          {
						alert(e);
					} 
          finally 
          {
          console.log("Step-10");
          console.log(" execute kyun nahi ho raha");
          //callme.redraw();
					}
				}
        
        console.log("Step-6");
        LoadLibs(this);
        }
        
       
       
       


         //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
        disconnectedCallback(){
        
        }

         //When the custom widget is updated, the Custom Widget SDK framework executes this function first
		onCustomWidgetBeforeUpdate(oChangedProperties) {
    
    

		}
    
    

        //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
		onCustomWidgetAfterUpdate(oChangedProperties) {
            if (this._firstConnection){
          //  this.redraw();
            }
            
            
        }
        
        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy(){
        
        }

        
        //When the custom widget is resized on the canvas, the Custom Widget SDK framework executes the following JavaScript function call on the custom widget
        // Commented out by default
        /*
        onCustomWidgetResize(width, height){
        
        }
        */
         

         
        
     
        


      redraw(resultSet)
        {
		console.log(resultSet)
		const MEASURE_DIMENSION = '@MeasureDimension'
	    const countries = [];
	     const timeline = []
	     const arra=[]
        let myChart=this.shadowRoot.getElementById('chartdiv');
		// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end
console.log("101")
		
var chart = am4core.create(myChart, am4charts.XYChart);
		console.log("102")
chart.padding(40, 40, 40, 40);
		console.log(resultSet[0])
		console.log(resultSet[0]["Year"])
		console.log(resultSet[0]["Region"])
		const a=resultSet[0]["Region"].description
		console.log(a)
		const b= "Region"+a
		console.log(a)
		const d= resultSet[0][MEASURE_DIMENSION].rawValue
		console.log(d)
		console.log(Number(d))
//"+"Year"+":"+resultSet[i]["Year"].description
		for (var i = 0; i < resultSet.length; i++) {
			
			const c = "{"+"Region"+":"+resultSet[i]["Region"].description+","+"Sales"+":"+resultSet[i][MEASURE_DIMENSION].rawValue+"}"
			if (arra.indexOf(c) === -1) {
          arra.push(c)
        }
		    
		}
		
		console.log(arra)
	
		
		
chart.numberFormatter.bigNumberPrefixes = [
  { "number": 1e+3, "suffix": "K" },
  { "number": 1e+6, "suffix": "M" },
  { "number": 1e+9, "suffix": "B" }
];

var label = chart.plotContainer.createChild(am4core.Label);
label.x = am4core.percent(97);
label.y = am4core.percent(95);
label.horizontalCenter = "right";
label.verticalCenter = "middle";
label.dx = -15;
label.fontSize = 50;

var playButton = chart.plotContainer.createChild(am4core.PlayButton);
playButton.x = am4core.percent(97);
playButton.y = am4core.percent(95);
playButton.dy = -2;
playButton.verticalCenter = "middle";
playButton.events.on("toggled", function(event) {
  if (event.target.isActive) {
    play();
  }
  else {
    stop();
  }
})

var stepDuration = 4000;

var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.dataFields.category = "Region";
categoryAxis.renderer.minGridDistance = 1;
categoryAxis.renderer.inversed = true;
categoryAxis.renderer.grid.template.disabled = true;

var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.min = 0;
valueAxis.rangeChangeEasing = am4core.ease.linear;
valueAxis.rangeChangeDuration = stepDuration;
valueAxis.extraMax = 0.1;

var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.categoryY = "Region";
series.dataFields.valueX = "Sales";
series.tooltipText = "{valueX.value}"
series.columns.template.strokeOpacity = 0;
series.columns.template.column.cornerRadiusBottomRight = 5;
series.columns.template.column.cornerRadiusTopRight = 5;
series.interpolationDuration = stepDuration;
series.interpolationEasing = am4core.ease.linear;

var labelBullet = series.bullets.push(new am4charts.LabelBullet())
labelBullet.label.horizontalCenter = "right";
labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
labelBullet.label.textAlign = "end";
labelBullet.label.dx = -10;

chart.zoomOutButton.disabled = true;

// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
series.columns.template.adapter.add("fill", function(fill, target){
  return chart.colors.getIndex(target.dataItem.index);
});

var year = 2002;
label.text = year.toString();

var interval;

function play() {
  interval = setInterval(function(){
    nextYear();
  }, stepDuration)
  nextYear();
}

function stop() {
  if (interval) {
    clearInterval(interval);
  }
}

function nextYear() {
  year++

  if (year > 2006) {
    year = 2002;
  }

  var newData = allData[year];
  var itemsWithNonZero = 0;
  for (var i = 0; i < chart.data.length; i++) {
    chart.data[i].Sales = newData[i].Sales;
    if (chart.data[i].Sales > 0) {
      itemsWithNonZero++;
    }
  }

  if (year == 2002) {
    series.interpolationDuration = stepDuration / 4;
    valueAxis.rangeChangeDuration = stepDuration / 4;
  }
  else {
    series.interpolationDuration = stepDuration;
    valueAxis.rangeChangeDuration = stepDuration;
  }

  chart.invalidateRawData();
  label.text = year.toString();

  categoryAxis.zoom({ start: 0, end: itemsWithNonZero / categoryAxis.dataItems.length });
}


categoryAxis.sortBySeries = series;
		const a1=arra[0]+","+arra[1]+","+arra[2]+","+arra[3]+","+arra[4]+","+"arra[5]"
		const a2=arra[6]+","+arra[7]+","+arra[8]+","+arra[9]+","+arra[10]+","+"arra[11]"
		const a3=arra[12]+","+arra[13]+","+arra[14]+","+arra[15]+","+arra[16]+","+"arra[17]"
		const a4=arra[18]+","+arra[19]+","+arra[20]+","+arra[21]+","+arra[22]+","+"arra[23]"
		const a5=arra[24]+","+arra[25]+","+arra[26]+","+arra[27]+","+arra[28]+","+"arra[29]"
		
		
		var allData1={
			
			"2002": [
				 a1
				],
			"2003": [
					a2
				],
			"2004": [
					a3
				],
			"2005": [
					a4
				],
			"2006": [
					a5
				]		
				
		}

var allData = {
"2002": [
    {
      "Region": "ASIA PACIFIC",
      "Sales": 777.48
    },
    {
      "Region": "CHINA",
      "Sales": 88.95
    },
    {
      "Region": "EUROPE & AME",
      "Sales": 1741.68
    },

    {
      "Region": "LATIN AMERICA",
      "Sales": 752.87
    },
    {
      "Region": "NORTH AMERICA",
      "Sales": 1689.94
    },
    {
      "Region": "OTHER",
      "Sales": 209.44
    }
    
  ],
  "2003": [
    {
      "Region": "ASIA PACIFIC",
      "Sales": 801.51
    },
    {
      "Region": "CHINA",
      "Sales": 27.92
    },
    {
      "Region": "EUROPE & AME",
      "Sales": 1891.47
    },
    {
      "Region": "LATIN AMERICA",
      "Sales": 894.73
    },
    {
      "Region": "NORTH AMERICA",
      "Sales": 1703.62
    },
    {
      "Region": "OTHER",
      "Sales": 187.75
    }
    
  ],
  "2004": [
    {
      "Region": "ASIA PACIFIC",
      "Sales": 841.18
    },
    {
      "Region": "CHINA",
      "Sales": 35.26
    },
    {
      "Region": "EUROPE & AME",
      "Sales": 2186.82
    },
    {
      "Region": "LATIN AMERICA",
      "Sales": 1161.65
    },
    {
      "Region": "NORTH AMERICA",
      "Sales": 1725.71
    },
    {
      "Region": "OTHER",
      "Sales": 137.97
    }
   
  ],
  "2005": [
    {
      "Region": "ASIA PACIFIC",
      "Sales": 856.32
    },
    {
      "Region": "CHINA",
      "Sales": 65.27
    },
    {
      "Region": "EUROPE & AME",
      "Sales": 2206.87
    },
    {
      "Region": "LATIN AMERICA",
      "Sales": 1182.87
    },
    {
      "Region": "NORTH AMERICA",
      "Sales": 1911.91
    },
    {
      "Region": "OTHER",
      "Sales": 83.17
    }
   
  ],
  "2006": [
    {
      "Region": "ASIA PACIFIC",
      "Sales": 894.49
    },
    {
      "Region": "CHINA",
      "Sales": 74.2
    },
    {
      "Region": "EUROPE & AME",
      "Sales": 2146.14
    },
    {
      "Region": "LATIN AMERICA",
      "Sales": 1200.35
    },
    {
      "Region": "NORTH AMERICA",
      "Sales": 1896.01
    },
    {
      "Region": "OTHER",
      "Sales": 90.13
    }
    
  ]
}
console.log(allData)
		
		
chart.data = JSON.parse(JSON.stringify(allData[year]));
		console.log(chart.data)
categoryAxis.zoom({ start: 0, end: 1 / chart.data.length });

series.events.on("inited", function() {
  setTimeout(function() {
    playButton.isActive = true; // this starts interval
  }, 2000)
})
       
        }
    
    
    });
    
   
})();
