console.log("111");
(function()  {
    console.log("1");
   let count=0;
   
   
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
                   this._firstConnection = false;
	         //  this.countries=new Array();
	          // this.grossValue=new Array();
           
           
           
        

      this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
            });
		
    
    }
//Fired when the widget is added to the html DOM of the page
        connectedCallback(){
        
        console.log("Step-5");
        this._firstConnection = true;
        
        async function LoadLibs(callme) {
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
         redraw(){
        }
        
       
 });
})();
