

function plot_it() {

    var margin = { top: 20, right: 10, bottom: 20, left: 10 };
    var width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var polar_g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var fullCircle = 2 * Math.PI; // 360 degrees in radians
    var innerRadius = 100,
        outerRadius = Math.min(width, height) / 2 - 6;

    console.log("TODO: MUST CONVERT ERR DATA FROM DEGREES TO RADIANS");
    console.log("TODO: FIX RADIAL SCALE");
    console.log("TODO: ADD OTHER STIMULI");
    console.log("TODO: MUCH");

    // x = angle = err in orientation
    var x = d3.scaleLinear() // nope. what scale? 
        .domain(d3.extent(spatial_data, function (d) { return d.Stim1_ErrY}))
        .range([0, fullCircle]);

    // y = radius = time
    var y = d3.scaleRadial()
        .domain(d3.extent(spatial_data, function (d) { return d.Stim1_Latency; }))
        .range([innerRadius, outerRadius]);


    polar_g.selectAll('circle').data(spatial_data).enter().append('circle')
        .attr('cx', function (d) {
            console.log(d.Stim1_ErrY + " -> " + x(d.Stim1_ErrY));
            return x(d.Stim1_ErrY);
        })
        .attr('cy', function (d) { 
            console.log(d.Stim1_Latency + " -> " + x(d.Stim1_Latency));
            return y(d.Stim1_Latency)
        })
        .attr('r', function (d) { return 5 })
        .attr('fill', "rgba(0, 154, 202, 0.33)");

    var yAxis = polar_g.append("g").attr('class', 'yAxis')
        .attr("text-anchor", "middle");

    var yTick = yAxis
        .selectAll("g")
        .data(y.ticks(5))
        .enter().append("g");

    yTick.append("circle")
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("opacity", 0.2)
        .attr("r", y);

    yAxis.append("circle")
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("opacity", 0.2)
        .attr("r", function () { return y(y.domain()[0]) });


    var xAxis = polar_g.append("g").attr('class', 'xAxis'); 


    // Add lines along inner circle to indicate angle 
    // 
    var xTick = xAxis
        .selectAll("g")
        .data(x.ticks(12)) 
        .enter().append("g")
        .attr("text-anchor", "middle")
        .attr("transform", function (d) {
            return "rotate(" + ((x(d)) * 180 / Math.PI - 90) + ")translate(" + innerRadius + ",0)";
        }); 

    xTick.append("line")
        .attr("x2", -5)
        .attr("stroke", "#000");

    xTick.append("text")
        .attr("transform", function (d) {
            var angle = x(d);
            return ((angle < Math.PI / 2) || (angle > (Math.PI * 3 / 2))) ? "rotate(90)translate(0,22)" : "rotate(-90)translate(0, -15)";
        })
        .text(function (d) { return d; })
        .style("font-size", 10)
        .attr("opacity", 0.6)


        var title = polar_g.append("g")
            .attr("class", "title")
            .append("text")
            .attr("dy", "-0.2em")
            .attr("text-anchor", "middle")
            .text("Spatial Memory")

        var subtitle = polar_g.append("text") // OOH LA LA YESS
            .attr("dy", "1em")
            .attr("text-anchor", "middle")
            .attr("opacity", 0.6)
            .text("Aggregate");

}
