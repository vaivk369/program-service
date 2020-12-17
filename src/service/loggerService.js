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

module.exports.logFormate = logFormate;
