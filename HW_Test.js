console.log("1111");
(function()  {
	 const echart1js = "https://fastly.jsdelivr.net/npm/jquery";
    const echart2js = "https://fastly.jsdelivr.net/npm/echarts@5/dist/echarts.min.js";
	console.log("2222");
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
		let myChart=this.shadowRoot.getElementById('chartdiv');
       console.log("Step-11");
        }
    });
})();
