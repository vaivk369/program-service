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

function generateAuditEvent(DBinstance, model, action) {
    const event = {};
        event['context'] = {
           pdata: telemetryEventConfig.pdata,
           env: model.name,
           channel: ''
        }
        event['edata'] = {
            state: DBinstance.status || '',
            prevstate: action === 'create' ? '' : DBinstance.previous().status || DBinstance.status,
            props: _.keys(DBinstance.previous())
        }
        event['object'] = {
           id: DBinstance[model.primaryKeyAttributes[0]] || '',
           type: model.name
        }
        logger.info({ msg: 'Audit Event', event})
    telemetryInstance.audit(event);
}
function sourcingProjectAuditTelemetry(object, edata) {
    const data = {
        "eid": "AUDIT",
        "ets": 1592803822,
        "ver": "3.0",
        "mid": "PRG.AUDIT.1592803822",
        "actor": {
            "id": "System",
            "type": "User"
        },
        "context": {
            "channel": envVariables.DOCK_CHANNEL || "sunbird",
            "pdata": {
                "id": "org.sunbird.sourcing",
                "pid": "program-service",
                "ver": 1.0
            },
            "env": "program",
            "cdata": []
        },
        "object": object,
        "edata": edata
    }
    telemetryInstance.audit(data);
}
function createProjectAuditTelemetry(insertObj) {
    const properties = getPropertiesData(insertObj);
    const edata = {
        "type": "create",
        "state": "Draft",
        "prevstate": "",
        "props": _.get(properties, 'propsArry')
    }
    sourcingProjectAuditTelemetry(_.get(properties, 'object'), edata);
}
function updateProjectAuditTelemetry(data) {
    const properties = getPropertiesData(data);
    const edata = {
        "type": "update",
        "state": "Draft",
        "prevstate": "Draft",
        "props": _.get(properties, 'propsArry')
    }
    sourcingProjectAuditTelemetry(_.get(properties, 'object'), edata);
}
function publishProjectAuditTelemetry(data) {
    const properties = getPropertiesData(data);
    const edata = {
        "type": "publish",
        "state": "Live",
        "prevstate": "Draft",
        "props": _.get(properties, 'propsArry')
    }
    sourcingProjectAuditTelemetry(_.get(properties, 'object'), edata);
}
function nominationCreateAuditTelemetry(data) {
    const properties = getPropertiesData(data);
    const edata = {
        "type": "create",
        "state": "Initiated",
        "prevstate": "",
        "props": _.get(properties, 'propsArry')
    }
    sourcingProjectAuditTelemetry(_.get(properties, 'object'), edata);
}
function nominationUpdateAuditTelemetry(data) {
    const properties = getPropertiesData(data, 'nomination');
    const edata = {
        "type": "update",
        "state": "Pending",
        "prevstate": "Initiated",
        "props": _.get(properties, 'propsArry')
    }
    sourcingProjectAuditTelemetry(_.get(properties, 'object'), edata);
}
function getPropertiesData(data, objectType) {
    const properties = {};
    const propsArry = [];
    _.forOwn(data, (value, key) => {
        if (key === 'rolemapping') {
            _.forOwn(value, (roleIdArray, roleType) => {
                propsArry.push({ [key + '.' + roleType]: roleIdArray[0] ? roleIdArray[0] : '' });
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
    properties.object = object;
    properties.propsArry = propsArry;
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
module.exports.sourcingProjectAuditTelemetry = sourcingProjectAuditTelemetry