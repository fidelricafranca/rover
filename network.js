//SO: seppo0010
//http://stackoverflow.com/questions/10750303/how-can-i-get-the-local-ip-address-in-node-js?lq=1

var os = require('os');

var interfaces = os.networkInterfaces();
var addresses = [];

var getAddress = function(){
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }
    return addresses[0];
};
//console.log(addresses);
exports.getAddress = getAddress;
