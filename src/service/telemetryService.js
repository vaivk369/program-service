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

function generateAuditEvent(DBinstance, model, action, properties = {}) {
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
        env: (properties && _.get(properties, 'context')) ? _.get(properties, 'context.env') : model.name,
        channel: envVariables.DOCK_CHANNEL || "sunbird",
    }
    if (properties && _.get(properties, 'edata')) {
        event['edata'] = _.get(properties, 'edata')
    } else {
        event['edata'] = {
            state: DBinstance.status || '',
            prevstate: action === 'create' ? '' : DBinstance.previous().status || DBinstance.status,
            props: _.keys(DBinstance.previous())
        }
    }
    if (properties && _.get(properties, 'object')) {
        event['object'] = _.get(properties, 'object')
    } else {
        event['object'] = {
            id: DBinstance[model.primaryKeyAttributes[0]] || '',
            type: model.name
        }
    }
    logger.info({ msg: 'Audit Event', event })
    telemetryInstance.audit(event);
}
function createProjectAuditTelemetry(data) {
    const properties = getPropertiesData(data, 'Program', 'create', 'Draft', '');
    generateAuditEvent(undefined, undefined, undefined, properties);
}
function updateProjectAuditTelemetry(data) {
    const properties = getPropertiesData(data, 'Program', 'update', 'Draft', 'Draft');
    generateAuditEvent(undefined, undefined, undefined, properties);
}
function publishProjectAuditTelemetry(data) {
    const properties = getPropertiesData(data, 'Program', 'publish', 'Live', 'Draft');
    generateAuditEvent(undefined, undefined, undefined, properties);
}
function nominationCreateAuditTelemetry(data) {
    const properties = getPropertiesData(data, 'nomination', 'create', 'Initiated', '');
    generateAuditEvent(undefined, undefined, undefined, properties);
}
function nominationUpdateAuditTelemetry(data) {
    const properties = getPropertiesData(data, 'nomination', 'update', 'Pending', 'Initiated');
    generateAuditEvent(undefined, undefined, undefined, properties);
}
function getPropertiesData(data, objectType, type, state, prevstate) {
    const properties = {};
    const propsArry = [];
    _.forOwn(data, (value, key) => {
        if (key === 'rolemapping') {
            _.forOwn(value, (userIdArray, roleType) => {
                propsArry.push({ [key + '.' + roleType]: userIdArray[0] ? userIdArray[0] : '' });
            })
        } else if (key && key !== 'config') {
            propsArry.push({ [key]: value });
        }
    });
    const object = {
        "id": _.get(data, 'program_id'),
        "type": objectType,
        "rollup": {}
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
    console.log(properties, 'properties>>>>>>>>>');
    return properties;
}

module.exports.initializeTelemetryService = initTelemetry
module.exports.generateAuditEvent = generateAuditEvent
module.exports.createProjectAuditTelemetry = createProjectAuditTelemetry
module.exports.updateProjectAuditTelemetry = updateProjectAuditTelemetry
module.exports.publishProjectAuditTelemetry = publishProjectAuditTelemetry
module.exports.nominationCreateAuditTelemetry = nominationCreateAuditTelemetry
module.exports.nominationUpdateAuditTelemetry = nominationUpdateAuditTelemetry
module.exports.getPropertiesData = getPropertiesData
