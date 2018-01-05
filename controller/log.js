exports.logEvent = function(eventData, eventType){
  var model = require('../model/schema');
  model.EventLog.create({
    eventType: eventType,
    logDate: Date.now(),
    eventData: eventData
  }, function(err, data){
    if(!err){
      console.log("Event \"" + data.eventType + "\" added!");
    }else{
      console.log(err);
    }
  });

};
