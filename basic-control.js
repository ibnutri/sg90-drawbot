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
  function moveLeft(degree){
    servoLeft.to((90-leftOffset)+degree);
  };
  function moveRight(degree){
    servoRight.to(degree+rightOffset);
  };
  function leftToRight(){
    moveLeft(90);
      moveRight(90);
      setTimeout(function(){
        moveLeft(0);
        moveRight(0);
      }, 1000);
  }
  setTimeout(dropArm, 1000);
  this.repl.inject({
    // Allow limited on/off control access to the
    // Led instance from the REPL.
    up: function() {
      liftArm();
    },
    down: function() {
      dropArm();
    },
    left: function(degree){
      moveLeft(degree);
    },
    right: function(degree){
      moveRight(degree);
    },
    swipe: function(){
      setInterval(leftToRight,2000);
    },
    rest: function(){
      moveLeft(45);
      moveRight(45);
      liftArm();
    }
  });
});