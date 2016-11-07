var serialport = require('serialport');// include the library
var WebSocketServer = require('ws').Server;
var SerialPort = serialport.SerialPort;// make a local instance of it
   
var SERVER_PORT = 8081;               // port number for the webSocket server
var wss = new WebSocketServer({port: SERVER_PORT}); // the webSocket server
var connections = new Array;          // list of connections to the server
   var portName;
   // get port name from the command line:
   
   serialport.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
  });
});
   portName = process.argv[2];


var myPort = new SerialPort(portName, {
   baudRate: 9600,
   // look for return and newline at the end of each data packet:
   parser: serialport.parsers.readline("\n")

 });
 
 wss.on('connection', handleConnection);
 
function handleConnection(client) {
 console.log("New Connection"); // you have a new client
 connections.push(client); // add this client to the connections array
 
 client.on('message', sendToSerial); // when a client sends a message,
 
 client.on('close', function() { // when a client closes its connection
 console.log("connection closed"); // print it out
 var position = connections.indexOf(client); // get the client's position in the array
 connections.splice(position, 1); // and delete it from the array
 });
}

// This function broadcasts messages to all webSocket clients
function broadcast(data) {
 for (myConnection in connections) {   // iterate over the array of connections
  connections[myConnection].send(data); // send the data to each connection
 }
}

function saveLatestData(data) {
   console.log(data);
   // if there are webSocket connections, send the serial data
   // to all of them:
   if (connections.length > 0) {
     broadcast(data);
   }
   
}
 
myPort.on('open', showPortOpen);
myPort.on('data', sendSerialData);
myPort.on('close', showPortClose);
myPort.on('error', showError);
 
 function showPortOpen() {
   console.log('port open. Data rate: ' + myPort.options.baudRate);
}
 
function sendToSerial(data) {
 console.log("sending to serial: " + data);
 myPort.write(data);
}

function sendSerialData(data) {
   console.log(data);
   if (connections.length > 0) {
    broadcast(data);
  }
}
 
 
 
function showPortClose() {
   console.log('port closed.');
}
 
function showError(error) {
   console.log('Serial port error: ' + error);
}		