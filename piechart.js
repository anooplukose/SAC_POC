(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<style>
	.pie-chart {
		background:
			radial-gradient(
				circle closest-side,
				transparent 66%,
				white 0
			),
			conic-gradient(
				#4e79a7 0,
				#4e79a7 38%,
				#f28e2c 0,
				#f28e2c 61%,
				#e15759 0,
				#e15759 77%,
				#76b7b2 0,
				#76b7b2 87%,
				#59a14f 0,
				#59a14f 93%,
				#edc949 0,
				#edc949 100%
		);
		position: relative;
		width: 500px;
		min-height: 350px;
		margin: 0;
		outline: 1px solid #ccc;
	}
	.pie-chart h2 {
		position: absolute;
		margin: 1rem;
	}
	.pie-chart cite {
		position: absolute;
		bottom: 0;
		font-size: 80%;
		padding: 1rem;
		color: gray;
	}
	.pie-chart figcaption {
		position: absolute;
		bottom: 1em;
		right: 1em;
		font-size: smaller;
		text-align: right;
	}
	.pie-chart span:after {
		display: inline-block;
		content: "";
		width: 0.8em;
		height: 0.8em;
		margin-left: 0.4em;
		height: 0.8em;
		border-radius: 0.2em;
		background: currentColor;
	}
</style>
<figure class="pie-chart">
	<h2>World electricity generation by source</h2>
	<figcaption>
		Coal 38<span style="color:#4e79a7"></span><br>
		Natural Gas 23<span style="color:#f28e2c"></span><br>
		Hydro 16<span style="color:#e15759"></span><br>
		Nuclear 10<span style="color:#76b7b2"></span><br>
		Renewable 6<span style="color:#59a14f"></span><br>
		Other 7<span style="color:#edc949"></span>
	</figcaption>
	<cite>International Energy Agency</cite>
</figure>
		`;

	class Box extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			
			this.$style = shadowRoot.querySelector('style');			
			this.$svg = shadowRoot.querySelector('svg');
			
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			
			this._props = {};
		}
		
		render(val, info, color) {
			var val1 = val * 0.01;
			var x = this.svg_circle_arc_path(500, 500, 450, -90, val1 * 180.0 - 90);
			var rounded = Math.round( val * 10 ) / 10;

			
			if(rounded >=0 && rounded <=100) {
				this.$style.innerHTML = ':host {border-radius: 10px;border-width: 2px;border-color: black;border-style: solid;display: block;}.body {background: #fff;}.metric {padding: 10%;}.metric svg {max-width: 100%;}.metric path {stroke-width: 75;stroke: #ecf0f1;fill: none;}.metric text {font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;}.metric.participation path.data-arc {stroke: ' + color + ';}.metric.participation text {fill: ' + color + ';}';
				this.$svg.innerHTML = '<path d="M 950 500 A 450 450 0 0 0 50 500"></path><text class="percentage" text-anchor="middle" alignment-baseline="middle" x="500" y="300" font-size="140" font-weight="bold">' + rounded + '%</text><text class="title" text-anchor="middle" alignment-baseline="middle" x="500" y="450" font-size="90" font-weight="normal">' + info + '</text><path d="' + x + '" class="data-arc"></path>"';
			}
		}
		  
		polar_to_cartesian(cx, cy, radius, angle) {
		    var radians;
		    radians = (angle - 90) * Math.PI / 180.0;
		    return [Math.round((cx + radius * Math.cos(radians)) * 100) / 100, Math.round((cy + radius * Math.sin(radians)) * 100) / 100];
		}
		
		svg_circle_arc_path(x, y, radius, start_angle, end_angle) {
		    var end_xy, start_xy;
		    start_xy = this.polar_to_cartesian(x, y, radius, end_angle);
		    end_xy = this.polar_to_cartesian(x, y, radius, start_angle);
		    return "M " + start_xy[0] + " " + start_xy[1] + " A " + radius + " " + radius + " 0 0 0 " + end_xy[0] + " " + end_xy[1];
		  };
		  

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			if ("value" in changedProperties) {
				this.$value = changedProperties["value"];
			}
			
			if ("info" in changedProperties) {
				this.$info = changedProperties["info"];
			}
			
			if ("color" in changedProperties) {
				this.$color = changedProperties["color"];
			}
			
			this.render(this.$value, this.$info, this.$color);
		}
	}
	
	customElements.define("com-demo-piechart", Box);
})();
