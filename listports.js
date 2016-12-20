var serialport = require('serialport');

//list serial ports:
serialport.list(function (err, ports) {
  ports.forEach(function(port) {
   //Console log each connection name
    console.log(port.comName);
  });
});
