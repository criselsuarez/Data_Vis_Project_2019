#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Wed Nov 13 09:43:50 2019

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


filename ='//Users//csuarez//Documents//GitHub//Data_Vis_Project_2019//Spatial_Mem_Data_Adults//full_data_all.csv'

df=pd.read_csv(filename)

objectId = df[' ObjectId']
#RealStartAngle = df[' RealStartAngleX']
RealEndAngle = df[' RealEndAngleX']
PerfectEndAngle = df[' PerfectEndAngleX']

obj0 = df.where( objectId==0 )
obj1 = df.where( objectId==1 )
obj2 = df.where( objectId==2 )
obj3 = df.where( objectId==3 )
obj4 = df.where( objectId==4 )
obj5 = df.where( objectId==5 )
obj6 = df.where( objectId==6 )
obj7 = df.where( objectId==7 )
obj8 = df.where( objectId==8 )

#MEAN PERSON 

obj0_mean_x = np.mean(obj0[' RealEndAngleX'][np.isfinite(obj0[' RealEndAngleX'])].values)
obj1_mean_x = np.mean(obj1[' RealEndAngleX'][np.isfinite(obj1[' RealEndAngleX'])].values)
obj2_mean_x = np.mean(obj2[' RealEndAngleX'][np.isfinite(obj2[' RealEndAngleX'])].values)
obj3_mean_x = np.mean(obj3[' RealEndAngleX'][np.isfinite(obj3[' RealEndAngleX'])].values)
obj4_mean_x = np.mean(obj4[' RealEndAngleX'][np.isfinite(obj4[' RealEndAngleX'])].values)
obj5_mean_x = np.mean(obj5[' RealEndAngleX'][np.isfinite(obj5[' RealEndAngleX'])].values)
obj6_mean_x = np.mean(obj6[' RealEndAngleX'][np.isfinite(obj6[' RealEndAngleX'])].values)
obj7_mean_x = np.mean(obj7[' RealEndAngleX'][np.isfinite(obj7[' RealEndAngleX'])].values)
obj8_mean_x = np.mean(obj8[' RealEndAngleX'][np.isfinite(obj8[' RealEndAngleX'])].values)

obj0_mean_y = np.mean(obj0[' RealEndAngleY'][np.isfinite(obj0[' RealEndAngleY'])].values)
obj1_mean_y = np.mean(obj1[' RealEndAngleY'][np.isfinite(obj1[' RealEndAngleY'])].values)
obj2_mean_y = np.mean(obj2[' RealEndAngleY'][np.isfinite(obj2[' RealEndAngleY'])].values)
obj3_mean_y = np.mean(obj3[' RealEndAngleY'][np.isfinite(obj3[' RealEndAngleY'])].values)
obj4_mean_y = np.mean(obj4[' RealEndAngleY'][np.isfinite(obj4[' RealEndAngleY'])].values)
obj5_mean_y = np.mean(obj5[' RealEndAngleY'][np.isfinite(obj5[' RealEndAngleY'])].values)
obj6_mean_y = np.mean(obj6[' RealEndAngleY'][np.isfinite(obj6[' RealEndAngleY'])].values)
obj7_mean_y = np.mean(obj7[' RealEndAngleY'][np.isfinite(obj7[' RealEndAngleY'])].values)
obj8_mean_y = np.mean(obj8[' RealEndAngleY'][np.isfinite(obj8[' RealEndAngleY'])].values)

# STD PERSON 
obj0_std_x = np.std(obj0[' RealEndAngleX'][np.isfinite(obj0[' RealEndAngleX'])].values, ddof=1)
obj1_std_x = np.std(obj1[' RealEndAngleX'][np.isfinite(obj1[' RealEndAngleX'])].values, ddof=1)
obj2_std_x = np.std(obj2[' RealEndAngleX'][np.isfinite(obj2[' RealEndAngleX'])].values, ddof=1)
obj3_std_x = np.std(obj3[' RealEndAngleX'][np.isfinite(obj3[' RealEndAngleX'])].values, ddof=1)
obj4_std_x = np.std(obj4[' RealEndAngleX'][np.isfinite(obj4[' RealEndAngleX'])].values, ddof=1)
obj5_std_x = np.std(obj5[' RealEndAngleX'][np.isfinite(obj5[' RealEndAngleX'])].values, ddof=1)
obj6_std_x = np.std(obj6[' RealEndAngleX'][np.isfinite(obj6[' RealEndAngleX'])].values, ddof=1)
obj7_std_x = np.std(obj7[' RealEndAngleX'][np.isfinite(obj7[' RealEndAngleX'])].values, ddof=1)
obj8_std_x = np.std(obj8[' RealEndAngleX'][np.isfinite(obj8[' RealEndAngleX'])].values, ddof=1)

obj0_std_y = np.std(obj0[' RealEndAngleY'][np.isfinite(obj0[' RealEndAngleY'])].values, ddof=1)
obj1_std_y = np.std(obj1[' RealEndAngleY'][np.isfinite(obj1[' RealEndAngleY'])].values, ddof=1)
obj2_std_y = np.std(obj2[' RealEndAngleY'][np.isfinite(obj2[' RealEndAngleY'])].values, ddof=1)
obj3_std_y = np.std(obj3[' RealEndAngleY'][np.isfinite(obj3[' RealEndAngleY'])].values, ddof=1)
obj4_std_y = np.std(obj4[' RealEndAngleY'][np.isfinite(obj4[' RealEndAngleY'])].values, ddof=1)
obj5_std_y = np.std(obj5[' RealEndAngleY'][np.isfinite(obj5[' RealEndAngleY'])].values, ddof=1)
obj6_std_y = np.std(obj6[' RealEndAngleY'][np.isfinite(obj6[' RealEndAngleY'])].values, ddof=1)
obj7_std_y = np.std(obj7[' RealEndAngleY'][np.isfinite(obj7[' RealEndAngleY'])].values, ddof=1)
obj8_std_y = np.std(obj8[' RealEndAngleY'][np.isfinite(obj8[' RealEndAngleY'])].values, ddof=1)




# MEAN PERFECT 
obj0_mean_x_perfect = np.mean(obj0[' PerfectEndAngleX'][np.isfinite(obj0[' PerfectEndAngleX'])].values)
obj1_mean_x_perfect = np.mean(obj1[' PerfectEndAngleX'][np.isfinite(obj1[' PerfectEndAngleX'])].values)
obj2_mean_x_perfect = np.mean(obj2[' PerfectEndAngleX'][np.isfinite(obj2[' PerfectEndAngleX'])].values)
obj3_mean_x_perfect = np.mean(obj3[' PerfectEndAngleX'][np.isfinite(obj3[' PerfectEndAngleX'])].values)
obj4_mean_x_perfect = np.mean(obj4[' PerfectEndAngleX'][np.isfinite(obj4[' PerfectEndAngleX'])].values)
obj5_mean_x_perfect = np.mean(obj5[' PerfectEndAngleX'][np.isfinite(obj5[' PerfectEndAngleX'])].values)
obj6_mean_x_perfect = np.mean(obj6[' PerfectEndAngleX'][np.isfinite(obj6[' PerfectEndAngleX'])].values)
obj7_mean_x_perfect = np.mean(obj7[' PerfectEndAngleX'][np.isfinite(obj7[' PerfectEndAngleX'])].values)
obj8_mean_x_perfect = np.mean(obj8[' PerfectEndAngleX'][np.isfinite(obj8[' PerfectEndAngleX'])].values)

obj0_mean_y_perfect = np.mean(obj0[' PerfectEndAngleY'][np.isfinite(obj0[' PerfectEndAngleY'])].values)
obj1_mean_y_perfect = np.mean(obj1[' PerfectEndAngleY'][np.isfinite(obj1[' PerfectEndAngleY'])].values)
obj2_mean_y_perfect = np.mean(obj2[' PerfectEndAngleY'][np.isfinite(obj2[' PerfectEndAngleY'])].values)
obj3_mean_y_perfect = np.mean(obj3[' PerfectEndAngleY'][np.isfinite(obj3[' PerfectEndAngleY'])].values)
obj4_mean_y_perfect = np.mean(obj4[' PerfectEndAngleY'][np.isfinite(obj4[' PerfectEndAngleY'])].values)
obj5_mean_y_perfect = np.mean(obj5[' PerfectEndAngleY'][np.isfinite(obj5[' PerfectEndAngleY'])].values)
obj6_mean_y_perfect = np.mean(obj6[' PerfectEndAngleY'][np.isfinite(obj6[' PerfectEndAngleY'])].values)
obj7_mean_y_perfect = np.mean(obj7[' PerfectEndAngleY'][np.isfinite(obj7[' PerfectEndAngleY'])].values)
obj8_mean_y_perfect = np.mean(obj8[' PerfectEndAngleY'][np.isfinite(obj8[' PerfectEndAngleY'])].values)



# STD PERFECT 





'''
ax = plt.subplot(111, projection='polar') # theta, r 
alph = .5
ax.plot(np.deg2rad(obj0_mean_x), np.deg2rad(obj0_mean_y), ls ='None', marker = 'o', color = 'green' , alpha = alph)
ax.plot(np.deg2rad(obj1_mean_x), np.deg2rad(obj1_mean_y), ls ='None', marker = 'o', color = 'red' , alpha = alph)
ax.plot(np.deg2rad(obj2_mean_x), np.deg2rad(obj2_mean_y), ls ='None', marker = 'o', color = 'orange' , alpha = alph)
ax.plot(np.deg2rad(obj3_mean_x), np.deg2rad(obj3_mean_y), ls ='None', marker = 'o', color = 'blue' , alpha = alph)
ax.plot(np.deg2rad(obj4_mean_x), np.deg2rad(obj4_mean_y), ls ='None', marker = 'o', color = 'black' , alpha = alph)
ax.plot(np.deg2rad(obj5_mean_x), np.deg2rad(obj5_mean_y), ls ='None', marker = 'o', color = 'magenta' , alpha = alph)
ax.plot(np.deg2rad(obj6_mean_x), np.deg2rad(obj6_mean_y), ls ='None', marker = 'o', color = 'goldenrod' , alpha = alph)
ax.plot(np.deg2rad(obj7_mean_x), np.deg2rad(obj7_mean_y), ls ='None', marker = 'o', color = 'lime' , alpha = alph)
ax.plot(np.deg2rad(obj8_mean_x), np.deg2rad(obj8_mean_y), ls ='None', marker = 'o', color = 'darkviolet' , alpha = alph)


lw_size = 3.4

ax.plot((np.deg2rad(obj0_mean_x-obj0_std_x), np.deg2rad(obj0_mean_x+obj0_std_x)) , (np.deg2rad(obj0_mean_y-obj0_std_y), np.deg2rad(obj0_mean_y+obj0_std_y)) , color = 'green', lw = lw_size, alpha = alph )
ax.plot((np.deg2rad(obj1_mean_x-obj1_std_x), np.deg2rad(obj1_mean_x+obj1_std_x)) , (np.deg2rad(obj1_mean_y-obj1_std_y), np.deg2rad(obj1_mean_y+obj1_std_y)) , color = 'red', lw = lw_size, alpha = alph )
ax.plot((np.deg2rad(obj2_mean_x-obj2_std_x), np.deg2rad(obj2_mean_x+obj2_std_x)) , (np.deg2rad(obj2_mean_y-obj2_std_y), np.deg2rad(obj2_mean_y+obj2_std_y)) , color = 'orange', lw = lw_size, alpha = alph )
ax.plot((np.deg2rad(obj3_mean_x-obj3_std_x), np.deg2rad(obj3_mean_x+obj3_std_x)) , (np.deg2rad(obj3_mean_y-obj3_std_y), np.deg2rad(obj3_mean_y+obj3_std_y)) , color = 'blue', lw = lw_size, alpha = alph )
ax.plot((np.deg2rad(obj4_mean_x-obj4_std_x), np.deg2rad(obj4_mean_x+obj4_std_x)) , (np.deg2rad(obj4_mean_y-obj4_std_y), np.deg2rad(obj4_mean_y+obj4_std_y)) , color = 'black', lw = lw_size, alpha = alph )
ax.plot((np.deg2rad(obj5_mean_x-obj5_std_x), np.deg2rad(obj5_mean_x+obj5_std_x)) , (np.deg2rad(obj5_mean_y-obj5_std_y), np.deg2rad(obj5_mean_y+obj5_std_y)) , color = 'magenta', lw = lw_size, alpha = alph )
ax.plot((np.deg2rad(obj6_mean_x-obj6_std_x), np.deg2rad(obj6_mean_x+obj6_std_x)) , (np.deg2rad(obj6_mean_y-obj6_std_y), np.deg2rad(obj6_mean_y+obj6_std_y)) , color = 'goldenrod', lw = lw_size, alpha = alph )
ax.plot((np.deg2rad(obj7_mean_x-obj7_std_x), np.deg2rad(obj7_mean_x+obj7_std_x)) , (np.deg2rad(obj7_mean_y-obj7_std_y), np.deg2rad(obj7_mean_y+obj7_std_y)) , color = 'lime', lw = lw_size, alpha = alph )
ax.plot((np.deg2rad(obj8_mean_x-obj8_std_x), np.deg2rad(obj8_mean_x+obj8_std_x)) , (np.deg2rad(obj8_mean_y-obj8_std_y), np.deg2rad(obj8_mean_y+obj8_std_y)) , color = 'darkviolet', lw = lw_size, alpha = alph )



alph = 1 
ax.plot(np.deg2rad(obj0_mean_x_perfect), np.deg2rad(obj0_mean_y_perfect), ls ='None', marker = '*', color = 'green' , alpha = alph)
ax.plot(np.deg2rad(obj1_mean_x_perfect), np.deg2rad(obj1_mean_y_perfect), ls ='None', marker = '*', color = 'red' , alpha = alph)
ax.plot(np.deg2rad(obj2_mean_x_perfect), np.deg2rad(obj2_mean_y_perfect), ls ='None', marker = '*', color = 'orange' , alpha = alph)
ax.plot(np.deg2rad(obj3_mean_x_perfect), np.deg2rad(obj3_mean_y_perfect), ls ='None', marker = '*', color = 'blue' , alpha = alph)
ax.plot(np.deg2rad(obj4_mean_x_perfect), np.deg2rad(obj4_mean_y_perfect), ls ='None', marker = '*', color = 'black' , alpha = alph)
ax.plot(np.deg2rad(obj5_mean_x_perfect), np.deg2rad(obj5_mean_y_perfect), ls ='None', marker = '*', color = 'magenta' , alpha = alph)
ax.plot(np.deg2rad(obj6_mean_x_perfect), np.deg2rad(obj6_mean_y_perfect), ls ='None', marker = '*', color = 'goldenrod' , alpha = alph)
ax.plot(np.deg2rad(obj7_mean_x_perfect), np.deg2rad(obj7_mean_y_perfect), ls ='None', marker = '*', color = 'lime' , alpha = alph)
ax.plot(np.deg2rad(obj8_mean_x_perfect), np.deg2rad(obj8_mean_y_perfect), ls ='None', marker = '*', color = 'darkviolet' , alpha = alph)


ax.set_rmax(np.pi*2)
ax.xaxis.grid(False)
ax.set_yticklabels(['0', '90', '180', '270', '360'])

'''
ax2 = plt.subplot(212) # theta, r 

alph = .5
ax2.errorbar(obj0_mean_x, obj0_mean_y, xerr = obj0_std_x, yerr = obj0_std_y, marker = 'o', color = 'green' , alpha = alph)
ax2.errorbar(obj1_mean_x, obj1_mean_y, xerr = obj1_std_x, yerr = obj1_std_y, marker = 'o', color = 'red' , alpha = alph)
ax2.errorbar(obj2_mean_x, obj2_mean_y, xerr = obj2_std_x, yerr = obj2_std_y, marker = 'o', color = 'orange' , alpha = alph)
ax2.errorbar(obj3_mean_x, obj3_mean_y, xerr = obj3_std_x, yerr = obj3_std_y, marker = 'o', color = 'blue' , alpha = alph)
ax2.errorbar(obj4_mean_x, obj4_mean_y, xerr = obj4_std_x, yerr = obj4_std_y, marker = 'o', color = 'black' , alpha = alph)
ax2.errorbar(obj5_mean_x, obj5_mean_y, xerr = obj5_std_x, yerr = obj5_std_y, marker = 'o', color = 'magenta' , alpha = alph)
ax2.errorbar(obj6_mean_x, obj6_mean_y, xerr = obj6_std_x, yerr = obj6_std_y, marker = 'o', color = 'goldenrod' , alpha = alph)
ax2.errorbar(obj7_mean_x, obj7_mean_y, xerr = obj7_std_x, yerr = obj7_std_y, marker = 'o', color = 'lime' , alpha = alph)
ax2.errorbar(obj8_mean_x, obj8_mean_y, xerr = obj8_std_x, yerr = obj8_std_y, marker = 'o', color = 'darkviolet' , alpha = alph)




alph = .75
ax2.plot(obj0_mean_x_perfect, obj0_mean_y_perfect, marker = '*', color = 'green' , alpha = alph)
ax2.plot(obj1_mean_x_perfect, obj1_mean_y_perfect, marker = '*', color = 'red' , alpha = alph)
ax2.plot(obj2_mean_x_perfect, obj2_mean_y_perfect, marker = '*', color = 'orange' , alpha = alph)
ax2.plot(obj3_mean_x_perfect, obj3_mean_y_perfect, marker = '*', color = 'blue' , alpha = alph)
ax2.plot(obj4_mean_x_perfect, obj4_mean_y_perfect, marker = '*', color = 'black' , alpha = alph)
ax2.plot(obj5_mean_x_perfect, obj5_mean_y_perfect, marker = '*', color = 'magenta' , alpha = alph)
ax2.plot(obj6_mean_x_perfect, obj6_mean_y_perfect, marker = '*', color = 'goldenrod' , alpha = alph)
ax2.plot(obj7_mean_x_perfect, obj7_mean_y_perfect, marker = '*', color = 'lime' , alpha = alph)
ax2.plot(obj8_mean_x_perfect, obj8_mean_y_perfect, marker = '*', color = 'darkviolet' , alpha = alph)


plt.ylabel('y angle error')
plt.xlabel('x angle error')

#'''




