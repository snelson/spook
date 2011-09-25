# Campbot

A super simple node.js library for building Campfire bots.

## Usage

### Coffeescript

    Campbot = require('./path-to/campbot')

    campbot = new Campbot
      apiKey: 'api-key'
      subdomain: 'account-subdomain'
      roomID: 12345

    campbot.respondTo ->

      @match 'ping', ->
        @say 'pong'

      @match 'echo (.+)', (message) ->
        @say message

    campbot.connect()

### Javascript
    
    var Campbot = require('./path-to/campbot');

    campbot = new Campbot({
      apiKey: 'api-key',
      subdomain: 'account-subdomain',
      roomID: 12345
    });

    campbot.respondTo(function() {

      this.match('ping', function() {
        this.say('pong');
      });

      this.match('echo (.+)', function (message) {
        this.say(message);
      });
    });

    campbot.connect();