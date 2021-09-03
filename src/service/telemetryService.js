const TelemetryServiceInstance = require('sb_telemetry_util');
const envVariables = require('../envVariables');
const _ = require("lodash");
const telemetryEventConfig = require('../config/telemetryEventConfig.json');
const logger = require('sb_logger_util_v2');

const telemetryInstance = new TelemetryServiceInstance();

function initTelemetry() {
    config = {
        host: envVariables.telemetryConfig.host,
        endpoint: envVariables.telemetryConfig.endpoint,
        method: envVariables.telemetryConfig.method,
        batchsize: 10
    }
    telemetryInstance.init(config);
}

function generateAuditEvent(DBinstance, model, action, telemetryData = {}) {
    const event = {
        "eid": "AUDIT",
        "ets": 1592803822,
        "ver": "3.0",
        "mid": "PRG.AUDIT.1592803822",
        "actor": {
            "id": "System",
            "type": "User"
        }
    };
    event['context'] = {
        pdata: telemetryEventConfig.pdata,
        env: (telemetryData && _.get(telemetryData, 'context')) ? _.get(telemetryData, 'context.env') : model.name,
        channel: envVariables.DOCK_CHANNEL || "sunbird",
    }
    if (telemetryData && _.get(telemetryData, 'edata')) {
        event['edata'] = _.get(telemetryData, 'edata')
    } else {
        event['edata'] = {
            state: DBinstance.status || '',
            prevstate: action === 'create' ? '' : DBinstance.previous().status || DBinstance.status,
            props: _.keys(DBinstance.previous())
        }
    }
    if (telemetryData && _.get(telemetryData, 'object')) {
        event['object'] = _.get(telemetryData, 'object')
    } else {
        event['object'] = {
            id: DBinstance[model.primaryKeyAttributes[0]] || '',
            type: model.name
        }
    }
    logger.info({ msg: 'Audit Event', event })
    telemetryInstance.audit(event);
}
function generateProjectAuditTelemetryData(data, objectType, type, state, prevstate) {
    const properties = {};
    const propsArry = [];
    _.forOwn(data, (value, key) => {
        if (key === 'rolemapping') {
            _.forOwn(value, (userIdArray, roleType) => {
                if (!_.isEmpty(userIdArray) && _.isArray(userIdArray)) {
                    _.forEach(userIdArray, userId => {
                        propsArry.push({ [key + '.' + roleType]: userId });
                    })
                } else {
                    propsArry.push({ [key + '.' + roleType]: '' });
                }
            })
        } else if (key === 'config') {
            const config = {};
            _.forOwn(value, (value1, key1) => {
                if (_.includes(['board', 'medium', 'gradeLevel', 'subject'], key1)) {
                    config[key1] = value1;
                }
            });
            propsArry.push({ [key]: config });
        } else {
            propsArry.push({ [key]: value });
        }
    });
    const object = {
        "id": _.get(data, 'program_id'),
        "type": objectType,
        "rollup": _.get(data, 'rollup') || {}
    }
    const context = {
        "env": objectType
    }
    const edata = {
        "type": type,
        "state": state,
        "prevstate": prevstate,
        "props": propsArry
    }
    properties.object = object;
    properties.context = context;
    properties.edata = edata;
    generateAuditEvent(undefined, undefined, undefined, properties);
}

module.exports.initializeTelemetryService = initTelemetry
module.exports.generateAuditEvent = generateAuditEvent
module.exports.generateProjectAuditTelemetryData = generateProjectAuditTelemetryData
