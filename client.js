var connection = new WebSocket('ws://192.168.0.103:8001')
connection.onmessage = function(event){
  document.getElementById('result').value = event.data;
  document.getElementById('msg').value = "";
}

$('#forward_btn').on('touchstart', function(){
    forward();
 });

 $('#forward_btn').on('touchend', function(){
    stop();
  });

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
