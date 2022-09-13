 var getScriptPromisify = (src) => {
  return new Promise(resolve => {
    $.getScript(src, resolve)
  })
}
	(function () {
  const template = document.createElement('template')
  template.innerHTML = `
      <style>
      #root {
        background-color: #100c2a;
      }
      #placeholder {
        padding-top: 1em;
        text-align: center;
        font-size: 1.5em;
        color: white;
      }
      </style>
      <div id="root" style="width: 100%; height: 100%;">
        <div id="placeholder">Time-Series Animation Chart</div>
      </div>
    `
  class SamplePrepared14 extends HTMLElement {
    constructor () {
      super()
      console.log("79")
      this._shadowRoot = this.attachShadow({ mode: 'open' })
      this._shadowRoot.appendChild(template.content.cloneNode(true))
      this._root = this._shadowRoot.getElementById('root')
	this._firstConnection = false;
      this._props = {}
     // this.render()
      this.addEventListener("click", event => {
        console.log("26")
				var event = new Event("onClick")
				this.dispatchEvent(event)
            })
    }

//////	  
	 //Fired when the widget is added to the html DOM of the page
        connectedCallback(callme){
        
        console.log("Step-5");
        this._firstConnection = true;
        
        async function LoadLibs() {
        console.log("Step - 7");
        
					try
          {
						console.log("Step-8");
						
            
					} 
          catch (e) 
          {
						alert(e);
					} 
          finally 
          {
          console.log("Step-10");
          console.log(" execute kyun nahi ho raha");
        //  callme.redraw();
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
            //this.redraw();
            }
            
            
        }
        
        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy(){
        
        }

        onCustomWidgetResize (width, height) {
     console.log("25")
      //this.render()
    }
       
        
	  
  


    async render () {
      console.log("33")
     // await getScriptPromisify('https://cdn.bootcdn.net/ajax/libs/echarts/5.0.0/echarts.min.js')
await getScriptPromisify('https://fastly.jsdelivr.net/npm/jquery')
       await getScriptPromisify('https://fastly.jsdelivr.net/npm/echarts@5/dist/echarts.min.js')
	    console.log("34")
this._placeholder = this._root.querySelector('#placeholder')
      if (this._placeholder) {
        this._root.removeChild(this._placeholder)
        this._placeholder = null
      }
      if (this._myChart) {
        echarts.dispose(this._myChart)
      }
      console.log("44")
      var myChart = this._myChart = echarts.init(this._root, 'dark')
      console.log("55")
      const countries = [
    'CHINA',
    'EUROPE & AME',
    'LATIN AMERICA',
     'NORTH AMERICA',
        'OTHER',
        'ASIA PACIFIC'
    
  ];
  const datasetWithFilters = [];
  const seriesList = [];
  echarts.util.each(countries, function (country) {
    var datasetId = country;
    datasetWithFilters.push({
      id: datasetId,
    
      transform: {
        type: 'filter',
        config: {
          and: [
            { dimension: 'Calendar Year', gte: 1950 },
            { dimension: 'Region', '=': country }
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
          return params.value[1] + ': ' + params.value[2];
        }
      },
      labelLayout: {
        moveOverlap: 'shiftY'
      },
      emphasis: {
        focus: 'series'
      },
      encode: {
        x: 'Calendar Year',
        y: 'ACT Sales AR',
        label: ['Region', 'ACT Sales AR'],
        itemName: 'Calendar Year',
        tooltip: ['ACT Sales AR']
      }
    });
  });
 const option = {
    animationDuration: 50000,
    dataset: [
      {
    source: [
      ['Calendar Year','Region','ACT Sales AR'],
     ['2002','ASIA PACIFIC',777.48],
['2002','CHINA',88.95],
['2002','EUROPE & AME',1741.68],
['2002','LATIN AMERICA',752.87],
['2002','NORTH AMERICA',1689.94],
['2002','OTHER',209.44],
['2003','ASIA PACIFIC',801.51],
['2003','CHINA',27.92],
['2003','EUROPE & AME',1891.47],
['2003','LATIN AMERICA',894.73],
['2003','NORTH AMERICA',1703.62],
['2003','OTHER',187.75],
['2004','ASIA PACIFIC',841.18],
['2004','CHINA',35.26],
['2004','EUROPE & AME',2186.82],
['2004','LATIN AMERICA',1161.65],
['2004','NORTH AMERICA',1725.71],
['2004','OTHER',137.97],
['2005','ASIA PACIFIC',856.32],
['2005','CHINA',65.27],
['2005','EUROPE & AME',2206.87],
['2005','LATIN AMERICA',1182.87],
['2005','NORTH AMERICA',1911.91],
['2005','OTHER',83.17],
['2006','ASIA PACIFIC',894.49],
['2006','CHINA',74.2],
['2006','EUROPE & AME',2146.14],
['2006','LATIN AMERICA',1200.35],
['2006','NORTH AMERICA',1896.01],
['2006','OTHER',90.13],
['2007','ASIA PACIFIC',973.18],
['2007','CHINA',101.67],
['2007','EUROPE & AME',2453.03],
['2007','LATIN AMERICA',1596.9],
['2007','NORTH AMERICA',2012.5],
['2007','OTHER',79.45],
['2008','ASIA PACIFIC',1146.92],
['2008','CHINA',133.52],
['2008','EUROPE & AME',3077.33],
['2008','LATIN AMERICA',2232.23],
['2008','NORTH AMERICA',2450.41],
['2008','OTHER',117.71],
['2009','ASIA PACIFIC',1178.22],
['2009','CHINA',154.41],
['2009','EUROPE & AME',2564.92],
['2009','LATIN AMERICA',2082.54],
['2009','NORTH AMERICA',2334.58],
['2009','OTHER',105.83],
['2010','ASIA PACIFIC',1349.23],
['2010','CHINA',184.32],
['2010','EUROPE & AME',2523.06],
['2010','LATIN AMERICA',2500.08],
['2010','NORTH AMERICA',2140.9],
['2010','OTHER',116],
['2011','ASIA PACIFIC',1522.52],
['2011','CHINA',214.47],
['2011','EUROPE & AME',2910.79],
['2011','LATIN AMERICA',2942.38],
['2011','NORTH AMERICA',2356.75],
['2011','OTHER',134.96],
['2012','ASIA PACIFIC',1415.39],
['2012','CHINA',247.17],
['2012','EUROPE & AME',2861.12],
['2012','LATIN AMERICA',3279],
['2012','NORTH AMERICA',2724.98],
['2012','OTHER',132.76],
['2013','ASIA PACIFIC',1428.53],
['2013','CHINA',290.43],
['2013','EUROPE & AME',2982.51],
['2013','LATIN AMERICA',3519.11],
['2013','NORTH AMERICA',2878.42],
['2013','OTHER',156.59],
['2014','ASIA PACIFIC',1476.18],
['2014','CHINA',335.71],
['2014','EUROPE & AME',3283.86],
['2014','LATIN AMERICA',3810.61],
['2014','NORTH AMERICA',2726.71],
['2014','OTHER',119.59],
['2015','ASIA PACIFIC',1319.7],
['2015','CHINA',296.3],
['2015','EUROPE & AME',2860.94],
['2015','LATIN AMERICA',3257.13],
['2015','NORTH AMERICA',2507.07],
['2015','OTHER',139.19],
['2016','ASIA PACIFIC',1353.22],
['2016','CHINA',274.07],
['2016','EUROPE & AME',2845.41],
['2016','LATIN AMERICA',2864.42],
['2016','NORTH AMERICA',2483.94],
['2016','OTHER',125.3],
['2017','ASIA PACIFIC',1388.85],
['2017','CHINA',272.12],
['2017','EUROPE & AME',2849.59],
['2017','LATIN AMERICA',2434.42],
['2017','NORTH AMERICA',2529.2],
['2017','OTHER',162.85],
['2018','ASIA PACIFIC',1398.29],
['2018','CHINA',290.95],
['2018','EUROPE & AME',2838.64],
['2018','LATIN AMERICA',2914.46],
['2018','NORTH AMERICA',2584.97],
['2018','OTHER',292.11],
['2019','ASIA PACIFIC',1376.97],
['2019','CHINA',300.27],
['2019','EUROPE & AME',2632.22],
['2019','LATIN AMERICA',3423.65],
['2019','NORTH AMERICA',2508.01],
['2019','OTHER',257.89],
['2020','ASIA PACIFIC',1481],
['2020','CHINA',327.09],
['2020','EUROPE & AME',2671.64],
['2020','LATIN AMERICA',3608.65],
['2020','NORTH AMERICA',2633.75],
['2020','OTHER',372.75],
['2021','ASIA PACIFIC',1760.67],
['2021','CHINA',415.48],
['2021','EUROPE & AME',2975.4],
['2021','LATIN AMERICA',4522.51],
['2021','NORTH AMERICA',3011.68],
['2021','OTHER',484.08],
['2022','ASIA PACIFIC',1044.01],
['2022','CHINA',422.52],
['2022','EUROPE & AME',2364.02],
['2022','LATIN AMERICA',3185.54],
['2022','NORTH AMERICA',2179.47],
['2022','OTHER',320.87]
    ]
  },
      ...datasetWithFilters
    ],
    title: {
      text: 'All Region Sales Since 2002'
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
      name: 'ACT Sales AR'
    },
    grid: {
      right: 140
    },
    series: seriesList
  };
      myChart.setOption(option)
    }
  }

  customElements.define('com-sap-sample-echarts-prepared14', SamplePrepared14)
})()
