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
  servoUp.to(180);
  // counter clockwise
  // servoUp.sweep([140,180]);
  var leftOffset = 45;
  var servoLeft = new five.Servo({
  	pin: 10,
  	range: [90-leftOffset,180-leftOffset],
  	startingAt: 90 - leftOffset
  });
  //zeroing
  // servoLeft.to(90-leftOffset);
  // servoLeft.sweep([90-leftOffset,180-leftOffset]);


  var rightOffset = 17;
  var servoRight = new five.Servo({
  	pin: 11,
  	range: [rightOffset,90+rightOffset],
  	startingAt: 90 + rightOffset
  });
  //zeroing
  // servoRight.to(17);
  // servoRight.to(rightOffset+90);
  // servoRight.to(rightOffset, 5000, 90);
  //servoRight.sweep([rightOffset,90+rightOffset]);
  function liftArm(){
  	servoUp.to(140, 1000, 10);
  };
  function dropArm(){
  	servoUp.to(180, 1000, 10);
  };
  function moveLeft(degree){
    servoLeft.to((90-leftOffset)+degree);
  };
  function moveRight(degree){
    servoRight.to(degree+rightOffset);
  };
  moveLeft(45);
  moveRight(45);
  
  
  
  this.repl.inject({
    up: function() {
      liftArm();
    },
    down: function() {
      dropArm();
    },
    animate: function(){
      var animation = new five.Animation(servoLeft);

      // Create an animation segment object
      animation.enqueue({
        duration: 2000,
        cuePoints: [0, 0.1, 0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9, 1.0],
        keyFrames: [ 
      {degrees: 90-leftOffset+65},
          {degrees: 90-leftOffset+85},
          {degrees: 90-leftOffset+90},
          {degrees: 90-leftOffset+85},
          {degrees: 90-leftOffset+65},
          {degrees: 90-leftOffset+85},
          {degrees: 90-leftOffset+90},
          {degrees: 90-leftOffset+85},
          {degrees: 90-leftOffset+65},
          {degrees: 90-leftOffset+85},
          {degrees: 90-leftOffset+90},
          {degrees: 90-leftOffset+85},
        ],
        loop:true
      });

      var animation2 = new five.Animation(servoRight);

      // Create an animation segment object
      animation2.enqueue({
        duration: 2000,
        cuePoints: [0, 0.25, 0.5,0.75, 1.0],
        keyFrames: [ 
          {degrees: rightOffset+65},
          {degrees: rightOffset+85},
          {degrees: rightOffset+90},
          {degrees: rightOffset+85},
          {degrees: rightOffset+65},
          
        ],
        loop:true
      });
      animation2.play();
      // animation.play();
    }
  });
});