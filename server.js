var app = require('http').createServer(),
    io  = require('socket.io').listen(app),
    fs  = require('fs'),
    port = 8888,
    five = require("johnny-five"),
    bot, board;

board = new five.Board({port: "/dev/tty.usbmodem411"});

board.on("ready", function() {
  var startLeftPos = 40;
  var startRightPos = 50;
  var currentLeft = startLeftPos;
  var currentRight = startRightPos;
  var currentHeight = 1; // 1 berarrit naik, 0 turun
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
  moveLeft(startLeftPos);
  moveRight(startRightPos);
  liftArm();
  io.sockets.on('connection', function (socket) {
    /*
     * Stores current direction of the bot to 
     * calculate the pivoting motion
     */
    var currentDirection = null;

    console.log("socket connected", socket.id);
    /*
     * Stop the bot on 'stop' event
     */
    socket.on('toggle', function () {
      if(currentHeight == 1){
        dropArm();
        currentHeight = 0;
      }else{
        liftArm();
        currentHeight = 1;
      }
      // bot.stop();
    });

    socket.on('move', function (direction) {

      console.log("bot:move:" + direction);

      switch (direction) {
        /*
         * Pivot left if there's an existing direction
         */
        case 'left':
          
            // bot.pivot(currentDirection + "-left");
            if(currentLeft > 0){
              currentLeft -= 5;
              moveLeft(currentLeft);
            }
          
          break;
        /*
         * Pivot right if there's an existing direction
         */
        case 'right':
          
            if(currentLeft < 90){
              currentLeft += 5;
              moveLeft(currentLeft);
            }
            // bot.pivot(currentDirection + "-right");
          
          break;
        /*
         * Move forward
         */
        case 'fwd':
          if(currentRight > 0){
              currentRight -= 5;
              moveRight(currentRight);
            };
          break;
        /*
         * Move back
         */
        case 'rev':
          if(currentRight < 90){
              currentRight += 5;
              moveRight(currentRight);
            };
      }
    });
  });
  function leftStepUp(){
    if(currentLeft < 90){
      currentLeft += 5;
      moveLeft(currentLeft);
    }
  }
  function leftStepDown(){
    if(currentLeft > 0){
      currentLeft -= 5;
      moveLeft(currentLeft);
    }
  }
  function rightStepUp(){
    if(currentRight < 90){
      currentRight += 5;
      moveRight(currentRight);
    };
  }
  function rightStepDown(){
    if(currentRight > 0){
      currentRight -= 5;
      moveRight(currentRight);
    };
  }
  function animate(){
    // while(){

    // }
    for(var i = 0; i <= 10; i++){
      setTimeout(function(){
        rightStepDown();
        leftStepUp();
      },i*500);
    }
  }
  board.repl.inject({
    // n: bot
    leftup: function(){
      leftStepUp();
    },
    leftdown: function(){
      leftStepDown();
    },
    rightup: function(){
      rightStepUp();
    },
    rightDown: function(){
      rightStepDown();
    },
    animate: function(){
      animate();
    }
  });
});

console.log("listening on port ", port);
app.listen(port);