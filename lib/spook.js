(function() {
  var Ranger, Spook;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Ranger = require("ranger");
  Spook = (function() {
    Spook.prototype.apiKey = null;
    Spook.prototype.subdomain = null;
    Spook.prototype.roomID = null;
    Spook.prototype.handle = "(@spook |spook |SPOOK: |!)";
    Spook.prototype.behaviors = null;
    Spook.prototype.connection = null;
    Spook.prototype.room = null;
    function Spook(options) {
      this._processMessage = __bind(this._processMessage, this);      var k, v;
      for (k in options) {
        v = options[k];
        this[k] = v;
      }
      this.behaviors = [];
    }
    Spook.prototype.respondTo = function(behavior) {
      return behavior.apply(this);
    };
    Spook.prototype.match = function(trigger, action) {
      return this.behaviors.push({
        trigger: trigger,
        action: action
      });
    };
    Spook.prototype.say = function(message) {
      return this.room.speak(message);
    };
    Spook.prototype.connect = function() {
      this.connection = Ranger.createClient(this.subdomain, this.apiKey);
      return this.connection.room(this.roomID, __bind(function(room) {
        this.room = room;
        return this.room.join(__bind(function() {
          return this.room.listen(this._processMessage);
        }, this));
      }, this));
    };
    Spook.prototype._processMessage = function(message) {
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
    return Spook;
  })();
  module.exports = Spook;
}).call(this);
