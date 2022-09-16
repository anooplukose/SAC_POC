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
    console.log("013")
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
          callme.redraw();
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
            this.redraw();
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

		resultSet.forEach(dp => {
			const { rawValue, description } = dp[MEASURE_DIMENSION]
		    const country = dp.Region.description
		    console.log(dp.Region)
		    const year = Number(dp.Year.description)
		    const rawNo= Number(rawValue)
		    
		})
		console.log(country)
		
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
categoryAxis.dataFields.category = "network";
categoryAxis.renderer.minGridDistance = 1;
categoryAxis.renderer.inversed = true;
categoryAxis.renderer.grid.template.disabled = true;

var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.min = 0;
valueAxis.rangeChangeEasing = am4core.ease.linear;
valueAxis.rangeChangeDuration = stepDuration;
valueAxis.extraMax = 0.1;

var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.categoryY = "network";
series.dataFields.valueX = "MAU";
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
    chart.data[i].MAU = newData[i].MAU;
    if (chart.data[i].MAU > 0) {
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

var allData = {
"2002": [
    {
      "network": "ASIA PACIFIC",
      "MAU": 777.48
    },
    {
      "network": "CHINA",
      "MAU": 88.95
    },
    {
      "network": "EUROPE & AME",
      "MAU": 1741.68
    },

    {
      "network": "LATIN AMERICA",
      "MAU": 752.87
    },
    {
      "network": "NORTH AMERICA",
      "MAU": 1689.94
    },
    {
      "network": "OTHER",
      "MAU": 209.44
    }
    
  ],
  "2003": [
    {
      "network": "ASIA PACIFIC",
      "MAU": 801.51
    },
    {
      "network": "CHINA",
      "MAU": 27.92
    },
    {
      "network": "EUROPE & AME",
      "MAU": 1891.47
    },
    {
      "network": "LATIN AMERICA",
      "MAU": 894.73
    },
    {
      "network": "NORTH AMERICA",
      "MAU": 1703.62
    },
    {
      "network": "OTHER",
      "MAU": 187.75
    }
    
  ],
  "2004": [
    {
      "network": "ASIA PACIFIC",
      "MAU": 841.18
    },
    {
      "network": "CHINA",
      "MAU": 35.26
    },
    {
      "network": "EUROPE & AME",
      "MAU": 2186.82
    },
    {
      "network": "LATIN AMERICA",
      "MAU": 1161.65
    },
    {
      "network": "NORTH AMERICA",
      "MAU": 1725.71
    },
    {
      "network": "OTHER",
      "MAU": 137.97
    }
   
  ],
  "2005": [
    {
      "network": "ASIA PACIFIC",
      "MAU": 856.32
    },
    {
      "network": "CHINA",
      "MAU": 65.27
    },
    {
      "network": "EUROPE & AME",
      "MAU": 2206.87
    },
    {
      "network": "LATIN AMERICA",
      "MAU": 1182.87
    },
    {
      "network": "NORTH AMERICA",
      "MAU": 1911.91
    },
    {
      "network": "OTHER",
      "MAU": 83.17
    }
   
  ],
  "2006": [
    {
      "network": "ASIA PACIFIC",
      "MAU": 894.49
    },
    {
      "network": "CHINA",
      "MAU": 74.2
    },
    {
      "network": "EUROPE & AME",
      "MAU": 2146.14
    },
    {
      "network": "LATIN AMERICA",
      "MAU": 1200.35
    },
    {
      "network": "NORTH AMERICA",
      "MAU": 1896.01
    },
    {
      "network": "OTHER",
      "MAU": 90.13
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
