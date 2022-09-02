
(function()  {
  
   let count=0;
	console.log("1-Step");
    let template = document.createElement('template');
  template.innerHTML = `
   <h1>H</h1>
  ;
  console.log("Step3");

customElements.define('com-sap-sample-helloworld2', class HelloWorld2 extends HTMLElement {

   constructor() {
			super(); 
      			console.log("step-4");
		   let shadowRoot = this.attachShadow({mode: "open"});
		   shadowRoot.appendChild(template.content.cloneNode(true));
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
            
            
        }
        
        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy(){
        
        }
        
      redraw(){
        }  
       
 });
})();
