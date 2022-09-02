console.log("111");
(function()  {
    console.log("1");
   let count=0;
    let template = document.createElement('template');
  template.innerHTML = `
  <style>
#chartdiv {
 width: 100%;
height:500px;
}
</style>
  <div id="chartdiv"></div>
  `;
  
  console.log("Step3");

customElements.define('com-sap-sample-helloworld2', class HelloWorld2 extends HTMLElement     {
   constructor() {
			super(); 
      
      console.log("step-4");
		   let shadowRoot = this.attachShadow({mode: "open"});
		   shadowRoot.appendChild(template.content.cloneNode(true));
             this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
            });
		
    
    }


         //When the custom widget is updated, the Custom Widget SDK framework executes this function first
		onCustomWidgetBeforeUpdate(oChangedProperties) {
    
    

		}
    
    

        //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
		onCustomWidgetAfterUpdate(oChangedProperties) {
            
            }
            
            
        }
        
        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy(){
        
        }
        
        
       
 });
})();
