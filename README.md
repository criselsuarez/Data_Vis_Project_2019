# Data Visualization Project: Fall 2019
Visualization for Turning Error in Spatial Memory Tasks 


Project Overview: 
https://www.overleaf.com/read/nvkrrdtpfzpx

Project Raw Data:
https://vanderbilt.app.box.com/folder/90883476978

Project Team:
Haley Adams, Nick Liu, & Crisel Suarez 


We want to construct visualizations to understand how participants encode the positions in 3D space. Additionally, we will analyze how participants perform with objects of varying heights. The data is collected from a Vanderbilt University's behavioral study that evaluates spatial memory in an immersive virtual environment. Within the study, participants are asked to learn the layout of objects in a 3D stairwell, and they are asked to turn and face nine target objects, three times each. Raw vectors, angles, measures of angular error, and time were collected for each target object. In addition, every participant viewed objects in two conditions: (1) where objects were all placed near eye height and (2) where objects were placed above and below eye height. 


### Repo Organization 
<ul>
  <li> <b>Archive</b> - code for visualization drafts </li> 
  <li> <b>Final Visualization</b> - final version of code (our magnum opus) </li> 
  <li> <b>Visualization Drafts</b> - images of  visualization drafts </li> 
</ul>


### Final Vizualization  

If you do not see all 7 of the figures, then refresh the page! Index.html invokes all of the relevant javascript files. The scatter plots and image interactions are contained in **scatter_plot.js**. The polar coordinate plots of relative error are contained in **polar_plot.js**. And the code for the box plots are contained in **box_plot.js** and **box.js**. The blox plot was made with code based on [Jens Gruber's implemenation](http://bl.ocks.org/jensgrubert/7789216) 

### Interactions
The two scatterplots and the legend are interactible. Hovering over individual points reveals the pose of the turning error as well as its distance from origin (0,0). 

In addition, clicking on individual points in the averages scatterplot (Title: Average Turning Errors) or the legend will cause the second scatterplot (Title: Selected Turning Errors) to highlight relevant items only. In addition, an image of the virtual environment (Title: Virtual Envionment) will highlight relevant items. 

