var app = require('http').createServer(handler)
var SerialPort = require("serialport").SerialPort
var ws = require("nodejs-websocket")
var url = require('url')
var fs = require('fs')


//setup serialport
var sp = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600
}, false);

sp.open( function(error) {
  if (error) {
    console.log("Failed to open: "+ error);
  } else {
    console.log('Serialport open.');
    sp.on('data', function(data){
      console.log('data received '+data);
    })
  }
})

//websocket server
var server = ws.createServer( function(conn){
  console.log("Connection established")
  conn.on("text", function(str){
      conn.sendText(str.toUpperCase()+"!!!");
      console.log("Received " + str);
      sp.write(str);
  })

  conn.on("close", function(code, reason){
    console.log("Closing connection");
  })
}).listen(8001)

//http server
app.listen(5000, function(){
  console.log("HTTP server Listening on port 5000")
});

//http handler
//based on failed websockets exercise using socketio (/websockets)
function handler(req, res){
  var path = url.parse(req.url).pathname;

  if(path == '/'){
    index = fs.readFile(__dirname+'/index.html',
      function(err, data){
        if(err){
          res.writeHead(500);
          return res.end("Error: Unable to load index.html");
        }

        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
      }
    )
  }  else if( /\.(js)$/.test(path) ) {
        index = fs.readFile(__dirname+'/'+path,
            function(error,data) {

                if (error) {
                    res.writeHead(500);
                    return res.end("Error: unable to load " + path);
                }

                res.writeHead(200,{'Content-Type': 'text/plain'});
                res.end(data);
            });
    } else {
    res.writeHead(404);
    res.end("Error 404: File not Found.")
  }
}
