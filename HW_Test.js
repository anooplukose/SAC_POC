
console.log("32");
(function()  {
	 const echart1js = "https://fastly.jsdelivr.net/npm/jquery";
    const echart2js = "https://fastly.jsdelivr.net/npm/echarts@5/dist/echarts.min.js";
	console.log("26");
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
	
     let template = document.createElement('template');
  template.innerHTML = `
  <style>
#chartdiv {
  position: relative;
  height: 100px;
  overflow: hidden;
}
</style>
  <div id="chartdiv"></div>
  `;
console.log("22");
    customElements.define('com-sap-sample-helloworld2', class HelloWorld2 extends HTMLElement {


		constructor() {
			super(); 
			this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(template.content.cloneNode(true));
            this._firstConnection = false;
			
			 this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
            });
			console.log("aa");
		}

        //Fired when the widget is added to the html DOM of the page
        connectedCallback(){
            this._firstConnection = true;
            async function LoadLibs(callme) {
        	console.log("Step - 7");
        
					try
          				{
						console.log("Step-8");
						await loadScript(echart1js);				
						await loadScript(echart2js);		
						
            
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
        // Commented out by default.  If it is enabled, SAP Analytics Cloud will track DOM size changes and call this callback as needed
        //  If you don't need to react to resizes, you can save CPU by leaving it uncommented.
        /*
        onCustomWidgetResize(width, height){
            redraw()
        }
        */

        redraw(){
		var myChart=this.shadowRoot.getElementById('chartdiv');	
		var myChart1 = echarts.init(myChart);
		const option{
			
		      console.log("Step-11");
		const countries = [
    'Finland',
    'France',
    'Germany',
    'Iceland',
    'Norway',
    'Poland',
    'Russia',
    'United Kingdom'
  ];
		var option;
		console.log("20");
  const datasetWithFilters = [];
  const seriesList = [];
  echarts.util.each(countries, function (country) {
	  console.log("21");
    var datasetId = 'dataset_' + country;
    datasetWithFilters.push({
      id: datasetId,
      fromDatasetId: 'dataset_raw',
      transform: {
        type: 'filter',
        config: {
          and: [
            { dimension: 'Year', gte: 1950 },
            { dimension: 'Country', '=': country }
          ]
        }
      }
    });
    seriesList.push({
      type: 'line',
      datasetId: datasetId,
      showSymbol: false,
      name: country,
      endLabel: {
        show: true,
        formatter: function (params) {
          return params.value[3] + ': ' + params.value[0];
        }
      },
      labelLayout: {
        moveOverlap: 'shiftY'
      },
      emphasis: {
        focus: 'series'
      },
      encode: {
        x: 'Year',
        y: 'Income',
        label: ['Country', 'Income'],
        itemName: 'Year',
        tooltip: ['Income']
      }
    });
  });
		console.log("22");
  option = {
    animationDuration: 10000,
    dataset: [
      {
        id: 'dataset_raw'
        
      },
      ...datasetWithFilters
    ],
    title: {
      text: 'Income of Germany and France since 1950'
    },
    tooltip: {
      order: 'valueDesc',
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      nameLocation: 'middle'
    },
    yAxis: {
      name: 'Income'
    },
    grid: {
      right: 140
    },
    series: seriesList
  };
		console.log("23");
   myChart.setOption(option);
		console.log("24");
	}	
		
	}  
        
    });
})();
