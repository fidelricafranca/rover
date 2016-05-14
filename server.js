var url = require('url')
var fs = require('fs')
var app = require('http').createServer(handler)
var network = require('./network.js')
var ipchanger = require('./ipchanger.js')

//replace old IP address with current
var address = network.getAddress();
ipchanger.fix("index.html", address);
ipchanger.fix("client.js", address);
console.log("IP Address: "+address);

//http server
app.listen(5000, function(){
  console.log("HTTP server Listening on port 5000");
});

//initiate serial connection
var serialport = require("serialport"),
    SerialPort = serialport.SerialPort;

//websocket server
var ws = require("nodejs-websocket");
var server = ws.createServer(wsConnect).listen(8001);

function wsConnect(conn){
    console.log("Connection established");

    var sp = new SerialPort(portName(process.argv[2]), {
      baudrate: 9600,
      parser: serialport.parsers.readline('\n')
    }, false);

    sp.open( function(error) {
      if (error) {
        console.log("Failed to open: "+ error);
      } else {
        console.log('Serialport open.');
        sp.write('52');
      }
    });

    sp.on('data', function(data){
      //console.log(data);
      conn.sendText(data);
    });

    conn.on("text", function(str){
       //conn.sendText(str.toUpperCase()+"!!!");
       console.log("Received " + str);
       sp.write(str);
    });

    conn.on("close", function(code, reason){
        console.log("Closing connection");
        sp.close(function (err) {
            console.log('port closed', err);
        });
        app.close();
    });
}

function portName(num){
  if(num == 1){
    return "/dev/ttyACM1";
  }else{ //default
    return "/dev/ttyACM0";
  }
}

//http handler
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
   }else if( /\.(js)$/.test(path) ) {
        index = fs.readFile(__dirname+'/'+path,
            function(error,data) {

                if (error) {
                    res.writeHead(500);
                    return res.end("Error: unable to load " + path);
                }

                res.writeHead(200,{'Content-Type': 'text/plain'});
                res.end(data);
            });
   }else if( /\.(css)$/.test(path) ) {
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
