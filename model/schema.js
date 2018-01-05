var mongoose = require('mongoose');

/*********************************************
              EVENTLOG SCHEMA/MODEL
*********************************************/

var eventLogSchema = new mongoose.Schema({
  eventType:    String,
  logDate:      {type: Date, default: Date.now},
  eventData:    mongoose.Schema.Types.Mixed
});

var EventLog = mongoose.model('EventLog', eventLogSchema);

/*********************************************
              PLAYER SCHEMA/MODEL
*********************************************/
var playerSchema = new mongoose.Schema({
  player:   {type: String, unique: true, required: true},
  cricket: {
    games:        {type: Number, default: 0},
    wins:         {type: Number, default: 0},
    losses:       {type: Number, default: 0},
    score:        {type: Number, default: 0},
    scoreAverage: {type: Number, default: 0},
    rank:         {type: Number, default: 0},
    winrate:      {type: Number, default: 0},
  },
  five01: {
    games:        {type: Number, default: 0},
    wins:         {type: Number, default: 0},
    losses:       {type: Number, default: 0},
    score:        {type: Number, default: 0},
    scoreAverage: {type: Number, default: 0},
    rank:         {type: Number, default: 0},
    winrate:      {type: Number, default: 0},
  },
  total: {
    games:        {type: Number, default: 0},
    wins:         {type: Number, default: 0},
    losses:       {type: Number, default: 0},
    winrate:      {type: Number, default: 0}
  },
  hasPlayed: {type: Boolean, default:false}
});

var Player = mongoose.model('Player', playerSchema);

module.exports = {
                    Player: Player,
                    EventLog: EventLog
                 };
