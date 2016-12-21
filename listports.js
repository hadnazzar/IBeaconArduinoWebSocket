// example port information 
/*{
  comName: '/dev/cu.usbmodem1421',
  manufacturer: 'Arduino (www.arduino.cc)',
  serialNumber: '757533138333964011C1',
  pnpId: undefined,
  locationId: '0x14200000',
  vendorId: '0x2341',
  productId: '0x0043'
}
*/

var serialport = require('serialport');

//list serial ports:
serialport.list(function (err, ports) {
  ports.forEach(function(port) {
   //Console log each connection name
    console.log("ComName: " + port.comName);
    console.log("Manufacturer: " +port.manufacturer);
    console.log("SerialNumber: " + port.serialNumber);
    console.log("PnpId: " + port.pnpId);
    console.log("LocationId: " + port.locationId);
    console.log("VendorId: " + port.vendorId);
    console.log("ProductId: " + port.productId);
  });
});
