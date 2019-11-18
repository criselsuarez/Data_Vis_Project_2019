#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Tue Nov  5 20:35:29 2019

@author: csuarez
"""

import astropy.units as u
import matplotlib.pyplot as plt
import astropy.modeling.blackbody as astr
from astropy import units as u
from astropy import constants as const
import scipy.optimize as sci
import pandas as pd
from fractions import Fraction
import numpy as np
import matplotlib as mlp



'''
Average Perfect End Angle for all participants 

Perfect End Angle where teddy bear is 
Real End Angle where particioant ended 
'''


filename ='//Users//csuarez//Documents//GitHub//Data_Vis_Project_2019//Spatial_Mem_Data_Adults//stairs_full_r1_05PK.csv'

df=pd.read_csv(filename)

ObjectID = df[' ObjectId']
#RealStartAngle = df[' RealStartAngleX']
RealEndAngle = df[' RealEndAngleX']
PerfectEndAngle = df[' PerfectEndAngleX']

obj0 = []
obj1 = []
obj2 = []
obj3 = []
obj4 = []
obj5 = []
obj6 = []
obj7 = []
obj8 = []

obj0_true_pos = []
obj1_true_pos = []
obj2_true_pos = []
obj3_true_pos = []
obj4_true_pos = []
obj5_true_pos = []
obj6_true_pos = []
obj7_true_pos = []
obj8_true_pos = []


obj_true_position = [] 

def degrees_to_rad(degree):
    radian = 2. * np.pi*(degree)/360.
    return radian


for i in range(len(ObjectID)):
    if ObjectID[i] == 0:
        obj0_true_pos.append(PerfectEndAngle[i])
        obj0 = np.append(obj0,(RealEndAngle[i]))
    
    if ObjectID[i] == 1:
        obj1_true_pos.append(PerfectEndAngle[i])
        obj1 = np.append(obj1,(RealEndAngle[i]))
    
    if ObjectID[i] == 2:
       # obj2.append(RealStartAngle[i])
        #obj2.append(RealEndAngle[i]) # persons data 
        obj2_true_pos.append(PerfectEndAngle[i]) #np.append(obj, PerfectEndAngle[i])
        #obj_new = np.append([obj] , [obj2], axis =0)
        obj2 = np.append(obj2,(RealEndAngle[i]))

    if ObjectID[i] == 3:
        obj3_true_pos.append(PerfectEndAngle[i])
        obj3 = np.append(obj3,(RealEndAngle[i]))
    
    if ObjectID[i] == 4:
        obj4_true_pos.append(PerfectEndAngle[i])
        obj4 = np.append(obj4,(RealEndAngle[i]))
        
    if ObjectID[i] == 5:
        obj5_true_pos.append(PerfectEndAngle[i])
        obj5 = np.append(obj5,(RealEndAngle[i]))
        
    if ObjectID[i] == 6:
        obj6_true_pos.append(PerfectEndAngle[i])
        obj6 = np.append(obj6,(RealEndAngle[i]))
          
    if ObjectID[i] == 7:
        obj7_true_pos.append(PerfectEndAngle[i])
        obj7 = np.append(obj7,(RealEndAngle[i]))
    
    if ObjectID[i] == 8:
        obj8_true_pos.append(PerfectEndAngle[i])
        obj8 = np.append(obj8,(RealEndAngle[i]))
         

obj0_true_pos = degrees_to_rad(np.mean(obj0_true_pos))
obj1_true_pos = degrees_to_rad(np.mean(obj1_true_pos))
obj2_true_pos = degrees_to_rad(np.mean(obj2_true_pos))
obj3_true_pos = degrees_to_rad(np.mean(obj3_true_pos))
obj4_true_pos = degrees_to_rad(np.mean(obj4_true_pos))
obj5_true_pos = degrees_to_rad(np.mean(obj5_true_pos))
obj6_true_pos = degrees_to_rad(np.mean(obj6_true_pos))
obj7_true_pos = degrees_to_rad(np.mean(obj7_true_pos))
obj8_true_pos = degrees_to_rad(np.mean(obj8_true_pos))

        
        
ax = plt.subplot(111, projection='polar')
   
radius_true_pos = np.ones(1)

lw_size = 3

ax.plot(( obj0_true_pos, obj0_true_pos) , (0.75, radius_true_pos) , color = 'red', lw = lw_size )
ax.plot(( obj1_true_pos, obj1_true_pos) , (0.75, radius_true_pos) , color = 'orange', lw = lw_size)
ax.plot(( obj2_true_pos, obj2_true_pos) , (0.75, radius_true_pos) , color = 'deeppink', lw = lw_size)
ax.plot(( obj3_true_pos, obj3_true_pos) , (0.75, radius_true_pos) , color = 'lime', lw = lw_size)
ax.plot(( obj4_true_pos, obj4_true_pos) , (0.75, radius_true_pos) , color = 'darkgreen', lw = lw_size)
ax.plot(( obj5_true_pos, obj5_true_pos) , (0.75, radius_true_pos) , color = 'aqua', lw = lw_size)
ax.plot(( obj6_true_pos, obj6_true_pos) , (0.75, radius_true_pos), color = 'blue', lw = lw_size)
ax.plot(( obj7_true_pos, obj7_true_pos) , (0.75, radius_true_pos) , color = 'darkviolet', lw = lw_size)
ax.plot(( obj8_true_pos, obj8_true_pos) , (0.75, radius_true_pos), color = 'black', lw = lw_size)


#ax.plot(obj8_true_pos , radius_true_pos , color = 'black', marker='o', markersize = 10)


radius_partcipants = np.array([0.85])# ,1, 1]) #np.ones(3)
radius_partcipants2 = np.array([.85, .85, .85]) #  np.ones(2)

mk_size = 20
alph_value = 1

ax.plot(degrees_to_rad(obj0[2]) , radius_partcipants , color = 'red', marker='.', ls ='None', markersize = mk_size, alpha=alph_value)
ax.plot(degrees_to_rad(obj1[2]) , radius_partcipants , color = 'orange', marker='.', ls ='None', markersize = mk_size, alpha=alph_value)
ax.plot(degrees_to_rad(obj2[2]) , radius_partcipants , color = 'deeppink', marker='.', ls ='None', markersize = mk_size, alpha=alph_value)
ax.plot(degrees_to_rad(obj3[2]) , radius_partcipants , color = 'lime', marker='.', ls ='None', markersize = mk_size, alpha=alph_value)
ax.plot(degrees_to_rad(obj4[2]) , radius_partcipants , color = 'darkgreen', marker='.', ls ='None', markersize = mk_size, alpha=alph_value)
ax.plot(degrees_to_rad(obj5[2]) , radius_partcipants , color = 'aqua', marker='.', ls ='None', markersize = mk_size, alpha=alph_value)
#ax.plot(degrees_to_rad(obj6[2]) , radius_partcipants , color = 'blue', marker='.', ls ='None', markersize = mk_size, alpha=alph_value)
ax.plot(degrees_to_rad(obj7[2]) , radius_partcipants , color = 'darkviolet', marker='.', ls ='None', markersize = mk_size, alpha=alph_value)
ax.plot(degrees_to_rad(obj8[1]) , radius_partcipants , color = 'black', marker='.', ls ='None', markersize = mk_size, alpha=alph_value)

ax.plot(degrees_to_rad(obj6) , radius_partcipants2 , color = 'royalblue', marker='.', ls ='None', markersize = mk_size, alpha=0.75)


#ax.yaxis.grid(False)

ax.set_rmax(1)
ax.set_rticks([2])#[0, .2, .42])
ax.grid('False')