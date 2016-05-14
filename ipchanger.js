//LeoTM
//http://code.runnable.com/VbLBfqnAwYQ5Jk5k/find-and-replace-for-node-js-text-file-glob-fs-and-string

var glob = require("glob");
var fs = require("fs");
var replace = require("replace");

// Find file
function fix(filename, address){
  glob(filename,function (err,files) {
  if (err) throw err;
  files.forEach(function (item,index,array){
      //console.log(item + " found");
       // Read file
       //console.log(fs.readFileSync(item,'utf8'));
       // Replace string
       replace({
       regex: "[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}", //https://www.regexmagic.com/manual/xmppatternipv4.html
       replacement: address,
       paths: [item],
       recursive: true,
       silent: true,
       });
       console.log("IP updated in "+filename+" to "+ address);
            // Read file
       //console.log(fs.readFileSync(item,'utf8'));
        });
  });
}
exports.fix = fix;
