const telemetryEventConfig = require('../config/telemetryEventConfig.json');
 
 function logFormate(logObject) {
    const logFormate = 
    {
        "eid": "LOG",
        "ets": 1518460198146,
        "ver": "3.0",
        "mid": '',
        "actor": { // required. actor who generated the log.
          "id": logObject['actorId'], // id of the user, api, or job
          "type": "API" // type of actor - user, API, Job
        },
        "context": { // required. context in which the log is generated.
          "channel": logObject['channel'], // name of the service that generated the log
          "env": logObject['env'], // name of the module or API, e.g.: controller, manager, auth, etc
          "did": "", // Device Id of the user if available
          "sid": "", // Corresponding user session ID if available
          "pdata": telemetryEventConfig.pdata,
          cdata: [] // Optional. 
        },
        "object": { // Optional
          "id": "", // The system level object id. For ex: content/collection/group id
          "type": "" // Type of the object. For ex: Content, Course, Textbook etc
        },
        "edata": {
          "type": "system", // Required. Type of log (system)
          "level": logObject['level'], // Required. Level of the log. TRACE, DEBUG, INFO, WARN
          "requestid": '', // Required. Trace id of the request.
          "message": logObject['msg'], // Required. Log message(errmsg).
          "params": [logObject.params] // Optional. Additional params in the log message
        }
      }
      return logFormate;
}

module.exports.logFormate = logFormate;
