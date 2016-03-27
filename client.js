var connection = new WebSocket('ws://192.168.0.103:8001')
connection.onmessage = function(event){
  document.getElementById('result').value = event.data;
  document.getElementById('msg').value = "";
}
