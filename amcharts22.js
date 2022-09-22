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
    
    const amchartscorejs = "https://cdn.amcharts.com/lib/5/index.js";
    const amchartschartsjs = "https://cdn.amcharts.com/lib/5/xy.js";
    const amchartsanimatedjs = "https://cdn.amcharts.com/lib/5/themes/Animated.js"; 
    console.log("014")
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
height:100%;
}
</style>
  <div id="chartdiv"></div>
  `;
  
  console.log("Step3");

    
   
  
  customElements.define('com-sap-sample-helloworld22', class HelloWorld22 extends HTMLElement     {
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
		const MEASURE_DIMENSION = '@MeasureDimension'
		const countries = [];
	     const timeline = []
	     const sales=[]
	     const arra=[]
        let myChart=this.shadowRoot.getElementById('chartdiv');
		var root = am5.Root.new(myChart);
		root.setThemes([
  am5themes_Animated.new(root)
]);
		// Themes begin

// Themes end
console.log("101")
		
		for (var i = 0; i < resultSet.length; i++) {
			const country=resultSet[i]["Region"].description
			const sal=resultSet[i][MEASURE_DIMENSION].rawValue
			const yea=resultSet[i]["Year"].description
			sales.push(Number(sal))
			if(countries.indexOf(country)=== -1)
			{
				countries.push(country)
			}
			if(timeline.indexOf(yea)=== -1)
			{
				timeline.push(yea)
			}
		
			
			arra.push({ 
				Year:resultSet[i]["Year"].description,
				Region: resultSet[i]["Region"].description,
				   value:Number(resultSet[i][MEASURE_DIMENSION].rawValue)
			}
			)
        
		    
		}
		const reg=[]
		for (var i = 0; i < countries.length; i++)
		{
			reg.push(
				{
					Region:countries[i]
				}
				)
		}
		
		const ye=[]
		for (var i = 0; i < timeline.length; i++)
		{
			ye.push(
				{
					Year:timeline[i]
				}
				)
		}
		console.log(reg)
		console.log(ye)
		console.log(arra)
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "none",
    wheelY: "none",
    layout: root.verticalLayout
  })
);
		var yRenderer = am5xy.AxisRendererY.new(root, {
  visible: false,
  minGridDistance: 20,
  inversed: true
});

yRenderer.grid.template.set("visible", false);

var yAxis = chart.yAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0,
    renderer: yRenderer,
    categoryField: "Region"
  })
);

var xRenderer = am5xy.AxisRendererX.new(root, {
  visible: false,
  minGridDistance: 30,
  opposite: true
});

xRenderer.grid.template.set("visible", false);

var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    renderer: xRenderer,
    categoryField: "Year"
  })
);
// chart.get("colors").set("colors", [
//   am5.color(0x095256),
//   am5.color(0x087f8c),
//   am5.color(0x5aaa95),
//   am5.color(0x86a873),
//   am5.color(0xbb9f06),
// 	am5.color("#ff0064")
// ]);
// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/#Adding_series
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    calculateAggregates: true,
    stroke: am5.color(0xffffff),
    clustered: false,
    xAxis: xAxis,
    yAxis: yAxis,
    categoryXField: "Year",
    categoryYField: "Region",
    valueField: "value"
  })
);

series.columns.template.setAll({
  forceHidden: true
});

var circleTemplate = am5.Template.new({ radius: 5 });

// Add circle bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
series.bullets.push(function () {
  var graphics = am5.Circle.new(
    root, {
      stroke: series.get("stroke"),
      fill: series.get("fill")
    }, circleTemplate
  );
  return am5.Bullet.new(root, {
    sprite: graphics
  });
});

// Set up heat rules
// https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
series.set("heatRules", [{
  target: circleTemplate,
  min: 5,
  max: 35,
  dataField: "value",
  key: "radius"
}]);

// Set data
// https://www.amcharts.com/docs/v5/charts/xy-chart/#Setting_data
	var data=arra;	
// var data = [{
//   Year: "12pm",
//   Region: "Sunday",
//   value: 2990
// }, {
//   Year: "1am",
//   Region: "Sunday",
//   value: 2520
// }, {
//   Year: "2am",
//   Region: "Sunday",
//   value: 2334
// },
// // 	    {
// //   hour: "3am",
// //   weekday: "Sunday",
// //   value: 2230
// // }, {
// //   hour: "4am",
// //   weekday: "Sunday",
// //   value: 2325
// // }, {
// //   hour: "5am",
// //   weekday: "Sunday",
// //   value: 2019
// // }, {
// //   hour: "6am",
// //   weekday: "Sunday",
// //   value: 2128
// // }, {
// //   hour: "7am",
// //   weekday: "Sunday",
// //   value: 2246
// // }, {
// //   hour: "8am",
// //   weekday: "Sunday",
// //   value: 2421
// // }, {
// //   hour: "9am",
// //   weekday: "Sunday",
// //   value: 2788
// // }, {
// //   hour: "10am",
// //   weekday: "Sunday",
// //   value: 2959
// // }, {
// //   hour: "11am",
// //   weekday: "Sunday",
// //   value: 3018
// // }, {
// //   hour: "12am",
// //   weekday: "Sunday",
// //   value: 3154
// // }, {
// //   hour: "1pm",
// //   weekday: "Sunday",
// //   value: 3172
// // }, {
// //   hour: "2pm",
// //   weekday: "Sunday",
// //   value: 3368
// // }, {
// //   hour: "3pm",
// //   weekday: "Sunday",
// //   value: 3464
// // }, {
// //   hour: "4pm",
// //   weekday: "Sunday",
// //   value: 3746
// // }, {
// //   hour: "5pm",
// //   weekday: "Sunday",
// //   value: 3656
// // }, {
// //   hour: "6pm",
// //   weekday: "Sunday",
// //   value: 3336
// // }, {
// //   hour: "7pm",
// //   weekday: "Sunday",
// //   value: 3292
// // }, {
// //   hour: "8pm",
// //   weekday: "Sunday",
// //   value: 3269
// // }, {
// //   hour: "9pm",
// //   weekday: "Sunday",
// //   value: 3300
// // }, {
// //   hour: "10pm",
// //   weekday: "Sunday",
// //   value: 3403
// // }, {
// //   hour: "11pm",
// //   weekday: "Sunday",
// //   value: 3323
// // }, 
// 	    {
//   Year: "12pm",
//   Region: "Monday",
//   value: 3346
// }, {
//   Year: "1am",
//   Region: "Monday",
//   value: 2725
// }, {
//   Year: "2am",
//   Region: "Monday",
//   value: 3052
// }
// // 	    {
// //   hour: "3am",
// //   weekday: "Monday",
// //   value: 3876
// // }, {
// //   hour: "4am",
// //   weekday: "Monday",
// //   value: 4453
// // }, {
// //   hour: "5am",
// //   weekday: "Monday",
// //   value: 3972
// // }, {
// //   hour: "6am",
// //   weekday: "Monday",
// //   value: 4644
// // }, {
// //   hour: "7am",
// //   weekday: "Monday",
// //   value: 5715
// // }, {
// //   hour: "8am",
// //   weekday: "Monday",
// //   value: 7080
// // }, {
// //   hour: "9am",
// //   weekday: "Monday",
// //   value: 8022
// // }, {
// //   hour: "10am",
// //   weekday: "Monday",
// //   value: 8446
// // }, {
// //   hour: "11am",
// //   weekday: "Monday",
// //   value: 9313
// // }, {
// //   hour: "12am",
// //   weekday: "Monday",
// //   value: 9011
// // }, {
// //   hour: "1pm",
// //   weekday: "Monday",
// //   value: 8508
// // }, {
// //   hour: "2pm",
// //   weekday: "Monday",
// //   value: 8515
// // }, {
// //   hour: "3pm",
// //   weekday: "Monday",
// //   value: 8399
// // }, {
// //   hour: "4pm",
// //   weekday: "Monday",
// //   value: 8649
// // }, {
// //   hour: "5pm",
// //   weekday: "Monday",
// //   value: 7869
// // }, {
// //   hour: "6pm",
// //   weekday: "Monday",
// //   value: 6933
// // }, {
// //   hour: "7pm",
// //   weekday: "Monday",
// //   value: 5969
// // }, {
// //   hour: "8pm",
// //   weekday: "Monday",
// //   value: 5552
// // }, {
// //   hour: "9pm",
// //   weekday: "Monday",
// //   value: 5434
// // }, {
// //   hour: "10pm",
// //   weekday: "Monday",
// //   value: 5070
// // }, {
// //   hour: "11pm",
// //   weekday: "Monday",
// //   value: 4851
// // }, {
// //   hour: "12pm",
// //   weekday: "Tuesday",
// //   value: 4468
// // }, {
// //   hour: "1am",
// //   weekday: "Tuesday",
// //   value: 3306
// // }, {
// //   hour: "2am",
// //   weekday: "Tuesday",
// //   value: 3906
// // }, {
// //   hour: "3am",
// //   weekday: "Tuesday",
// //   value: 4413
// // }, {
// //   hour: "4am",
// //   weekday: "Tuesday",
// //   value: 4726
// // }, {
// //   hour: "5am",
// //   weekday: "Tuesday",
// //   value: 4584
// // }, {
// //   hour: "6am",
// //   weekday: "Tuesday",
// //   value: 5717
// // }, {
// //   hour: "7am",
// //   weekday: "Tuesday",
// //   value: 6504
// // }, {
// //   hour: "8am",
// //   weekday: "Tuesday",
// //   value: 8104
// // }, {
// //   hour: "9am",
// //   weekday: "Tuesday",
// //   value: 8813
// // }, {
// //   hour: "10am",
// //   weekday: "Tuesday",
// //   value: 9278
// // }, {
// //   hour: "11am",
// //   weekday: "Tuesday",
// //   value: 10425
// // }, {
// //   hour: "12am",
// //   weekday: "Tuesday",
// //   value: 10137
// // }, {
// //   hour: "1pm",
// //   weekday: "Tuesday",
// //   value: 9290
// // }, {
// //   hour: "2pm",
// //   weekday: "Tuesday",
// //   value: 9255
// // }, {
// //   hour: "3pm",
// //   weekday: "Tuesday",
// //   value: 9614
// // }, {
// //   hour: "4pm",
// //   weekday: "Tuesday",
// //   value: 9713
// // }, {
// //   hour: "5pm",
// //   weekday: "Tuesday",
// //   value: 9667
// // }, {
// //   hour: "6pm",
// //   weekday: "Tuesday",
// //   value: 8774
// // }, {
// //   hour: "7pm",
// //   weekday: "Tuesday",
// //   value: 8649
// // }, {
// //   hour: "8pm",
// //   weekday: "Tuesday",
// //   value: 9937
// // }, {
// //   hour: "9pm",
// //   weekday: "Tuesday",
// //   value: 10286
// // }, {
// //   hour: "10pm",
// //   weekday: "Tuesday",
// //   value: 9175
// // }, {
// //   hour: "11pm",
// //   weekday: "Tuesday",
// //   value: 8581
// // }, {
// //   hour: "12pm",
// //   weekday: "Wednesday",
// //   value: 8145
// // }, {
// //   hour: "1am",
// //   weekday: "Wednesday",
// //   value: 7177
// // }, {
// //   hour: "2am",
// //   weekday: "Wednesday",
// //   value: 5657
// // }, {
// //   hour: "3am",
// //   weekday: "Wednesday",
// //   value: 6802
// // }, {
// //   hour: "4am",
// //   weekday: "Wednesday",
// //   value: 8159
// // }, {
// //   hour: "5am",
// //   weekday: "Wednesday",
// //   value: 8449
// // }, {
// //   hour: "6am",
// //   weekday: "Wednesday",
// //   value: 9453
// // }, {
// //   hour: "7am",
// //   weekday: "Wednesday",
// //   value: 9947
// // }, {
// //   hour: "8am",
// //   weekday: "Wednesday",
// //   value: 11471
// // }, {
// //   hour: "9am",
// //   weekday: "Wednesday",
// //   value: 12492
// // }, {
// //   hour: "10am",
// //   weekday: "Wednesday",
// //   value: 9388
// // }, {
// //   hour: "11am",
// //   weekday: "Wednesday",
// //   value: 9928
// // }, {
// //   hour: "12am",
// //   weekday: "Wednesday",
// //   value: 9644
// // }, {
// //   hour: "1pm",
// //   weekday: "Wednesday",
// //   value: 9034
// // }, {
// //   hour: "2pm",
// //   weekday: "Wednesday",
// //   value: 8964
// // }, {
// //   hour: "3pm",
// //   weekday: "Wednesday",
// //   value: 9069
// // }, {
// //   hour: "4pm",
// //   weekday: "Wednesday",
// //   value: 8898
// // }, {
// //   hour: "5pm",
// //   weekday: "Wednesday",
// //   value: 8322
// // }, {
// //   hour: "6pm",
// //   weekday: "Wednesday",
// //   value: 6909
// // }, {
// //   hour: "7pm",
// //   weekday: "Wednesday",
// //   value: 5810
// // }, {
// //   hour: "8pm",
// //   weekday: "Wednesday",
// //   value: 5151
// // }, {
// //   hour: "9pm",
// //   weekday: "Wednesday",
// //   value: 4911
// // }, {
// //   hour: "10pm",
// //   weekday: "Wednesday",
// //   value: 4487
// // }, {
// //   hour: "11pm",
// //   weekday: "Wednesday",
// //   value: 4118
// // }, {
// //   hour: "12pm",
// //   weekday: "Thursday",
// //   value: 3689
// // }, {
// //   hour: "1am",
// //   weekday: "Thursday",
// //   value: 3081
// // }, {
// //   hour: "2am",
// //   weekday: "Thursday",
// //   value: 6525
// // }, {
// //   hour: "3am",
// //   weekday: "Thursday",
// //   value: 6228
// // }, {
// //   hour: "4am",
// //   weekday: "Thursday",
// //   value: 6917
// // }, {
// //   hour: "5am",
// //   weekday: "Thursday",
// //   value: 6568
// // }, {
// //   hour: "6am",
// //   weekday: "Thursday",
// //   value: 6405
// // }, {
// //   hour: "7am",
// //   weekday: "Thursday",
// //   value: 8106
// // }, {
// //   hour: "8am",
// //   weekday: "Thursday",
// //   value: 8542
// // }, {
// //   hour: "9am",
// //   weekday: "Thursday",
// //   value: 8501
// // }, {
// //   hour: "10am",
// //   weekday: "Thursday",
// //   value: 8802
// // }, {
// //   hour: "11am",
// //   weekday: "Thursday",
// //   value: 9420
// // }, {
// //   hour: "12am",
// //   weekday: "Thursday",
// //   value: 8966
// // }, {
// //   hour: "1pm",
// //   weekday: "Thursday",
// //   value: 8135
// // }, {
// //   hour: "2pm",
// //   weekday: "Thursday",
// //   value: 8224
// // }, {
// //   hour: "3pm",
// //   weekday: "Thursday",
// //   value: 8387
// // }, {
// //   hour: "4pm",
// //   weekday: "Thursday",
// //   value: 8218
// // }, {
// //   hour: "5pm",
// //   weekday: "Thursday",
// //   value: 7641
// // }, {
// //   hour: "6pm",
// //   weekday: "Thursday",
// //   value: 6469
// // }, {
// //   hour: "7pm",
// //   weekday: "Thursday",
// //   value: 5441
// // }, {
// //   hour: "8pm",
// //   weekday: "Thursday",
// //   value: 4952
// // }, {
// //   hour: "9pm",
// //   weekday: "Thursday",
// //   value: 4643
// // }, {
// //   hour: "10pm",
// //   weekday: "Thursday",
// //   value: 4393
// // }, {
// //   hour: "11pm",
// //   weekday: "Thursday",
// //   value: 4017
// // }, {
// //   hour: "12pm",
// //   weekday: "Friday",
// //   value: 4022
// // }, {
// //   hour: "1am",
// //   weekday: "Friday",
// //   value: 3063
// // }, {
// //   hour: "2am",
// //   weekday: "Friday",
// //   value: 3638
// // }, {
// //   hour: "3am",
// //   weekday: "Friday",
// //   value: 3968
// // }, {
// //   hour: "4am",
// //   weekday: "Friday",
// //   value: 4070
// // }, {
// //   hour: "5am",
// //   weekday: "Friday",
// //   value: 4019
// // }, {
// //   hour: "6am",
// //   weekday: "Friday",
// //   value: 4548
// // }, {
// //   hour: "7am",
// //   weekday: "Friday",
// //   value: 5465
// // }, {
// //   hour: "8am",
// //   weekday: "Friday",
// //   value: 6909
// // }, {
// //   hour: "9am",
// //   weekday: "Friday",
// //   value: 7706
// // }, {
// //   hour: "10am",
// //   weekday: "Friday",
// //   value: 7867
// // }, {
// //   hour: "11am",
// //   weekday: "Friday",
// //   value: 8615
// // }, {
// //   hour: "12am",
// //   weekday: "Friday",
// //   value: 8218
// // }, {
// //   hour: "1pm",
// //   weekday: "Friday",
// //   value: 7604
// // }, {
// //   hour: "2pm",
// //   weekday: "Friday",
// //   value: 7429
// // }, {
// //   hour: "3pm",
// //   weekday: "Friday",
// //   value: 7488
// // }, {
// //   hour: "4pm",
// //   weekday: "Friday",
// //   value: 7493
// // }, {
// //   hour: "5pm",
// //   weekday: "Friday",
// //   value: 6998
// // }, {
// //   hour: "6pm",
// //   weekday: "Friday",
// //   value: 5941
// // }, {
// //   hour: "7pm",
// //   weekday: "Friday",
// //   value: 5068
// // }, {
// //   hour: "8pm",
// //   weekday: "Friday",
// //   value: 4636
// // }, {
// //   hour: "9pm",
// //   weekday: "Friday",
// //   value: 4241
// // }, {
// //   hour: "10pm",
// //   weekday: "Friday",
// //   value: 3858
// // }, {
// //   hour: "11pm",
// //   weekday: "Friday",
// //   value: 3833
// // }, {
// //   hour: "12pm",
// //   weekday: "Saturday",
// //   value: 3503
// // }, {
// //   hour: "1am",
// //   weekday: "Saturday",
// //   value: 2842
// // }, {
// //   hour: "2am",
// //   weekday: "Saturday",
// //   value: 2808
// // }, {
// //   hour: "3am",
// //   weekday: "Saturday",
// //   value: 2399
// // }, {
// //   hour: "4am",
// //   weekday: "Saturday",
// //   value: 2280
// // }, {
// //   hour: "5am",
// //   weekday: "Saturday",
// //   value: 2139
// // }, {
// //   hour: "6am",
// //   weekday: "Saturday",
// //   value: 2527
// // }, {
// //   hour: "7am",
// //   weekday: "Saturday",
// //   value: 2940
// // }, {
// //   hour: "8am",
// //   weekday: "Saturday",
// //   value: 3066
// // }, {
// //   hour: "9am",
// //   weekday: "Saturday",
// //   value: 3494
// // }, {
// //   hour: "10am",
// //   weekday: "Saturday",
// //   value: 3287
// // }, {
// //   hour: "11am",
// //   weekday: "Saturday",
// //   value: 3416
// // }, {
// //   hour: "12am",
// //   weekday: "Saturday",
// //   value: 3432
// // }, {
// //   hour: "1pm",
// //   weekday: "Saturday",
// //   value: 3523
// // }, {
// //   hour: "2pm",
// //   weekday: "Saturday",
// //   value: 3542
// // }, {
// //   hour: "3pm",
// //   weekday: "Saturday",
// //   value: 3347
// // }, {
// //   hour: "4pm",
// //   weekday: "Saturday",
// //   value: 3292
// // }, {
// //   hour: "5pm",
// //   weekday: "Saturday",
// //   value: 3416
// // }, {
// //   hour: "6pm",
// //   weekday: "Saturday",
// //   value: 3131
// // }, {
// //   hour: "7pm",
// //   weekday: "Saturday",
// //   value: 3057
// // }, {
// //   hour: "8pm",
// //   weekday: "Saturday",
// //   value: 3227
// // }, {
// //   hour: "9pm",
// //   weekday: "Saturday",
// //   value: 3060
// // }, {
// //   hour: "10pm",
// //   weekday: "Saturday",
// //   value: 2855
// // }, {
// //   hour: "11pm",
// //   weekday: "Saturday",
// //   value: 2625
// // }
//	   ];

series.data.setAll(data);

// yAxis.data.setAll([
//   { Region: "ASIA PACIFIC" },
//   { Region: "CHINA"},
//   { Region: "EUROPE & AME" },
//   { Region: "LATIN AMERICA" },
//   { Region: "NORTH AMERICA" },
//   { Region: "OTHER" }
  
// ]);
yAxis.data.setAll(reg);
		xAxis.data.setAll(ye);
// xAxis.data.setAll([
//   { Year: "2002" },
//   { Year: "2003" },
//   { Year: "2004" },
//   { Year: "2005" },
//   { Year: "2006" },
//   { Year: "2007" },
//   { Year: "2008" },
//   { Year: "2009" },
//   { Year: "2010" },
//   { Year: "2011" },
//   { Year: "2012" },
//   { Year: "2013" },
//   { Year: "2014" },
//   { Year: "2015" },
//   { Year: "2016" },
//   { Year: "2017" },
//   { Year: "2018" },
//   { Year: "2019" },
//   { Year: "2020" },
//   { Year: "2021" }
  
// ]);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
chart.appear(1000, 100);

setInterval(function () {
  var i = 0;
  series.data.each(function (d) {
    var n = {
      value: d.value + d.value * Math.random() * 0.5,
      Year: d.Year,
      Region: d.Region
    };
    series.data.setIndex(i, n);
    i++;
  });
}, 1000);
       
        }
    
    
    });
    
   
})();
