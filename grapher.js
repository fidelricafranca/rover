window.onload = function () {

  var dps = []; // dataPoints

  var chart = new CanvasJS.Chart("chartContainer",{
    title :{
      text: "Rover Distance (cm)",
      fontColor: 'white'
    },
    data: [{
      type: "line",
      dataPoints: dps,
      color: "red"
    }],
    backgroundColor: null,
  });

  var xVal = 0;
  var yVal = 100;
  var updateInterval = 100;
  var dataLength = 50; // number of dataPoints visible at any point

  var updateChart = function (count) {
    count = count || 1;
    // count is number of times loop runs to generate random dataPoints.

    for (var j = 0; j < count; j++) {
      min = -10;
      max = 10;
      if(!isNaN(reading))
        yVal = parseInt(reading); //yVal + Math.round(min + Math.random() * (max-min));
      console.log("grapher reading: "+yVal);
      //document.getElementById('reading').innerHTML = yVal;
      dps.push({
        x: xVal,
        y: yVal
      });
      xVal++;
    };


    if (dps.length > dataLength)
    {
      dps.shift();
    }

    chart.render();
  };

  // generates first set of dataPoints
  updateChart(1);

  // update chart after specified time.
  setInterval(function(){updateChart()}, updateInterval);

}
