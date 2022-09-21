(function()  {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
        <head>
      <title>HTML marquee Tag</title>
   </head>
	
   <body>
      <marquee>This is basic example of marquee</marquee>
   </body>
    `;
	
	<script type="text/javascript" src="/javascript/codes/xbMarquee.js"></script>
<script type="text/javascript">
<!--
	//set the marquee parameters
	function init() { rtl_marquee.start(); }
	var rtl_marquee_Text = 'JavaScript scrolling text';
	var rtl_marquee_Direction = 'left';
	var rtl_marquee_Contents='<span style="font-family:Comic Sans MS;font-size:12pt;white-space:nowrap;">' + rtl_marquee_Text + '</span>';
	rtl_marquee = new xbMarquee('rtl_marquee', '29px', '90%', 6, 100, rtl_marquee_Direction, 'scroll', rtl_marquee_Contents);
	window.setTimeout( init, 200);
-->
</script>

    customElements.define('com-sap-sample-helloworld1', class HelloWorld1 extends HTMLElement {


		constructor() {
			console.log("003")
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
