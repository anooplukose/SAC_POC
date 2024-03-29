var getScriptPromisify = (src) => {
  return new Promise(resolve => {
    $.getScript(src, resolve)
  })
}

(function () {
  const prepared = document.createElement('template')
  prepared.innerHTML = `
      <style>
      </style>
      <div id="root" style="width: 100%; height: 100%;">
      </div>
    `
  class SamplePrepared6 extends HTMLElement {
    constructor () {
      super()

      this._shadowRoot = this.attachShadow({ mode: 'open' })
      this._shadowRoot.appendChild(prepared.content.cloneNode(true))

      this._root = this._shadowRoot.getElementById('root')

      this._props = {}

      this.render()
    }

    onCustomWidgetResize (width, height) {
      this.render()
    }

    async render () {
    //  await getScriptPromisify('https://cdn.bootcdn.net/ajax/libs/echarts/5.0.0/echarts.min.js')
	await getScriptPromisify('https://fastly.jsdelivr.net/npm/echarts@5.3.3/dist/echarts.min.js')
      const chart = echarts.init(this._root)
     const data = [];
for (let i = 0; i <= 360; i++) {
  let t = (i / 180) * Math.PI;
  let r = Math.sin(2 * t) * Math.cos(2 * t);
  data.push([r, i]);
}
const option = {
	
  title: {
    text: 'Two Value-Axes in Polar'
  },
  legend: {
    data: ['line']
  },
  polar: {
    center: ['50%', '54%']
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  angleAxis: {
    type: 'value',
    startAngle: 0
  },
  radiusAxis: {
    min: 0
  },
  series: [
    {
      coordinateSystem: 'polar',
      name: 'line',
      type: 'line',
      showSymbol: false,
      data: data
    }
  ],
  animationDuration: 2000
};
      chart.setOption(option)
    }
  }

  customElements.define('com-sap-sample-echarts-prepared6', SamplePrepared6)
})()
