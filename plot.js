if (confirm('Please run this on a browser without any important tabs, as placing in crazy n values will crash the browser! Cancle to stop any processing')) {
    CalculateXY(0.005, 1, 0, 1.5, 0.02, 20, 100000);
    document.getElementById('n').value = 100000;
    document.getElementById('dt').value = 0.005;      
    Plotly.newPlot('myDiv', data, {});
} else {
    document.getElementById('n').style.display = 'none';
    document.getElementById('dt').style.display = 'none';
}

var i,
    xy = [[0], [], [], []],
    trace1,
    trace2,
    trace3,
    data;

function buttonpress() {
    'use strict';
    var newdt = Number(document.getElementById('dt').value),
        newn = Number(document.getElementById('n').value);
    if (newn > 100000) {
        if (confirm('Are you sure you want to proceed? n number is very large, it may take some time to calculate!')) {
            CalculateXY(newdt, 1, 0, 1.5, 0.02, 20, newn);
        }
    } else {
        CalculateXY(newdt, 1, 0, 1.5, 0.02, 20, newn);
    }
}

function CalculateXY(dt, ao, bo, co, ko, ki, n) {
    'use strict';    
    // where first array holds x axis and 2nd array holds the y axis
    xy = [[0], [], [], []],
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
    console.log(xy);
    datareset();
    alert('All calculations done!');
}

function datareset(){
    'use strict';
    trace1 = {
      x: xy[0],
      y: xy[1],
      mode: 'lines',
      name: 'A',
      text: ['A'],
      line: {shape: 'spline'},
      type: 'scatter'
    };
    trace2 = {
      x: xy[0],
      y: xy[2],
      mode: 'lines',
      name: 'B',
      text: ['B'],
      line: {shape: 'spline'},
      type: 'scatter'
    };
    trace3 = {
      x: xy[0],
      y: xy[3],
      mode: 'lines',
      name: 'C',
      text: ['C'],
      line: {shape: 'spline'},
      type: 'scatter'
    };

    data = [trace1, trace2, trace3];
    Plotly.react('myDiv', data, {});
}
