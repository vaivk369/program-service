const telemetryEventConfig = require('../config/telemetryEventConfig.json');
 
 function logFormate(logObject) {
    const logFormate = 
    {
        "eid": "LOG",
        "ets": 1518460198146,
        "ver": "3.0",
        "mid": '',
        "actor": { 
          "id": logObject['actorId'], 
          "type": "API" 
        },
        "context": { 
          "channel": logObject['channel'],
          "env": logObject['env'], 
          "did": "", 
          "sid": "", 
          "pdata": telemetryEventConfig.pdata,
          cdata: [] 
        },
        "object": { 
          "id": "", 
          "type": "" 
        },
        "edata": {
          "type": "system", 
          "level": logObject['level'],
          "requestid": '', 
          "message": logObject['msg'], 
          "params": [logObject.params]
        }
      }
      return logFormate;
}
function entryLog(data, logObject) {
  const log = {
    "eid": "LOG",
    "edata": {
      "type": "system", 
      "level": "TRACE", 
      "requestid": logObject.traceId, 
      "message": "ENTRY LOG: " + logObject.message, 
      "params": data 
    }
  }
  console.log(log,'entryLog');
  return log;
}
function exitLog(data, logObject) {
  const log = {
      "eid": "LOG",
      "edata": {
        "type": "system", 
        "level": "TRACE", 
        "requestid": logObject.traceId, 
        "message": "EXIT LOG: " + logObject.message, 
        "params": data 
      }
    }
  console.log(log,'exitLog');
  return log;
}

module.exports.logFormate = logFormate;
module.exports.entryLog = entryLog;
module.exports.exitLog = exitLog;
