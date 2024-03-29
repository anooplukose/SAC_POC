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
        <div id="placeholder"></div>
      </div>
    `
  class SamplePrepared17 extends HTMLElement {
    constructor () {
      super()
      console.log("020")
      this._shadowRoot = this.attachShadow({ mode: 'open' })
      this._shadowRoot.appendChild(template.content.cloneNode(true))
      this._root = this._shadowRoot.getElementById('root')
	this._firstConnection = false;
      this._props = {}
   
      this.addEventListener("click", event => {
        console.log("26")
				var event = new Event("onClick")
				this.dispatchEvent(event)
            })
    }

//////	  
	 //Fired when the widget is added to the html DOM of the page
        
       
        
	  
  


    async render (resultSet) {
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
//       const countries = [
//     'CHINA',
//     'EUROPE & AME',
//     'LATIN AMERICA',
//      'NORTH AMERICA',
//         'OTHER',
//         'ASIA PACIFIC'
    
//   ];
	   const MEASURE_DIMENSION = '@MeasureDimension'
	    const countries = [];
	     const timeline = []
	     const arra=[]
	     arra.push(['Year','Region','Sales'])
	    console.log("202")
	    console.log(arra)
  const datasetWithFilters = [];
  const seriesList = [];
	    const series = []
	    console.log(resultSet)
	    resultSet.forEach(dp => {
		    const { rawValue, description } = dp[MEASURE_DIMENSION]
		    const country = dp.Region.description
		    const year = Number(dp.Year.description)
		    const rawNo= Number(rawValue)
		   
		    const arr= [year,country,rawNo]
		    
		    if (countries.indexOf(country) === -1) {
          countries.push(country)
        }
		     if (arra.indexOf(arr) === -1) {
          arra.push(arr)
        }
		    if (timeline.indexOf(year) === -1) {
          timeline.push(year)
        }
		    const iT = timeline.indexOf(year)
        series[iT] = series[iT] || []
        const iC = countries.indexOf(country)
        series[iT][iC] = series[iT][iC] || []
		    
		    let iV
        if (description === 'Sales') { iV = 2 }
        series[iT][iC][0] = year
	series[iT][iC][1] = country
		    series[iT][iC][iV] = rawValue
		    
	    })
	    
	    const data = {
        timeline,
        countries,
        arra
      }
	    console.log("111")
	    console.log(arra)
// 	   
	   // console.log(data)
	    	    console.log("100")
	    console.log(series)
  echarts.util.each(countries, function (country) {
    var datasetId = country;
    datasetWithFilters.push({
      id: datasetId,
    
      transform: {
        type: 'filter',
        config: {
          and: [
            { dimension: 'Year', gte: 1950 },
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
          return '$' + params.value[2]+' m';
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
        y: 'Sales',
        label: ['Region', 'Sales'],
        itemName: 'Year',
        tooltip: ['Sales']
      }
    });
  });
 const option = {
    baseOption: {
          timeline: {
            axisType: 'category',
            orient: 'vertical',
            autoPlay: true,
            inverse: true,
            playInterval: 1000,
            left: null,
            right: 0,
            top: 20,
            bottom: 20,
            width: 55,
            height: null,
            label: {
              color: '#999'
            },
            symbol: 'none',
          
            
            data: []
          },
	    animationDuration: 20000,
	 color: [
  '#6DF26D',
        '#c23531',
        '#E062AE',
        '#96BFFF',
        '#ea7e53',
        '#eedd78'
  ],
	 legend: {
    orient: 'horizontal',
    left: 300,
    top: 20
  },
    dataset: [
      {
    source: arra
     
    
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
      name: 'Sales',
	    axisLabel: {
        formatter: '{value} $m'
      }
    },
    grid: {
      right: 140
    },
    series: seriesList
    },
	 options: []
  };
	    for (var n = 0; n < data.timeline.length; n++) {
        option.baseOption.timeline.data.push(data.timeline[n])
        option.options.push({
          title: {
            show: true,
            text: data.timeline[n] + ''
          },
          series: {
            name: data.timeline[n],
            type: 'scatter',
            data: arra[n]
            
          }
        })
      }
      myChart.setOption(option)
    }
  }

  customElements.define('com-sap-sample-echarts-prepared17', SamplePrepared17)
})()
