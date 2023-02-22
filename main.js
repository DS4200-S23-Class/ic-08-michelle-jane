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

	// Add Y axis
	const y = d3.scaleLinear()
	  .domain([0, 100000])
	  .range([ VIS_HEIGHT, 0]);
	FRAME1.append("g")
	  .call(d3.axisLeft(y).ticks(6));

	// Bars
	FRAME1.selectAll("mybar")
	  .data(data)
	  .enter()
	  .append("rect")
	    .attr("x", function(d) { return x(d.Category); })
	    .attr("y", function(d) { return y(d.Value); })
	    .attr("width", x.bandwidth())
	    .attr("height", function(d) { return VIS_HEIGHT - y(d.Value); })
	    .attr("fill", "#69b3a2");
			})
}
// call the function to make the bar chart
build_barchart();

