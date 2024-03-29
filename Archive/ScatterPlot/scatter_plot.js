

function plot_it() {

    var margin = { top: 20, right: 10, bottom: 20, left: 10 };
    var width = 960 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    // scatter plot svg
    var scatter_g = svg.append("g")
        .attr("transform", "translate(" + 150 + "," + 450 + ")");
   
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
            'x': spatial_data[0]['Stim'+i+'_ErrY_Average']
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
    scatter_g.append('text').text('Spatial Error in VR')
		.attr('transform', 'translate('+(graph_width/2)+','+(-graph_height-20)+')').attr('text-anchor', 'middle').attr('id', 'title').attr('font-size', '20px');
	
	// Function for selecting colors
    var colorSelector = function(x)
        {
            if(x == 1)
                return d3.hsl(0, 1, 0.5, 0.33);
            else if(x == 2)
                return d3.hsl(35, 1, 0.5, 0.33);
            else if(x == 3)
                return d3.hsl(75, 1, 0.5, 0.33);
            else if(x == 4)
                return d3.hsl(120, 1, 0.5, 0.33);
            else if(x == 5)
                return d3.hsl(175, 1, 0.5, 0.33);
            else if(x == 6)
                return d3.hsl(240, 1, 0.5, 0.33);
            else if(x == 7)
                return d3.hsl(280, 1, 0.5, 0.33);
            else if(x == 8)
                return d3.hsl(315, 1, 0.5, 0.33);
            else
                return d3.hsl(0, 1, 0, 0.33);
        }
    
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
        .attr('fill', 'None').attr('stroke', d3.hsl(0, 1, 0)).attr('stroke-width', 1.5).attr('stroke-opacity', 0.33).attr('id', 'y_origin_line');
        
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
        .attr('fill', 'None').attr('stroke', d3.hsl(0, 1, 0)).attr('stroke-width', 1.5).attr('stroke-opacity', 0.33).attr('id', 'x_origin_line');
		
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
        
	   // Function for selecting text
       var textSelector = function(x)
        {
            if(x == 1)
                return 'Wall Light';
            else if(x == 2)
                return 'Chandelier';
            else if(x == 3)
                return 'Paint Can';
            else if(x == 4)
                return 'Sock';
            else if(x == 5)
                return 'Clock';
            else if(x == 6)
                return 'Books';
            else if(x == 7)
                return 'Plant';
            else if(x == 8)
                return 'Vase';
            else
                return 'Basketball';
        }
      
      
      // CREATE LEGEND  
      
      // legend svg
      var legend = svg.append("g")
        .attr("transform", "translate(" + (650) + "," + (100) + ")");
      
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
}