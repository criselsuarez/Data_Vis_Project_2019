#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Tue Nov 12 19:00:25 2019

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


filename ='//Users//csuarez//Documents//GitHub//Data_Vis_Project_2019//Spatial Mem Data (Adults)//stairs_full_r1_05PK.csv'

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

rad = np.ones(3)
ax = plt.subplot(111, projection='polar') # theta, r 
#ax.plot(np.deg2rad(obj0[' RealEndAngleY'])[np.isfinite(obj0[' RealEndAngleY'])], rad, marker = 'o', color = 'green')

alph = 0.25 
ax.plot(np.deg2rad(obj0[' RealEndAngleX'][np.isfinite(obj0[' RealEndAngleX'])].values[1]), np.deg2rad(obj0[' RealEndAngleY'][np.isfinite(obj0[' RealEndAngleY'])].values[1]), ls ='None', marker = 'o', color = 'green' , alpha = alph)
ax.plot(np.deg2rad(obj1[' RealEndAngleX'][np.isfinite(obj1[' RealEndAngleX'])].values[1]), np.deg2rad(obj1[' RealEndAngleY'][np.isfinite(obj1[' RealEndAngleY'])].values[1]), ls ='None', marker = 'o', color = 'red', alpha = alph)
ax.plot(np.deg2rad(obj2[' RealEndAngleX'][np.isfinite(obj2[' RealEndAngleX'])].values[1]), np.deg2rad(obj2[' RealEndAngleY'][np.isfinite(obj2[' RealEndAngleY'])].values[1]), ls ='None', marker = 'o', color = 'orange', alpha = alph)
ax.plot(np.deg2rad(obj3[' RealEndAngleX'][np.isfinite(obj3[' RealEndAngleX'])].values[1]), np.deg2rad(obj3[' RealEndAngleY'][np.isfinite(obj3[' RealEndAngleY'])].values[1]), ls ='None', marker = 'o', color = 'blue', alpha = alph)
ax.plot(np.deg2rad(obj4[' RealEndAngleX'][np.isfinite(obj4[' RealEndAngleX'])].values[1]), np.deg2rad(obj4[' RealEndAngleY'][np.isfinite(obj4[' RealEndAngleY'])].values[1]), ls ='None', marker = 'o', color = 'black', alpha = alph)
ax.plot(np.deg2rad(obj5[' RealEndAngleX'][np.isfinite(obj5[' RealEndAngleX'])].values[1]), np.deg2rad(obj5[' RealEndAngleY'][np.isfinite(obj5[' RealEndAngleY'])].values[1]), ls ='None', marker = 'o', color = 'magenta', alpha = alph)
ax.plot(np.deg2rad(obj6[' RealEndAngleX'][np.isfinite(obj6[' RealEndAngleX'])].values[1]), np.deg2rad(obj6[' RealEndAngleY'][np.isfinite(obj6[' RealEndAngleY'])].values[1]), ls ='None', marker = 'o', color = 'goldenrod', alpha = alph)
ax.plot(np.deg2rad(obj7[' RealEndAngleX'][np.isfinite(obj7[' RealEndAngleX'])].values[1]), np.deg2rad(obj7[' RealEndAngleY'][np.isfinite(obj7[' RealEndAngleY'])].values[1]), ls ='None', marker = 'o', color = 'lime', alpha = alph)
ax.plot(np.deg2rad(obj8[' RealEndAngleX'][np.isfinite(obj8[' RealEndAngleX'])].values[1]), np.deg2rad(obj8[' RealEndAngleY'][np.isfinite(obj8[' RealEndAngleY'])].values[1]), ls ='None', marker = 'o', color = 'darkviolet', alpha = alph)



ax.plot(np.deg2rad(obj3[' RealEndAngleX'][np.isfinite(obj3[' RealEndAngleX'])]), np.deg2rad(obj3[' RealEndAngleY'][np.isfinite(obj3[' RealEndAngleY'])]), ls ='None', marker = 'o', color = 'blue', alpha = alph)


#ax.set_rgrids(['0', '45', '90', '135', '180'])
#ax.scatter(np.radians(200), np.radians(135), marker = 'o', color = 'red')
ax.set_rmax(np.pi*2)
ax.xaxis.grid(False)
ax.set_yticklabels(['0', '90', '180', '270', '360'])
#ax.grid('False')
#ax.set_xticklabels(['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'], color='#666666', fontsize=8)  # Customize the xtick labels
#ax.spines['polar'].set_visible(False)  # Show or hide the plot spine



med_ob0 = np.deg2rad(obj0[' PerfectEndAngleX'][np.isfinite(obj0[' PerfectEndAngleX'])].values[1])
med_ob1 = np.deg2rad(obj1[' PerfectEndAngleX'][np.isfinite(obj1[' PerfectEndAngleX'])].values[1])
med_ob2 = np.deg2rad(obj2[' PerfectEndAngleX'][np.isfinite(obj2[' PerfectEndAngleX'])].values[1])
med_ob3 = np.deg2rad(obj3[' PerfectEndAngleX'][np.isfinite(obj3[' PerfectEndAngleX'])].values[1])
med_ob4 = np.deg2rad(obj4[' PerfectEndAngleX'][np.isfinite(obj4[' PerfectEndAngleX'])].values[1])
med_ob5 = np.deg2rad(obj5[' PerfectEndAngleX'][np.isfinite(obj5[' PerfectEndAngleX'])].values[1])
med_ob6 = np.deg2rad(obj6[' PerfectEndAngleX'][np.isfinite(obj6[' PerfectEndAngleX'])].values[1])
med_ob7 = np.deg2rad(obj7[' PerfectEndAngleX'][np.isfinite(obj7[' PerfectEndAngleX'])].values[1])
med_ob8 = np.deg2rad(obj8[' PerfectEndAngleX'][np.isfinite(obj8[' PerfectEndAngleX'])].values[1])


med_ob0_y = np.deg2rad(obj0[' PerfectEndAngleY'][np.isfinite(obj0[' PerfectEndAngleY'])].values[1])
med_ob1_y = np.deg2rad(obj1[' PerfectEndAngleY'][np.isfinite(obj1[' PerfectEndAngleY'])].values[1])
med_ob2_y = np.deg2rad(obj2[' PerfectEndAngleY'][np.isfinite(obj2[' PerfectEndAngleY'])].values[1])
med_ob3_y = np.deg2rad(obj3[' PerfectEndAngleY'][np.isfinite(obj3[' PerfectEndAngleY'])].values[1])
med_ob4_y = np.deg2rad(obj4[' PerfectEndAngleY'][np.isfinite(obj4[' PerfectEndAngleY'])].values[1])
med_ob5_y = np.deg2rad(obj5[' PerfectEndAngleY'][np.isfinite(obj5[' PerfectEndAngleY'])].values[1])
med_ob6_y = np.deg2rad(obj6[' PerfectEndAngleY'][np.isfinite(obj6[' PerfectEndAngleY'])].values[1])
med_ob7_y = np.deg2rad(obj7[' PerfectEndAngleY'][np.isfinite(obj7[' PerfectEndAngleY'])].values[1])
med_ob8_y = np.deg2rad(obj8[' PerfectEndAngleY'][np.isfinite(obj8[' PerfectEndAngleY'])].values[1])




lw_size = 3
#ax.plot(( med_ob0, med_ob0) , (0.75, med_ob0_y) , color = 'red', lw = lw_size )
ax.plot( med_ob0 , med_ob0_y , ls ='None', marker = 'o', color = 'green')
ax.plot( med_ob1 , med_ob1_y , ls ='None', marker = 'o', color = 'red')
ax.plot( med_ob2 , med_ob2_y , ls ='None', marker = 'o', color = 'orange')
ax.plot( med_ob3 , med_ob3_y , ls ='None', marker = 'o', color = 'blue')
ax.plot( med_ob4 , med_ob4_y , ls ='None', marker = 'o', color = 'black')
ax.plot( med_ob5 , med_ob5_y , ls ='None', marker = 'o', color = 'magenta')
ax.plot( med_ob6 , med_ob6_y , ls ='None', marker = 'o', color = 'goldenrod')
ax.plot( med_ob7 , med_ob7_y , ls ='None', marker = 'o', color = 'lime')
ax.plot( med_ob8 , med_ob8_y , ls ='None', marker = 'o', color = 'darkviolet')


'''

ax2 = plt.subplot(212)  

alph = .5
ax.plot(np.deg2rad(obj3[' RealEndAngleX'][np.isfinite(obj3[' RealEndAngleX'])]), np.deg2rad(obj3[' RealEndAngleY'][np.isfinite(obj3[' RealEndAngleY'])]), ls ='None', marker = 'o', color = 'blue', alpha = alph)

ax2.scatter(obj0[' RealEndAngleX'][np.isfinite(obj0[' RealEndAngleX'])], obj0[' RealEndAngleY'][np.isfinite(obj0[' RealEndAngleY'])], marker = 'o', color = 'green' , alpha = alph)
ax2.scatter(obj1[' RealEndAngleX'][np.isfinite(obj1[' RealEndAngleX'])], obj1[' RealEndAngleY'][np.isfinite(obj1[' RealEndAngleY'])], marker = 'o', color = 'red' , alpha = alph)
ax2.scatter(obj2[' RealEndAngleX'][np.isfinite(obj2[' RealEndAngleX'])], obj2[' RealEndAngleY'][np.isfinite(obj2[' RealEndAngleY'])], marker = 'o', color = 'orange' , alpha = alph)
ax2.scatter(obj3[' RealEndAngleX'][np.isfinite(obj3[' RealEndAngleX'])], obj3[' RealEndAngleY'][np.isfinite(obj3[' RealEndAngleY'])], marker = 'o', color = 'blue' , alpha = alph)
ax2.scatter(obj4[' RealEndAngleX'][np.isfinite(obj4[' RealEndAngleX'])], obj4[' RealEndAngleY'][np.isfinite(obj4[' RealEndAngleY'])], marker = 'o', color = 'black' , alpha = alph)
ax2.scatter(obj5[' RealEndAngleX'][np.isfinite(obj5[' RealEndAngleX'])], obj5[' RealEndAngleY'][np.isfinite(obj5[' RealEndAngleY'])], marker = 'o', color = 'magenta' , alpha = alph)
ax2.scatter(obj6[' RealEndAngleX'][np.isfinite(obj6[' RealEndAngleX'])], obj6[' RealEndAngleY'][np.isfinite(obj6[' RealEndAngleY'])], marker = 'o', color = 'goldenrod' , alpha = alph)
ax2.scatter(obj7[' RealEndAngleX'][np.isfinite(obj7[' RealEndAngleX'])], obj7[' RealEndAngleY'][np.isfinite(obj7[' RealEndAngleY'])], marker = 'o', color = 'lime' , alpha = alph)
ax2.scatter(obj8[' RealEndAngleX'][np.isfinite(obj8[' RealEndAngleX'])], obj8[' RealEndAngleY'][np.isfinite(obj8[' RealEndAngleY'])], marker = 'o', color = 'darkviolet' , alpha = alph)


ax2.plot( np.rad2deg(med_ob0) , np.rad2deg(med_ob0_y) , marker = '*', color = 'green')
ax2.plot( np.rad2deg(med_ob1) , np.rad2deg(med_ob1_y) , marker = '*', color = 'red')
ax2.plot( np.rad2deg(med_ob2) , np.rad2deg(med_ob2_y) , marker = '*', color = 'orange')
ax2.plot( np.rad2deg(med_ob3) , np.rad2deg(med_ob3_y) , marker = '*', color = 'blue')
ax2.plot( np.rad2deg(med_ob4) , np.rad2deg(med_ob4_y) , marker = '*', color = 'black')
ax2.plot( np.rad2deg(med_ob5) , np.rad2deg(med_ob5_y) , marker = '*', color = 'magenta')
ax2.plot( np.rad2deg(med_ob6) , np.rad2deg(med_ob6_y) , marker = '*', color = 'goldenrod')
ax2.plot( np.rad2deg(med_ob7) , np.rad2deg(med_ob7_y) , marker = '*', color = 'lime')
ax2.plot( np.rad2deg(med_ob8) , np.rad2deg(med_ob8_y) , marker = '*', color = 'darkviolet')


'''


