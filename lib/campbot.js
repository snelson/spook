(function() {
  var Campbot, Ranger;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Ranger = require("ranger");
  Campbot = (function() {
    Campbot.prototype.apiKey = null;
    Campbot.prototype.subdomain = null;
    Campbot.prototype.roomID = null;
    Campbot.prototype.handle = "(@campbot |campbot |CAMPBOT: |!)";
    Campbot.prototype.behaviors = null;
    Campbot.prototype.connection = null;
    Campbot.prototype.room = null;
    function Campbot(options) {
      this._processMessage = __bind(this._processMessage, this);      var k, v;
      for (k in options) {
        v = options[k];
        this[k] = v;
      }
      this.behaviors = [];
    }
    Campbot.prototype.respondTo = function(behavior) {
      return behavior.apply(this);
    };
    Campbot.prototype.match = function(trigger, action) {
      return this.behaviors.push({
        trigger: trigger,
        action: action
      });
    };
    Campbot.prototype.say = function(message) {
      return this.room.speak(message);
    };
    Campbot.prototype.connect = function() {
      this.connection = Ranger.createClient(this.subdomain, this.apiKey);
      return this.connection.room(this.roomID, __bind(function(room) {
        this.room = room;
        return this.room.join(__bind(function() {
          return this.room.listen(this._processMessage);
        }, this));
      }, this));
    };
    Campbot.prototype._processMessage = function(message) {
      var behavior, matches, _i, _len, _ref, _results;
      if (message.type !== 'TextMessage') {
        return;
      }
      _ref = this.behaviors;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        behavior = _ref[_i];
        _results.push((matches = message.body.match("" + this.handle + behavior.trigger)) ? behavior.action.apply(this, matches.slice(2, matches.length)) : void 0);
      }
      return _results;
    };
    return Campbot;
  })();
  module.exports = Campbot;
}).call(this);
