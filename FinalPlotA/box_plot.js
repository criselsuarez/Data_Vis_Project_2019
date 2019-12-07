



// Returns a function to compute the interquartile range.
function iqr(k) {
    return function (d, i) {
        var q1 = d.quartiles[0],
            q3 = d.quartiles[2],
            iqr = (q3 - q1) * k,
            i = -1,
            j = d.length;
        while (d[++i] < q1 - iqr);
        while (d[--j] > q3 + iqr);
        return [i, j];
    };
}


function PlotWhiskers(axis_string) {

    // variable declarations 
    var labels = true; // show the text labels beside individual boxplots?

    var top_padding = 40;
    var left_padding = 575;
    var margin = { top: 30, right: 50, bottom: 70, left: 50 };
    var width = 900 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;

    var min = Infinity,
        max = -Infinity;

    // using an array of arrays with
    // data[n][2]
    // where n = number of columns in the csv file
    // data[i][0] = name of the ith column
    // data[i][1] = array of values of ith column
    var data = [];
    data[0] = [];
    data[1] = [];
    data[2] = [];
    data[3] = [];
    data[4] = [];
    data[5] = [];
    data[6] = [];
    data[7] = [];
    data[8] = [];

    // add here the header of the csv file
    data[0][0] = "Wall Light";
    data[1][0] = "Chandelier";
    data[2][0] = "Paint Can";
    data[3][0] = "Sock";
    data[4][0] = "Clock";
    data[5][0] = "Books";
    data[6][0] = "Plant";
    data[7][0] = "Vase";
    data[8][0] = "Basketball";

    // add more rows if your csv file has more columns
    data[0][1] = [];
    data[1][1] = [];
    data[2][1] = [];
    data[3][1] = [];
    data[4][1] = [];
    data[5][1] = [];
    data[6][1] = [];
    data[7][1] = [];
    data[8][1] = [];


    whisker_data.forEach(function (x) {
        var v1 = Math.floor(x.Obj1),
            v2 = Math.floor(x.Obj2),
            v3 = Math.floor(x.Obj3),
            v4 = Math.floor(x.Obj4),
            v5 = Math.floor(x.Obj5),
            v6 = Math.floor(x.Obj6),
            v7 = Math.floor(x.Obj7),
            v8 = Math.floor(x.Obj8),
            v9 = Math.floor(x.Obj9);

        // add more variables if your csv file has more columns
        var rowMax = Math.max(v1, Math.max(v2, Math.max(v3, Math.max(v4, Math.max(v5, Math.max(v6, Math.max(v7, Math.max(v8, Math.max(v9)))))))));
        var rowMin = Math.min(v1, Math.min(v2, Math.min(v3, Math.min(v4, Math.min(v5, Math.min(v6, Math.min(v7, Math.min(v8, Math.min(v9)))))))));

        data[0][1].push(v1);
        data[1][1].push(v2);
        data[2][1].push(v3);
        data[3][1].push(v4);
        data[4][1].push(v5);
        data[5][1].push(v6);
        data[6][1].push(v7);
        data[7][1].push(v8);
        data[8][1].push(v9);

        if (rowMax > max) max = rowMax;
        if (rowMin < min) min = rowMin;
    });

    // Generate Box and Whisker Plot
    var chart = d3.box()
        .whiskers(iqr(1.5))
        .height(height)
        .domain([min, max])
        .showLabels(labels);

    var svg = d3.select("body").append("svg")
        .attr("transform", "translate(" + left_padding + "," + 10 + ")")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("class", "box")
        .append("g"); 

    var whisker_g = svg.append("g").attr('id', 'whisker_plot')
        .attr("transform", "translate(" + top_padding + "," + 0+")");


    // the x-axis
    var x = d3.scaleBand() 
        .domain(data.map(function (d) { return d[0] })) // console.log(d);
        .range([0, width], 0.7, 0.3)
        .paddingInner(0.75)
        .paddingOuter(0.5);

    var xAxis = d3.axisBottom() 
        .scale(x);

    // the y-axis
    var y = d3.scaleLinear()
        .domain([min, max])
        .range([height + margin.top, 0 + margin.top]);

    var yAxis = d3.axisLeft() 
        .scale(y);

    // draw the boxplots
    whisker_g.selectAll(".box")
        .data(data)
        .enter().append("g")
        .attr("transform", function (d) { return "translate(" + x(d[0]) + "," + margin.top + ")"; })
        .call(chart.width(x.bandwidth())); 


    // add a title
    whisker_g.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 + (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        //.style("text-decoration", "underline")
        .text(axis_string + " Turning Error Quartiles");

    // draw y axis
    whisker_g.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text") // and text1
        .attr("transform", "translate(" +40+"," + 0 + ")") 
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("font-size", "16px")
        .style("fill", "black")
        .text("Angular Error");

    // draw x axis
    whisker_g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height + margin.top + 10) + ")") 
        .call(xAxis)
        .append("text")             // text label for the x axis
        .attr("x", (width / 2))
        .attr("y", 10)
        .attr("dy", ".71em")
        .style("text-anchor", "middle")
        .style("font-size", "16px");
    //.text("Objects");


}

