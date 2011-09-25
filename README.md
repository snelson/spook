# Spook

A super simple node.js library for building Campfire bots.

## Usage

### Coffeescript

    Spook = require('./path-to/spook')

    spook = new Spook
      apiKey: 'api-key'
      subdomain: 'account-subdomain'
      roomID: 12345

    spook.respondTo ->

      @match 'ping', ->
        @say 'pong'

      @match 'echo (.+)', (message) ->
        @say message

    spook.connect()

### Javascript

    var Spook = require('./path-to/spook');

    spook = new Spook({
      apiKey: 'api-key',
      subdomain: 'account-subdomain',
      roomID: 12345
    });

    spook.respondTo(function() {

      this.match('ping', function() {
        this.say('pong');
      });

      this.match('echo (.+)', function (message) {
        this.say(message);
      });
    });

    spook.connect();
