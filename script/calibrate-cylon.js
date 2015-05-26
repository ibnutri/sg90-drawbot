var Cylon = require('cylon');

Cylon.robot({
  connections: {
    arduino: { adaptor: 'firmata', port: '/dev/tty].usbmodem411' }
  },

  devices: {
    servo: { driver: 'servo', pin: 9 }
  },

  work: function(my) {
    var angle = 45 ;
    my.servo.angle(angle);
    every((1).second(), function() {
      angle = angle + 45 ;
      if (angle > 135) {
        angle = 45
      }
      my.servo.angle(angle);
    });
  }
}).start();