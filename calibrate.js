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
  servoUp.to(140);
  // counter clockwise
  // servoUp.sweep([140,180]);
  var leftOffset = 45;
  var servoLeft = new five.Servo({
  	pin: 10,
  	range: [90-leftOffset,180-leftOffset],
  	startingAt: 90 - leftOffset
  });
  //zeroing
  servoLeft.to(90-leftOffset);
  // servoLeft.sweep([90-leftOffset,180-leftOffset]);


  var rightOffset = 17;
  var servoRight = new five.Servo({
  	pin: 11,
  	range: [rightOffset,90+rightOffset],
  	startingAt: 90 + rightOffset
  });
  //zeroing
  // servoRight.to(17);
  servoRight.to(rightOffset+90);
  // servoRight.to(rightOffset, 5000, 90);
  //servoRight.sweep([rightOffset,90+rightOffset]);
  function liftArm(){
  	servoUp.to(140);
  };
  function dropArm(){
  	servoUp.to(180);
  };
  setTimeout(dropArm, 1000);
});