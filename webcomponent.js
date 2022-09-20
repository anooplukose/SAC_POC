(function()  {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
        <style>
	#main{
      border: 1px solid;
      background: yellow;
      width: 100%;
      overflow: hidden;
     }
#chartdiv {
  color: black;
      font-weight: bold;
      white-space: nowrap;
      clear: both;
      float: left;
}
</style>
  <div id="chartdiv">
  <p class="chartdiv" id="para1">
            Geeksforgeeks | 
            A computer science portal for geeks
        </p>
  
        <p class="chartdiv" id="para2">
            This is another text
        </p>
  
        <p class="chartdiv" id="para3">
            This is the third line of the 
            example line of the example.
        </p>
  </div>
  `;
const para1 = document.getElementById("para1");
const para2 = document.getElementById("para2");
const para3 = document.getElementById("para3");
		console.log(para1)
    customElements.define('com-sap-sample-helloworld1', class HelloWorld1 extends HTMLElement {


		constructor() {
			console.log("010")
			super(); 
			this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._firstConnection = false;
		}

        //Fired when the widget is added to the html DOM of the page
        connectedCallback(){
            this._firstConnection = true;
            this.redraw();
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
		
		
		
        }
    });
})();
