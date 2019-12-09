
const PI = Math.PI,
    arcMinRadius = 85,  // min rad of arcs 
    arcPadding = 0,    // thickk
    labelPadding = -5,
    numArcs = 9;

var margin = { top: 20, right: 20, bottom: 20, left: 20 };
var width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
const chartRadius = height / 2 - 40;


var some_data_deg = [0, 45, 90, 135, 180, 225, 270, 315]
var some_data_deg2 = [-90, -20, -10, 0, 10, 20, 90, 180]

var colors = [d3.hsl(0, 1, 0.5, 0.33), d3.hsl(35, 1, 0.5, 0.33), d3.hsl(75, 1, 0.5, 0.33),
d3.hsl(120, 1, 0.5, 0.33), d3.hsl(175, 1, 0.5, 0.33), d3.hsl(240, 1, 0.5, 0.33),
d3.hsl(280, 1, 0.5, 0.33), d3.hsl(315, 1, 0.5, 0.33), d3.hsl(0, 1, 0, 0.33)];

// num arcs 
const arcWidth = (chartRadius - arcMinRadius - numArcs * arcPadding) / numArcs;

function deg2rad(angle) {
    return angle * Math.PI / 180;
}

function rad2deg(angle) {
    return angle * 180 / Math.PI;
}

function getInnerRadius(index) {
    return arcMinRadius + (numArcs - (index + 1)) * (arcWidth + arcPadding);
}

function getOuterRadius(index) {
    return getInnerRadius(index) + arcWidth;
}


function plot_it() {


    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + (margin.left*2 + chartRadius) + "," + (margin.top*2 + chartRadius) + ")");

    var polar_g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var fullCircle = 360; // 2 * Math.PI; // 360 degrees in radians 
    var circle_radians = [0, 6.28319];
    var some_data = [3.14159, 4.71239, 0, 1.5708] // not the best method but it works?
    var some_data2 = [0, 0.785398, 1.5708, 2.35619, 3.14159, 3.92699, 4.71239, 5.49779] // not the best method but it works?
    var some_data_deg = [0, 45, 90, 135, 180, 225, 270, 315]

    var innerRadius = 100,
        outerRadius = Math.min(width, height) / 2 - 6;

    console.log("Update 12");

    var err_scale = d3.scaleLinear()
        .domain([0.0, 360]) 
        .range([0.0, 2 * Math.PI]);

    let arc = d3.arc()
        .innerRadius((d, i) => getInnerRadius(i))
        .outerRadius((d, i) => getOuterRadius(i))
        .startAngle(0)
        .endAngle((d, i) => err_scale(d))

    // RADIAL AXIS
    let radialAxis = svg.append('g')
        .attr('class', 'r axis')
        .selectAll('g')
        .data(spatial_data)
        .enter().append('g');

    radialAxis.append('circle')
        .attr('r', (d, i) => getOuterRadius(i) + arcPadding)
        .attr('stroke', "gray")
        .attr('stroke-width', 0.2)
        .style("fill", "rgba(200,200,200, 0.0)");

    radialAxis.append('circle') // draw one more circle along the inner radius! 
        .attr('r', arcMinRadius)
        .attr('stroke', "rgba(200,200,200, 0.5)")
        .attr('stroke-width', 0.2)
        .style("fill", "rgba(200,200,200, 0.0)");

    radialAxis.append('text')
        .attr('x', labelPadding)
        .attr('y', (d, i) => -getOuterRadius(i) + arcPadding + 12)
        .text(function (d) {
            return ""; //d.Object
        });
        //.text(d => d.MeanErrY);

    // AXIAL AXIS 
    
    let axialAxis = svg.append('g') 
        .attr('class', 'a axis')
        .selectAll('g')
        .data(some_data_deg2)
        .enter().append('g')
        .attr('transform', d => 'rotate(' + (rad2deg(err_scale(d)) - 90) + ')');

    // draw axial lines
    axialAxis.append('line')
        .attr('x1', arcMinRadius)
        .attr('x2', chartRadius)
        .attr('stroke', "gray")
        .attr('stroke-width', 0.2);
    // label angles (corresponds to axial lines) 
    axialAxis.append('text')
        .attr('x', chartRadius + 10)
        .style("fill", "rgba(100,100,100, 0.9)")
        .style('text-anchor', d => (err_scale(d) >= PI && err_scale(d) < 2 * PI ? 'end' : null))
        .attr('transform', d => 'rotate(' + (90 - rad2deg(err_scale(d))) + ',' + (chartRadius + 20) + ',0)')
        .text(d => d +  String.fromCharCode(176));


    // CHART TITLE
    var title = svg.append("g")
        .attr("class", "title")
        .append("text")
        .attr("dy", "-0.2em")
        .attr("text-anchor", "middle")
        .text("Avg Turning Error")

    var subtitle = svg.append("text") // OOH LA LA YESS 
        .attr("dy", "1em")
        .attr("text-anchor", "middle")
        .attr("opacity", 0.6)
        .text("Left / Right");

    //DATA ARCS    
    let arcs = svg.append('g')
        .attr('class', 'data')
        .selectAll('path')
        .data(spatial_data)
        .enter().append('path')
        .attr('class', 'arc')
        .style('fill', (d) => colors[d.ObjectIndex-1]);
    
    arcs.transition()
        .delay((d, i) => i * 200)
        .duration(1000)
        .attrTween('d', arcTween);
        
    
    function arcTween(d, i) {        
        let interpolate = d3.interpolate(0, d.MeanErrY);
        return t => arc(interpolate(t), i);
    }
    
}
