/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');

// When the user disconnects.. perform this
function onDisconnect(socket) {
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  require('../api/viking/viking.socket').register(socket);
  require('../api/titan/titan.socket').register(socket);
  require('../api/texan/texan.socket').register(socket);
  require('../api/steeler/steeler.socket').register(socket);
  require('../api/seahawk/seahawk.socket').register(socket);
  require('../api/saint/saint.socket').register(socket);
  require('../api/redskin/redskin.socket').register(socket);
  require('../api/raven/raven.socket').register(socket);
  require('../api/ram/ram.socket').register(socket);
  require('../api/raider/raider.socket').register(socket);
  require('../api/patriot/patriot.socket').register(socket);
  require('../api/panther/panther.socket').register(socket);
  require('../api/packer/packer.socket').register(socket);
  require('../api/niner/niner.socket').register(socket);
  require('../api/lion/lion.socket').register(socket);
  require('../api/jet/jet.socket').register(socket);
  require('../api/jaguar/jaguar.socket').register(socket);
  require('../api/giant/giant.socket').register(socket);
  require('../api/falcon/falcon.socket').register(socket);
  require('../api/eagle/eagle.socket').register(socket);
  require('../api/dolphin/dolphin.socket').register(socket);
  require('../api/cowboy/cowboy.socket').register(socket);
  require('../api/colt/colt.socket').register(socket);
  require('../api/chief/chief.socket').register(socket);
  require('../api/charger/charger.socket').register(socket);
  require('../api/cardinal/cardinal.socket').register(socket);
  require('../api/buccaneer/buccaneer.socket').register(socket);
  require('../api/brown/brown.socket').register(socket);
  require('../api/bronco/bronco.socket').register(socket);
  require('../api/bill/bill.socket').register(socket);
  require('../api/bear/bear.socket').register(socket);
  require('../api/bengal/bengal.socket').register(socket);
  require('../api/message/message.socket').register(socket);
}

module.exports = function (socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.on('connection', function (socket) {
    socket.address = socket.handshake.address !== null ?
            socket.handshake.address.address + ':' + socket.handshake.address.port :
            process.env.DOMAIN;

    socket.connectedAt = new Date();

    // Call onDisconnect.
    socket.on('disconnect', function () {
      onDisconnect(socket);
      console.info('[%s] DISCONNECTED', socket.address);
    });

    // Call onConnect.
    onConnect(socket);
    console.info('[%s] CONNECTED', socket.address);
  });
};
