var object_clicked = -1;
var objects_clicked = []; 
var firstTime = true;


//var svg2;
var scatter_g2;

// Function for selecting colors 
var colorSelector = function (x) {
    if (x == 1)
        return d3.hsl(0, 1, 0.5, 0.33);
    else if (x == 2)
        return d3.hsl(35, 1, 0.5, 0.33);
    else if (x == 3)
        return d3.hsl(75, 1, 0.5, 0.33);
    else if (x == 4)
        return d3.hsl(120, 1, 0.5, 0.33);
    else if (x == 5)
        return d3.hsl(175, 1, 0.5, 0.33);
    else if (x == 6)
        return d3.hsl(240, 1, 0.5, 0.33);
    else if (x == 7)
        return d3.hsl(280, 1, 0.5, 0.33);
    else if (x == 8)
        return d3.hsl(315, 1, 0.5, 0.33);
    else
        return d3.hsl(0, 1, 0, 0.33);
}

// Function for selecting text
var textSelector = function (x) {
    if (x == 1)
        return 'Wall Light';
    else if (x == 2)
        return 'Chandelier';
    else if (x == 3)
        return 'Paint Can';
    else if (x == 4)
        return 'Sock';
    else if (x == 5)
        return 'Clock';
    else if (x == 6)
        return 'Books';
    else if (x == 7)
        return 'Plant';
    else if (x == 8)
        return 'Vase';
    else
        return 'Basketball';
}


function plot_it() {
    var svg_width = 1300; //650; //2000; 
    var svg_height = 550; //1200; //550;

    var margin = { top: 20, right: 10, bottom: 20, left: 60 };
    var width = 960 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    var svg = d3.select("body").append("svg").attr('id', 'top_svg')
        .attr("width",svg_width)
        .attr("height", svg_height) //height + margin.top + margin.bottom)
    
    // Position Major DOM Elements
    var scatter_g = svg.append("g").attr('id', 'avg_scatter')
        .attr("transform", "translate(" + (margin.left) + "," + (450 + margin.top) + ")");

    scatter_g2 = svg.append("g").attr('id', 'all_scatter')
        .attr("transform", "translate(" + (svg_width/2 - 20) + "," + (450 + margin.top) + ")");

    var legend = svg.append("g").attr('class', 'legend')
        .attr("transform", "translate(" + (480) + "," + (60) + ")");
   
    // Scatter plot dimensions
    var graph_width = 400;
    var graph_height = 400;
    
    // array of the Up/Down error only (used for displaying y-axis scale)
    var X_Error = [];
    for(var i=1; i<=9; i++)
    {
        X_Error.push(+spatial_data[0]['Stim'+i+'_ErrX_Average']);
    }
    
    // array of the Left/Right error only (used for displaying x-axis scale)
    var Y_Error = [];
    for(var i=1; i<=9; i++)
    {   
        Y_Error.push(+spatial_data[0]['Stim'+i+'_ErrY_Average']);
    }
    
    // aggregate data (X_Error and Y_Error combined)
    var errorData = [];
    for(var i=1; i<=9; i++)
    {  
        var obj = 
        {
            'id': i,
            'y': spatial_data[0]['Stim'+i+'_ErrX_Average'],
            'x': spatial_data[0]['Stim' + i + '_ErrY_Average'],
            'color': colorSelector(i)
        };
        
        errorData.push(obj);
    }
    
    // Creating scales
    
    // up/down scale (y-axis)
    var ud_scale = d3.scaleLinear()
        .domain([d3.min(X_Error)-2, d3.max(X_Error)])
        .range([graph_height, 0]);
    
    // left/right scale (x-axis)
    var lr_scale = d3.scaleLinear()
        .domain([d3.min(Y_Error)-5, d3.max(Y_Error)])
        .range([0, graph_width]);
        
    
    // Displaying scales
	scatter_g.append('g').attr('transform', 'translate('+(0)+ ','+ (0)+')').attr('id', 'x_axis')
	    .call(d3.axisBottom(lr_scale));
	
	scatter_g.append('g').attr('transform', 'translate('+(0)+ ','+ (-graph_height)+')').attr('id', 'y_axis')
	    .call(d3.axisLeft(ud_scale));
	
	// Display axis label
    scatter_g.append('text').text('Left/Right Error (in degrees)')
		.attr('transform', 'translate('+(graph_width/2)+','+(35)+')').attr('text-anchor', 'middle').attr('id', 'x_text');
		
    scatter_g.append('text').text('Down/Up Error (in degrees)')
		.attr('transform', 'translate('+(-30)+','+(-graph_height/2)+') rotate(270)').attr('text-anchor', 'middle').attr('id', 'y_text');
    
    // Display Title
    scatter_g.append('text').text('Average Turning Error')
		.attr('transform', 'translate('+(graph_width/2)+','+(-graph_height-20)+')').attr('text-anchor', 'middle').attr('id', 'title').attr('font-size', '20px');
		    
    
    // Display the scatter points
    scatter_g.selectAll('circle').data(errorData).enter().append('circle')
        .attr('cx', function (d) {
            return lr_scale(d.x);
        })
        .attr('cy', function (d) { 
            return ud_scale(d.y)-graph_height;
        })
        .attr('r', 0)
        .attr('fill', function (d) {return colorSelector(d.id)})
        .attr('id', 'points')
        .transition().duration(1200)
        .attr('r', 7);
    
    // generates a line given an array [x, y]
    var lineGenerator = d3.line()
        .x(function(d, i) { return d[0] })
        .y(function(d, i) { return d[1] });
        
    // Generate line for (0,0)
    scatter_g.append('path')
        .attr('stroke-opacity', 0)
        .attr('d', function() {
	        var points = [];
	        // add the origin
	        points.push([lr_scale(0), 0]);
	        // add the current point location
	        points.push([lr_scale(0), -graph_height]);
			
	        return lineGenerator(points);
        })
        .attr('fill', 'None').attr('stroke', d3.hsl(0, 1, 0)).attr('stroke-width', 0).attr('stroke-opacity', 0.33).attr('id', 'y_origin_line')
        .transition().duration(1200)
        .attr('stroke-width', 1.5);
        
    scatter_g.append('path')
        .attr('stroke-opacity', 0)
        .attr('d', function() {
	        var points = [];
	        // add the origin
	        points.push([0, ud_scale(0)-graph_height]);
	        // add the current point location
	        points.push([graph_width, ud_scale(0)-graph_height]);
			
	        return lineGenerator(points);
        })
        .attr('fill', 'None').attr('stroke', d3.hsl(0, 1, 0)).attr('stroke-width', 0).attr('stroke-opacity', 0.33).attr('id', 'x_origin_line')
        .transition().duration(1200)
        .attr('stroke-width', 1.5);
		
     // Listen for when points are hovered
	 scatter_g.selectAll('circle')
	    .on('mouseover', function(d)  {
	    
	        // Display the length value'
	        var y_rounded = parseFloat(d.y).toFixed(2);
	        var x_rounded = parseFloat(d.x).toFixed(2);
		    var x_squared = d.x * d.x;
		    var y_squared = d.y * d.y;
		    // get the euclidian distance
		    var result = Math.sqrt(x_squared + y_squared).toFixed(2);
		    
		    scatter_g.append('text').text('('+x_rounded+', '+y_rounded+')')
		        .attr('transform', 'translate('+(lr_scale(d.x))+','+(ud_scale(d.y)-graph_height-25)+')').attr('text-anchor', 'middle').attr('id', 'hoverText1').attr('font-size', '12px');
		    
		    scatter_g.append('text').text('Length: '+result)
		        .attr('transform', 'translate('+(lr_scale(d.x))+','+(ud_scale(d.y)-graph_height-10)+')').attr('text-anchor', 'middle').attr('id', 'hoverText2').attr('font-size', '12px');
		   
		   // Display the lines
	       scatter_g.append('path')
                .attr('stroke-opacity', 0)
		        .attr('d', function() {
			        var points = [];
			        // add the origin
			        points.push([lr_scale(0), ud_scale(0)-graph_height]);
			        // add the current point location
			        points.push([lr_scale(d.x), ud_scale(d.y)-graph_height]);
        			
			        return lineGenerator(points);
		        })
		        .attr('fill', 'None').attr('stroke', function () {return colorSelector(d.id)}).attr('stroke-width', 2).attr('stroke-opacity', 0.5).attr('id', 'lineGraph');
	    }); 
	    
	  // Listen for when points are unhovered
      scatter_g.selectAll('circle')
        .on('mouseout', function(d)  {
            // remove text
            scatter_g.selectAll('#hoverText1').data([]).exit().remove();
            
            scatter_g.selectAll('#hoverText2').data([]).exit().remove();
            
            // remove line
            scatter_g.selectAll('#lineGraph').data([]).exit().remove();
        });
        	         
      
      // POPULATE LEGEND       
      var colorIndex = [1,2,3,4,5,6,7,8,9];
      
      // Display the legend colors
      legend.selectAll('circle').data(colorIndex).enter().append('circle')
        .attr('cx', function (d) {
            return 0;
        })
        .attr('cy', function (d) { 
            return 25 * d;
        })
        .attr('r', function (d) { return 7 })
        .attr('fill', function (d) {return colorSelector(d)})
        .attr('id', 'legend_points');
       
       // For Objects 1-9
       for(var i=1; i<=9; i++)
       {
           // Display legend text
           legend.append('text')
            .text(textSelector(i))
		    .attr('transform', 'translate('+(35)+','+(25*i + 4)+')')
		    .attr('text-anchor', 'middle')
		    .attr('id', 'legend_text')
		    .attr('font-size', '10px');
    }


	 // Listen for when points are clicked
	 scatter_g.selectAll('circle')
         .on('click', function (d) {
             object_clicked = d.id;            
             var is_classed = d3.select(this).classed('selected');

             if (is_classed) {
                objects_clicked.pop(d.id);
                 d3.select(this)
                    .attr('fill', colorSelector(d.id))
                     .classed('selected', !is_classed)
                     .style("stroke-width", 0)
                    .style("stroke", "transparent");
             }
             else {
                objects_clicked.push(d.id);
                 d3.select(this)
                    .attr('fill', "transparent")
                     .classed('selected', !is_classed)
                     .style("stroke-width", 5)
                     .style("stroke", colorSelector(d.id));
             }

            console.log(objects_clicked.length)
            //for (var i = 0; i < objects_clicked.length; i++) {
            //    console.log(objects_clicked[i]);
            //}
	        plot_it_b();
	 });
}

function plot_it_b() 
{
    // generates a line given an array [x, y]
    var lineGenerator = d3.line()
        .x(function(d, i) { return d[0] })
        .y(function(d, i) { return d[1] });
                

    // Scatter plot dimensions
    var graph_width = 400;
    var graph_height = 400;
 
    var errorData = [];
    var minX = 1000;
    var maxX = -1000;
    var minY = 1000;
    var maxY = -1000;


    for (var i = 0; i < all_data.length; i++) {
        // if no item is selected, show all items
        if (objects_clicked.length == 0) {
            objects_clicked = [];
            var currX = parseFloat(all_data[i]['ChangeErrorX']);
            var currY = parseFloat(all_data[i]['ChangeErrorY']);
            var obj =
            {
                'x': currX,
                'y': currY,
                'color': colorSelector((i + 1) % 9)
            };
            errorData.push(obj);
        }    
        else // else show only that item in scatterplot 
        {
            for (var j = 0; j < objects_clicked.length; j++) { // This is ugly, but js's .includes() wasn't working) :C
                cur_obj = objects_clicked[j]-1;
                if (cur_obj == all_data[i]['ObjectId']) {

                    //if (all_data[i][' ObjectId'] == (object_clicked - 1)) {
                    var currX = parseFloat(all_data[i]['ChangeErrorX']);
                    var currY = parseFloat(all_data[i]['ChangeErrorY']);

                    // update min and max for X, if possible
                    if (currX > maxX)
                        maxX = currX;
                    else if (currX < minX)
                        minX = currX;

                    // update min and max for Y, if possible
                    if (currY > maxY)
                        maxY = currY;
                    else if (currY < minY)
                        minY = currY;

                    var obj =
                    {
                        'x': currX,
                        'y': currY,
                        'color': colorSelector(cur_obj+1)
                    };

                    errorData.push(obj);
                } // end if 
            } // end for
        } // end else
    }
    
    // up/down scale (y-axis)
    var ud_err_scale = d3.scaleLinear()
        .domain([-360, 360])//([minY, maxY])
        .range([graph_height, 0]);
    
    // left/right scale (x-axis)
    var lr_err_scale = d3.scaleLinear() 
        .domain([-360, 360])
        .range([0, graph_width]);

    
        
    if(firstTime)
    {
        // Display Title
        scatter_g2.append('text').text('Turning Errors for Selected Object(s)')
		.attr('transform', 'translate('+(graph_width/2)+','+(-graph_height-20)+')').attr('text-anchor', 'middle').attr('id', 'title').attr('font-size', '20px');
    
        // Displaying scales (enter)
	    scatter_g2.append('g').attr('transform', 'translate('+(0)+ ','+ (0)+')').attr('id', 'x_axis')
            .call(d3.axisBottom(lr_err_scale));
    	
	    scatter_g2.append('g').attr('transform', 'translate('+(0)+ ','+ (-graph_height)+')').attr('id', 'y_axis')
            .call(d3.axisLeft(ud_err_scale));
	    
	    // Display axis label
        scatter_g2.append('text').text('Left/Right Error (in degrees)')
		    .attr('transform', 'translate('+(graph_width/2)+','+(35)+')').attr('text-anchor', 'middle').attr('id', 'x_text');
    		
        scatter_g2.append('text').text('Down/Up Error (in degrees)')
		    .attr('transform', 'translate('+(-35)+','+(-graph_height/2)+') rotate(270)').attr('text-anchor', 'middle').attr('id', 'y_text');

        // Generate line for (0,0)
        scatter_g2.append('path')
            .attr('stroke-opacity', 0)
            .attr('d', function () {
                var points = [];
                // add the origin
                points.push([lr_err_scale(0), 0]);
                // add the current point location
                points.push([lr_err_scale(0), -graph_height]);

                return lineGenerator(points);
            })
            .attr('fill', 'None').attr('stroke', d3.hsl(0, 1, 0)).attr('stroke-width', 1.5).attr('stroke-opacity', 0.33).attr('id', 'y_origin_line');

        scatter_g2.append('path')
            .attr('stroke-opacity', 0)
            .attr('d', function () {
                var points = [];
                // add the origin
                points.push([0, ud_err_scale(0) - graph_height]);
                // add the current point location
                points.push([graph_width, ud_err_scale(0) - graph_height]);

                return lineGenerator(points);
            })
            .attr('fill', 'None').attr('stroke', d3.hsl(0, 1, 0)).attr('stroke-width', 1.5).attr('stroke-opacity', 0.33).attr('id', 'x_origin_line');


	}
	else
	{   
	    // Displaying scales (update)
	    scatter_g2.selectAll('#x_axis').attr('transform', 'translate('+(0)+ ','+ (0)+')').attr('id', 'x_axis')
            .call(d3.axisBottom(lr_err_scale));
    	
	    scatter_g2.selectAll('#y_axis').attr('transform', 'translate('+(0)+ ','+ (-graph_height)+')').attr('id', 'y_axis')
            .call(d3.axisLeft(ud_err_scale));
	        
	    // Generate line for (0,0)
        scatter_g2.selectAll('#y_origin_line')
            .attr('stroke-opacity', 0)
            .attr('d', function() {
	            var points = [];
	            // add the origin
                points.push([lr_err_scale(0), 0]);
	            // add the current point location
                points.push([lr_err_scale(0), -graph_height]);
    			
	            return lineGenerator(points);
            })
            .attr('fill', 'None').attr('stroke', d3.hsl(0, 1, 0)).attr('stroke-width', 0).attr('stroke-opacity', 0.33).attr('id', 'y_origin_line')
            //.transition().duration(1200)
            .attr('stroke-width', 1.5);
            
        scatter_g2.selectAll('#x_origin_line')
            .attr('stroke-opacity', 0)
            .attr('d', function() {
	            var points = [];
	            // add the origin
                points.push([0, ud_err_scale(0)-graph_height]);
	            // add the current point location
                points.push([graph_width, ud_err_scale(0)-graph_height]);
    			
	            return lineGenerator(points);
            })
            .attr('fill', 'None').attr('stroke', d3.hsl(0, 1, 0)).attr('stroke-width', 0).attr('stroke-opacity', 0.33).attr('id', 'x_origin_line')
            //.transition().duration(1200)
            .attr('stroke-width', 1.5);
	}
    
    // Remove all points
    scatter_g2.selectAll('circle').data([]).exit().remove();    
	
	// Display the scatter points
    scatter_g2.selectAll('circle').data(errorData).enter().append('circle')
        .attr('cx', function (d) {  return lr_err_scale(d.x);  })
        .attr('cy', function (d) {  return ud_err_scale(d.y)-graph_height;  })
        .attr('r', 0)
        .attr('fill', function (d) {
            //console.log(d.color); 
            return d.color;
        }) //colorSelector(object_clicked)})
        .attr('id', 'points')
        .transition().duration(1200)
        .attr('r', 7);
        
     // Listen for when points are hovered
	 scatter_g2.selectAll('circle')
	    .on('mouseover', function(d)  {
	    
	        // Display the length value'
	        var y_rounded = parseFloat(d.y).toFixed(2);
	        var x_rounded = parseFloat(d.x).toFixed(2);
		    var x_squared = d.x * d.x;
		    var y_squared = d.y * d.y;
		    // get the euclidian distance
		    var result = Math.sqrt(x_squared + y_squared).toFixed(2);
		    
		    scatter_g2.append('text').text('('+x_rounded+', '+y_rounded+')')
                .attr('transform', 'translate(' + (lr_err_scale(d.x)) + ',' + (ud_err_scale(d.y)-graph_height-25)+')').attr('text-anchor', 'middle').attr('id', 'hoverText1').attr('font-size', '12px');
		    
		    scatter_g2.append('text').text('Length: '+result)
                .attr('transform', 'translate(' + (lr_err_scale(d.x)) + ',' + (ud_err_scale(d.y)-graph_height-10)+')').attr('text-anchor', 'middle').attr('id', 'hoverText2').attr('font-size', '12px');
		   
		   // Display the lines
	       scatter_g2.append('path')
                .attr('stroke-opacity', 0)
		        .attr('d', function() {
			        var points = [];
			        // add the origin
                    points.push([lr_err_scale(0), ud_err_scale(0)-graph_height]);
			        // add the current point location
                    points.push([lr_err_scale(d.x), ud_err_scale(d.y)-graph_height]);
        			
			        return lineGenerator(points);
		        })
		        .attr('fill', 'None').attr('stroke', d.color).attr('stroke-width', 2).attr('stroke-opacity', 0.5).attr('id', 'lineGraph');
	    }); 
	    
	  // Listen for when points are unhovered
      scatter_g2.selectAll('circle')
        .on('mouseout', function(d)  {
            // remove text
            scatter_g2.selectAll('#hoverText1').data([]).exit().remove();
            
            scatter_g2.selectAll('#hoverText2').data([]).exit().remove();
            
            // remove line
            scatter_g2.selectAll('#lineGraph').data([]).exit().remove();
        });
    
    firstTime = false;
}