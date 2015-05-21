var five = require("johnny-five");
var board = new five.Board({port: "/dev/tty.usbmodem411"});

board.on("ready", function() {
  // setup the up servo (lifting pen)
  var servoUp = new five.Servo({
  	pin: 9,
  	range: [150,180],
  	startingAt: 180
  });
  //zeroing
  //servoUp.to(180);
  servoUp.sweep([140,180]);
});