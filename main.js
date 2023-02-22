// declare constants
const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 1000;
const MARGINS = {left: 100, right: 100, top: 100, bottom: 100};
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

// make the big frame
const FRAME1 = d3.select("#vis1")
				.append("svg")
					.attr("height", FRAME_HEIGHT)
					.attr("width", FRAME_WIDTH)
					.attr("class", "frame");

function build_barchart() {
	d3.csv("data/data.csv").then((data) => {

	// Title
	Frame1.append("text")
			.attr("x", MARGINS.left + VIS_WIDTH/2)
	        .attr("y", MARGINS.top - 25)
	        .attr("text-anchor", "middle")
	        .style("font-size", "18px")
	        .text("Bar Chart");

	// Label the x axis
    FRAME1.append("text")
	    	.attr("x", MARGINS.left + VIS_WIDTH/2)
	    	.attr("y", VIS_HEIGHT + 125)
	    	.attr("text-anchor", "middle")
	    	.style("font-size", "12px")
	    	.text("category");
        
    // Label the y axis 
    FRAME1.append("text")
	    	.attr("text-anchor", "middle")
	        .attr("x", MARGINS.left - 50)
	        .attr("y", VIS_HEIGHT - 200)
	        .style("font-size", "12px")
	        .text("value");

	// X axis
	const x = d3.scaleBand()
  					.range([ 0, VIS_WIDTH ])
		  			.domain(data.map(function(d) { return d.Category; }))
					.padding(0.2);

	FRAME1.append("g")
			.attr("transform", "translate(0," + VIS_HEIGHT + ")")
			.call(d3.axisBottom(x))
			.selectAll("text")
			.attr("transform", "translate(-10,0)rotate(-45)")
			.style("text-anchor", "end");

	// Find max of y 
		const MAX_Y = d3.max(data, (d) => {
			return parseInt(d.Value);
		})

	// Add Y axis
	const y = d3.scaleLinear()
					.domain([0, MAX_Y])
					.range([ VIS_HEIGHT, 0]);

	FRAME1.append("g")
			.attr("transform", 
					"translate(" + MARGINS.left + "," + (MARGINS.bottom) + ")")
			.call(d3.axisLeft(y).ticks(6))
			.attr("font-size", "10px");

	// Bars
	FRAME1.selectAll("mybar")
			.data(data)
			.enter()
			.append("rect")
			.attr("x", function(d) { return x(d.Category) + MARGINS.left; })
	    	.attr("y", function(d) { return y(d.Value) MARGINS.bottom; })
	    		.attr("width", x.bandwidth())
	    		.attr("height", function(d) { return VIS_HEIGHT - y(d.Value); })
	    		.attr("fill", "#69b3a2");
	})
}
// call the function to make the bar chart
build_barchart();

