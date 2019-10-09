var i,
    xy = [[0], [], [], []];
    //xy[0] = 

CalculateXY(0.005, 1, 0, 1.5, 0.02, 20, 100000);

function CalculateXY(dt, ao, bo, co, ko, ki, n) {
    'use strict';
    // where first array holds x axis and 2nd array holds the y axis
    xy[1][0] = ao,
    xy[2][0] = bo,
    xy[3][0] = co;
    
    for (i = 1; i < (n+1); i++) {
        //increase all x axis by dt
        xy[0][i] = xy[0][i-1] + dt;
        
        var olda = xy[1][i-1],
            oldb = xy[2][i-1],
            oldc = xy[3][i-1];
        
        //change all y values by the formula
        xy[1][i] = olda + dt * ((2*ki*oldb*oldc) - (2*ko*olda*olda));
        
        xy[2][i] = oldb + dt * ((ko * Math.pow(olda, 2)) - (ki * oldb * oldc));
        
        xy[3][i] = oldc + dt * ((-ki) * oldb * oldc);
    }    
}


console.log(xy);

var trace1 = {
  x: xy[0],
  y: xy[1],
  mode: 'lines',
  name: 'A',
  text: ['A'],
  line: {shape: 'spline'},
  type: 'scatter'
};
var trace2 = {
  x: xy[0],
  y: xy[2],
  mode: 'lines',
  name: 'B',
  text: ['B'],
  line: {shape: 'spline'},
  type: 'scatter'
};
var trace3 = {
  x: xy[0],
  y: xy[3],
  mode: 'lines',
  name: 'C',
  text: ['C'],
  line: {shape: 'spline'},
  type: 'scatter'
};

var data = [trace1, trace2, trace3];

Plotly.newPlot('myDiv', data, {});
