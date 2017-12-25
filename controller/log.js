exports.logEvent = function(logLocation, fs, eventData, eventType){
  var date = new Date;
  var logDate = date.getHours() + ':'
              + date.getMinutes() + ':'
              + date.getSeconds() + ' '
              + (date.getDay() + 1) + '.'
              + (date.getMonth() + 1) + '.'
              + date.getFullYear();

  var eventLog = {logDate: logDate,
                  eventType: eventType,
                  eventData: eventData};
  fs.readFile(logLocation, function(err, data){
    var dataObject = JSON.parse(data);
    dataObject.push(eventLog);
    var dataString = JSON.stringify(dataObject);
    fs.writeFile(logLocation, dataString, (err)=>{
      if(err){
        throw err;
      }
    });
  });


  /*
   * Was passiert jetzt mit Eventdata?,
   * erhält jedes data Element einen Tag, damit es eine Art Identifikation hat?
   * Somit könnte jeder Log genau identifiziert werden, welcher Button es ausgelöst
   * hat bzw. welche Funktion der Nutzer angewandt hat
   */
};
