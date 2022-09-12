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
  class SamplePrepared11 extends HTMLElement {
    constructor () {
      super()
      console.log("109")
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
	 
       
       


    
    

  
       
        
	  
  


    async render (resultSet) {
      console.log("88")
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
      const MEASURE_DIMENSION = '@MeasureDimension'
      const Region = []
      const CalendarYear = []
      const series = []
      console.log(resultSet)
      resultSet.forEach(dp => {
        const { rawValue, description } = dp[MEASURE_DIMENSION]
        const country = dp.Region.description
        
        const year = Number(dp.Year.description)

        if (Region.indexOf(country) === -1) {
          Region.push(country)
        }
        if (CalendarYear.indexOf(year) === -1) {
          CalendarYear.push(year)
        }
        const iT = CalendarYear.indexOf(year)
        series[iT] = series[iT] || []
        const iC = Region.indexOf(country)
        series[iT][iC] = series[iT][iC] || []

        let iV
        if (description === 'Sales') { iV = 0 }
        series[iT][iC][iV] = rawValue
        series[iT][iC][3] = country
        series[iT][iC][4] = year
      })
      
      const data = {
        Region,
        series,
        CalendarYear
      }
      
      
	  
  echarts.util.each(Region, function (country) {
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
          return params.value[0] + ': ' + params.value[1];
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
    animationDuration: 10000,
    dataset: [
      {
    source: data
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

  customElements.define('com-sap-sample-echarts-prepared11', SamplePrepared11)
})()
