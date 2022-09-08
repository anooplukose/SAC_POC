var getScriptPromisify = (src) => {
  return new Promise(resolve => {
    $.getScript(src, resolve)
  })
}

(function () {
  console.log("1")
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
    console.log("2")
      this._shadowRoot = this.attachShadow({ mode: 'open' })
      this._shadowRoot.appendChild(template.content.cloneNode(true))

      this._root = this._shadowRoot.getElementById('root')

      this._props = {}
    }

    onCustomWidgetResize (width, height) {
      this.render()
    }

    async render (resultSet) {
      console.log("3")
     // await getScriptPromisify('https://cdn.bootcdn.net/ajax/libs/echarts/5.0.0/echarts.min.js')
     await getScriptPromisify('https://fastly.jsdelivr.net/npm/jquery')
       await getScriptPromisify('https://fastly.jsdelivr.net/npm/echarts@5/dist/echarts.min.js')
       this._placeholder = this._root.querySelector('#placeholder')
      if (this._placeholder) {
        this._root.removeChild(this._placeholder)
        this._placeholder = null
      }
      if (this._myChart) {
        echarts.dispose(this._myChart)
      }
      var myChart = this._myChart = echarts.init(this._root, 'dark')
      const MEASURE_DIMENSION = '@MeasureDimension'
      const countries = []
//       const countries = [
//     'Finland',
//     'France',
//     'Germany',
//     'Iceland',
//     'Norway',
//     'Poland',
//     'Russia',
//     'United Kingdom'
//   ];
  const datasetWithFilters = [];
  const seriesList = [];
       console.log(resultSet)
      
      resultSet.forEach(dp => {
        const { rawValue, description } = dp[MEASURE_DIMENSION]
        const country = dp.Country.description
        console.log(country)
        console.log(dp.Country.description)
        console.log(dp.Country)
       
        const year = Number(dp.timeline.description)
                console.log(dp.timeline.description)
        console.log(dp.timeline)
       

        if (countries.indexOf(country) === -1) {
          countries.push(country)
        }
       })  
  echarts.util.each(countries, function (country) {
    var datasetId = country;
    datasetWithFilters.push({
      id: country,
      transform: {
        type: 'filter',
        config: {
          and: [
            { dimension: 'timeline', gte: 1950 },
            { dimension: 'Country', '=': country }
          ]
        }
      }
    });
    seriesList.push({
      type: 'line',
      datasetId: country,
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
        x: 'timeline',
        y: 'Income',
        label: ['Country', 'Income'],
        itemName: 'timeline',
        tooltip: ['Income']
      }
    });
  });
 const option = {
    animationDuration: 10000,
    dataset: [
      {
      
        source: resultSet
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
  }

      myChart.setOption(option)
    }
  }

  customElements.define('com-sap-sample-echarts-prepared11', SamplePrepared11)
})()
