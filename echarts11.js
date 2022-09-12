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
      console.log("179")
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
      const countries = []
      const timeline = []
      const series = [['Calendar Year','Region','ACT Sales AR'],
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
['2008','CHINA',133.52]]
      console.log(resultSet)
      resultSet.forEach(dp => {
        const { rawValue, description } = dp[MEASURE_DIMENSION]
        const country = dp.Region.description
        
        const year = Number(dp.Calendar_Year.description)

        if (countries.indexOf(country) === -1) {
          countries.push(country)
        }
        if (timeline.indexOf(year) === -1) {
          timeline.push(year)
        }
//         const iT = timeline.indexOf(year)
//         series[iT] = series[iT] || []
//         const iC = countries.indexOf(country)
//         series[iT][iC] = series[iT][iC] || []

//         let iV
//         if (description === 'Sales') { iV = 0 }
//         series[iT][iC][iV] = rawValue
//         series[iT][iC][1] = country
//         series[iT][iC][2] = year
      })
      
      const data = {
        countries,
        series,
        timeline
      }
      console.log("09")
      console.log(countries)
	    console.log(series)
	    console.log(timeline)
      console.log(data)
	   const datasetWithFilters = [];
  const seriesList = [];
  echarts.util.each(countries, function (country) {
	  console.log("01")
    var datasetId = country;
	  console.log(datasetId)
    datasetWithFilters.push({
      id: datasetId,
    
      transform: {
        type: 'filter',
        config: {
          and: [
            { dimension: 'Calendar_Year', gte: 1950 },
            { dimension: 'Region', '=': country }
          ]
        }
      }
    });
	  console.log("02")
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
        x: 'Calendar_Year',
        y: 'Sales',
        label: ['Region', 'Sales'],
        itemName: 'Calendar_Year',
        tooltip: ['Sales']
      }
    });
  });
	    console.log("03")
 const option = {
    animationDuration: 10000,
    dataset: [
      {
    source: series
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
      name: 'Sales'
    },
    grid: {
      right: 140
    },
    series: seriesList
  };
	    console.log("05")
      myChart.setOption(option)
	    console.log("06")
    }
  }

  customElements.define('com-sap-sample-echarts-prepared11', SamplePrepared11)
})()
