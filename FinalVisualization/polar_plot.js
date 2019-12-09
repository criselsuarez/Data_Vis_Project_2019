
const PI = Math.PI,
    arcMinRadius = 85,  // min rad of arcs 
    arcPadding = 0,    // thickk
    labelPadding = -5,
    numArcs = 9;

var margin = { top: 10, right: 10, bottom: 10, left: 10 };
var width = 450 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;
const chartRadius = height / 2 - 40;


var some_data_deg = [0, 45, 90, 135, 180, 225, 270, 315]
var some_data_deg2 = [-90, -20, -10, 0, 10, 20, 90, 180]

var colors = [d3.hsl(0, 1, 0.5, 0.4), d3.hsl(35, 1, 0.5, 0.4), d3.hsl(70, 1, 0.5, 0.4),
d3.hsl(120, 1, 0.5, 0.99), d3.hsl(175, 1, 0.5, 0.4), d3.hsl(240, 1, 0.5, 0.4),
    d3.hsl(280, 1, 0.5, 0.4), d3.hsl(315, 1, 0.5, 0.4), d3.hsl(0, 1, 0, 0.33)];

var colors2 = ["#3087a1", "#369d94", "#5eab86",
    "#bbbf77", "#e4b21c", "#e19415",
    , "#df7409", "#e24e06", "#ef0017"];

var colors3 = ["#78878b", "#bd3927", "#ebc799",
    "#152d77", "#578ec9", "#9fc0d7",
    , "#c5744e", "#254478", "#b4823e"];

// num arcs 
const arcWidth = (chartRadius - arcMinRadius - numArcs * arcPadding) / numArcs;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PlotPolar() {
    var left_padding = 250;
    var top_padding = 20;

    /*var svg = d3.select("body").append("svg")
        .attr("transform", "translate(" + (left_padding) + "," + (top_padding) + ")")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("class", "polarY");

    /*var svg2 = d3.select("body").append("svg")
        .attr("transform", "translate(" + (left_padding) + "," + (top_padding) + ")")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("class", "polarx"); 
        */

    // plot for y axis error (left/right)
    /*var polar_gY = svg.append("g")
        .attr("transform", "translate(" + (224) + "," + (225) + ")")
        .attr('id', 'avg_polarY'); // left + right err
    */
    // plot for x axis error (up/down)
    //var polar_gX = svg2.append("g")
    //    .attr('id', 'avg_polarX'); // up + down err
    
    console.log("Update 19");
   
    // plot for y axis error (left/right)
    var polar_gY = d3.select('body').select('#mid_svg').append("g")
        .attr('id', 'avg_polarY') //svg.append("g") // left + right err
        .attr("transform", "translate(" + (left_padding) + "," + (top_padding + height / 2) + ")");

    // plot for x axis error (up/down)
    var polar_gX = d3.select('body').select('#bot_svg').append("g")
        .attr('id', 'avg_polarX') // up + down err
        .attr("transform", "translate(" + (left_padding) + "," + (top_padding + height / 2) + ")");



    var err_scale = d3.scaleLinear()
        .domain([0.0, 360]) 
        .range([0.0, 2 * Math.PI]);

    let arc = d3.arc()
        .innerRadius((d, i) => getInnerRadius(i))
        .outerRadius((d, i) => getOuterRadius(i))
        .startAngle(0)
        .endAngle((d, i) => err_scale(d))

    plotRelativeErr(false, polar_gY, err_scale, arc); 
    plotRelativeErr(true, polar_gX, err_scale, arc); 
    

}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function plotRelativeErr(isX, polar_g, err_scale, arc) {
    plotRadialAxis(polar_g);
    plotAxialAxis(polar_g, err_scale);
    plotCenterTitle(isX, polar_g);
    console.log(isX); 
    plotData(isX, polar_g, arc);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RADIAL AXIS
function plotRadialAxis(polar_g) {
    let radialAxis = polar_g.append('g')
        .attr('class', 'r axis')
        .selectAll('g')
        .data(avg_data_mod)
        .enter().append('g');

    radialAxis.append('circle')
        .attr('r', (d, i) => getOuterRadius(i) + arcPadding)
        .style('stroke', "rgba(160,160,160, 0.5)")
        .style('stroke-width', 0.5)
        .style("fill", "transparent");

    radialAxis.append('circle') // draw one more circle along the inner radius! 
        .attr('r', arcMinRadius)
        .style('stroke', "rgba(160,160,160, 0.15)")
        .style('stroke-width', 0.1)
        .style("fill", "transparent");

    radialAxis.append('text')
        .attr('x', labelPadding)
        .attr('y', (d, i) => -getOuterRadius(i) + arcPadding + 12)
        .text(function (d) {
            return ""; //d.Object
        });
    //.text(d => d.MeanErrY);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AXIAL AXIS
function plotAxialAxis(polar_g, err_scale) {
    let axialAxis = polar_g.append('g')
        .attr('class', 'a axis')
        .selectAll('g')
        .data(some_data_deg2)
        .enter().append('g')
        .attr('transform', d => 'rotate(' + (rad2deg(err_scale(d)) - 90) + ')');

    // draw axial lines
    axialAxis.append('line')
        .attr('x1', arcMinRadius)
        .attr('x2', chartRadius)
        .style('stroke', "rgba(160,160,160, 0.8)")
        .style('stroke-width', 0.5);
    // label angles (corresponds to axial lines) 
    axialAxis.append('text')
        .attr('x', chartRadius + 10)
        .style("fill", "rgba(100,100,100, 0.9)")
        .style('text-anchor', d => (err_scale(d) >= PI && err_scale(d) < 2 * PI ? 'end' : null))
        .attr('transform', d => 'rotate(' + (90 - rad2deg(err_scale(d))) + ',' + (chartRadius + 20) + ',0)')
        .text(d => d + String.fromCharCode(176));
}

// POLAR CHART TITLE
function plotCenterTitle(isX, polar_g) {
    var title = polar_g.append("g")
        .attr("class", "title")
        .append("text")
        .attr("dy", "-0.2em")
        .attr("text-anchor", "middle")
        .text("Avg Turning Error")

    var sub_text = "";
    if (isX)
        sub_text = "Up / Down";
    else
        sub_text = "Left / Right";

    var subtitle = polar_g.append("text") // OOH LA LA YESS 
        .attr("dy", "1em")
        .attr("text-anchor", "middle")
        .attr("opacity", 0.6)
        .text(sub_text);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DATA ARCS    

function plotData(isX, polar_g, arc) {
    let arcs = polar_g.append('g')
        .attr('class', 'data')
        .selectAll('path')
        .data(avg_data_mod)
        .enter().append('path')
        .attr('class', 'arc')
        .style('fill', (d) => colors[d.ObjectIndex - 1]);

    // Ughh 
    if (isX) {
        arcs.transition()
            .delay((d, i) => i * 200)
            .duration(1000)
            .attrTween('d', arcTweenX); 
    }
    else {
        arcs.transition()
            .delay((d, i) => i * 200)
            .duration(1000)
            .attrTween('d', arcTweenY); 
    }


    function arcTweenY(d, i) {
        let interpolate = d3.interpolate(0, d.MeanErrY);
        return t => arc(interpolate(t), i);
    }
    function arcTweenX(d, i) {
        let interpolate = d3.interpolate(0, d.MeanErrX);
        return t => arc(interpolate(t), i);
    }
}

