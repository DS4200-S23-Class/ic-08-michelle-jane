// Declare constants
const FRAME_HEIGHT = 700;
const FRAME_WIDTH = 700;
const MARGINS = {left: 75, right: 75, top: 75, bottom: 75};
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

// Make the big frame
const FRAME1 = d3.select("#vis1")
				.append("svg")
					.attr("height", FRAME_HEIGHT)
					.attr("width", FRAME_WIDTH)
					.attr("class", "frame");

function build_barchart() {
	d3.csv("data/data.csv").then((data) => {

	// Title
    FRAME1.append("text")
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
	        .text("Category");
        
    // Label the y axis 
    FRAME1.append("text")
	        .attr("text-anchor", "middle")
	        .attr("x", MARGINS.left - 50)
	        .attr("y", VIS_HEIGHT - 200)
	        .style("font-size", "12px")
	        .text("Value");

	// Add X axis and x ticks 
	const x = d3.scaleBand()
	  			.range([0, VIS_WIDTH])
				.domain(data.map((d) => { return d.Category; }))
				.padding(0.2);

		FRAME1.append("g")
			.attr("transform", "translate(" + MARGINS.left + ", " + (VIS_HEIGHT + MARGINS.top) + ")")
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
		  		.domain([0, (MAX_Y)])
		  		.range([ VIS_HEIGHT, 0]);

	FRAME1.append("g")
			.attr("transform", 
					"translate(" + MARGINS.left + "," + (MARGINS.bottom) + ")")
		  	.call(d3.axisLeft(y).ticks(6))
		  	.attr("font-size", "10px");

	// Plot barchart
	FRAME1.selectAll("bars")
			// Loop through all the data from the dataset and append them as rectangles
		  	.data(data)
		  	.enter()
		  	.append("rect")
		    	.attr("x", (d) => { return x(d.Category) + MARGINS.left; })
		    	.attr("y", (d) => { return y(d.Value) + MARGINS.bottom; })
			    .attr("width", x.bandwidth())
			    .attr("height", (d) => { return VIS_HEIGHT - y(d.Value); })
			    .attr("fill", "#ADD8E6")
			    .attr("class", "bar");
		})
}

// Call the function to make the bar chart
build_barchart();

