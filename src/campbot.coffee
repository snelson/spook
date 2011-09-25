Ranger = require("ranger")

class Campbot
  apiKey: null
  subdomain: null
  roomID: null
  handle: "(@campbot |campbot |CAMPBOT: |!)"
  behaviors: null
  connection: null
  room: null

  constructor: (options) ->
    for k,v of options
      @[k] = v

    @behaviors = []

  respondTo: (behavior) ->
    behavior.apply(this)

  match: (trigger, action) ->
    @behaviors.push(trigger: trigger, action: action)

  say: (message) ->
    @room.speak(message)

  connect: ->
    @connection = Ranger.createClient(@subdomain, @apiKey)
    @connection.room @roomID, (room) =>
      @room = room
      @room.join =>
        @room.listen @_processMessage

  # private

  _processMessage: (message) =>
    return if message.type != 'TextMessage'
    for behavior in @behaviors
      if matches = message.body.match("#{@handle}#{behavior.trigger}")
        behavior.action.apply(this, matches[2...matches.length])

module.exports = Campbot
