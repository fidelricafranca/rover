var connection = new WebSocket('ws://192.168.0.103:8001')
var reading = 0;
connection.onmessage = function(event){
  //document.getElementById('MQ2').innerHTML = event.data;
  reading = event.data;
  document.getElementById('reading').innerHTML = reading;
  changeColor(reading)
}

function changeColor(gas){
  if(gas<90){
    document.getElementById('gasCircle').style.backgroundColor = '#00ff00';
  }else if(gas<100){
    document.getElementById('gasCircle').style.backgroundColor = '#80ff00';
  }else if(gas<110){
    document.getElementById('gasCircle').style.backgroundColor = '#ffff00';
  }else if(gas<120){
    document.getElementById('gasCircle').style.backgroundColor = '#ffbf00';
  }else if(gas<130){
    document.getElementById('gasCircle').style.backgroundColor = '#ff8000';
  }else if(gas<140){
    document.getElementById('gasCircle').style.backgroundColor = '#ff4000';
  }else if(gas<170){
    document.getElementById('gasCircle').style.backgroundColor = '#ff0000';
  }else if(gas<200){
    document.getElementById('gasCircle').style.backgroundColor = '#990000';
  }else if(gas<250){
    document.getElementById('gasCircle').style.backgroundColor = '#800000';
  }else{
    document.getElementById('gasCircle').style.backgroundColor = '#1a0000';
  }

}

function outtahere(){
  connection.send(0);
}

function forward(){
  connection.send(4);
}

function stop(){
  connection.send(5);
}

function backward(){
  connection.send(6);
}

function right(){
  connection.send(3);
}

function left(){
  connection.send(1);
}

function front(){
  connection.send(2);
}

function look_left(){
  connection.send(7);
}

function look_front(){
  connection.send(8);
}

function look_right(){
  connection.send(9);
}
