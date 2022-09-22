(function()  {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
     <head>
        <style>
            .marquee {
                height: 50px;
                overflow: hidden;
                position: relative;
                background: #000000;
                color: #fefefe;
                border: 1px solid #4a4a4a;
		
		
            }
            
            .marquee p {
                position: absolute;
                width: 100%;
                height: 100%;
                margin: 0;
                line-height: 50px;
                text-align: center;
                -moz-transform: translateX(100%);
                -webkit-transform: translateX(100%);
                transform: translateX(100%);
                -moz-animation: scroll-left 2s linear infinite;
                -webkit-animation: scroll-left 2s linear infinite;
                animation: scroll-left 20s linear infinite;
            }
            
            @-moz-keyframes scroll-left {
                0% {
                    -moz-transform: translateX(100%);
                }
                100% {
                    -moz-transform: translateX(-100%);
                }
            }
            
            @-webkit-keyframes scroll-left {
                0% {
                    -webkit-transform: translateX(100%);
                }
                100% {
                    -webkit-transform: translateX(-100%);
                }
            }
            
            @keyframes scroll-left {
                0% {
                    -moz-transform: translateX(100%);
                    -webkit-transform: translateX(100%);
                    transform: translateX(100%);
                }
                100% {
                    -moz-transform: translateX(-100%);
                    -webkit-transform: translateX(-100%);
                    transform: translateX(-100%);
                }
            }
        </style>
    </head>
	
   <body>
        <div class="marquee">
         <p>   Top selling product for 2021 is THIAMETHOXAM&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Top selling product family for 2021 is Fungicides&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max revenue generating region for 2021 from overall sales is Latin America with $4.5b   </p>
        </div>
    </body>
    `;

    customElements.define('com-sap-sample-helloworld5', class HelloWorld5 extends HTMLElement {


		constructor() {
			console.log("006")
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
		
		let div=this.shadowRoot.getElementById('marquee');
		div.textContent = "Replacement text";
		div.innerHTML = `<span style="background-color: lime">Replacement HTML</span>`;
		div.insertAdjacentText('beforeend', ' appended text');
		div.insertAdjacentHTML(
  'beforeend',
  `<span style="background-color: cyan"> appended HTML</code>`,
);
        }
    });
})();
