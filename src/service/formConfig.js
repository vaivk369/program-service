const _ = require("lodash");
const uuid = require("uuid/v1");
const logger = require('sb_logger_util_v2');
const messageUtils = require('./messageUtil');
const Sequelize = require('sequelize');
const moment = require('moment');
const responseCode = messageUtils.RESPONSE_CODE;
const formMessages = messageUtils.FORM;
const errorCodes = messageUtils.ERRORCODES;
const model = require('../models');
const loggerService = require('./loggerService');
const {
  forkJoin
} = require('rxjs');
const envVariables = require('../envVariables');
const stackTrace_MaxLimit = 500;
var async = require('async');

function convertToLowerCase(obj, keys){
  keys.forEach(element => obj[element] = obj[element] && obj[element].toLowerCase());
}

async function read(req, response) {
  const logObject = {
    traceId : req.headers['x-request-id'] || '',
    message : formMessages.READ.INFO
  }
  var rspObj = req.rspObj;
  const errCode = formMessages.EXCEPTION_CODE + '_' + formMessages.READ.EXCEPTION_CODE;
  loggerService.entryLog(req.body.request, logObject);
  if (!req.body.request || !req.body.request.context || !req.body.request.context_type) {
    rspObj.errCode = formMessages.READ.MISSING_CODE
    rspObj.errMsg = formMessages.READ.MISSING_MESSAGE
    rspObj.responseCode = responseCode.CLIENT_ERROR;
    loggerError('', rspObj, errCode+errorCodes.CODE1);
    loggerService.exitLog({responseCode: rspObj.responseCode, errCode: errCode+errorCodes.CODE1}, logObject);
    return response.status(400).send(errorResponse(rspObj,errCode+errorCodes.CODE1))
  }
  const data = _.pick(req.body.request, ['context', 'context_type', 'objecttype', 'channel', 'operation', 'primarycategory']);
  convertToLowerCase(data, ['context', 'context_type', 'operation']);
  const query = {
    channel: data.channel || '*',
    objecttype: data.objecttype || '*',
    operation: data.operation || '*',
    primarycategory: data.primarycategory || '*',
    context: data.context,
    context_type: data.context_type,
    status: data.status || 'Active'
  }
  await model.formdata.findOne({ where: query }).then(async data => {
    if (!data) {
      var temp = Object.assign({}, query, { channel: "*" });
      // find record by specified rootOrgId with channel = '*'
      await model.formdata.findOne({ where: temp })
    } else {
      return data;
    }
  })
  .then(async data => {
      if (!data) {
        // get the default data
        return await model.formdata.findOne({ where: Object.assign({}, query, { objecttype: "*" })})
      } else {
        return data;
      }
    })
    .then(async data => {
      if (!data) {
        // get the default data
        return await model.formdata.findOne({ where: Object.assign({}, query, { channel: "*", objecttype: "*" })})
      } else {
        return data;
      }
    })
    .then(async data => {
      if (!data) {
        // get the default data
        return await model.formdata.findOne({ where: Object.assign({}, query, { channel: "*", objecttype: "*", primarycategory: "*" })})
      } else {
        return data;
      }
    })
    .then(data => {
      loggerService.exitLog({responseCode: 'OK'}, logObject);
      if (!data) data = {}
      rspObj.result = data
      rspObj.responseCode = 'OK';
      loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
      return response.status(200).send(successResponse(rspObj));
    })
    .catch(error => {
      console.log("Error updating form config data", JSON.stringify(error));
      rspObj.responseCode = 'ERR_GET_FORM_FAILED';
      rspObj.result = {};
      loggerService.exitLog({responseCode: rspObj.responseCode, errCode: errCode+errorCodes.CODE2}, logObject);
      loggerError(rspObj.responseCode,rspObj,errCode+errorCodes.CODE2);
      return response.status(400).send(errorResponse(rspObj,errCode+errorCodes.CODE2));
    })
}

async function create(req, response) {
  const logObject = {
    traceId : req.headers['x-request-id'] || '',
    message : formMessages.CREATE.INFO
  }
  var rspObj = req.rspObj;
  const errCode = formMessages.EXCEPTION_CODE + '_' + formMessages.CREATE.EXCEPTION_CODE
  loggerService.entryLog(req.body.request, logObject);
  if (!req.body.request || !req.body.request.context || !req.body.request.context_type || !req.body.request.data) {
    rspObj.errCode = formMessages.CREATE.MISSING_CODE
    rspObj.errMsg = formMessages.CREATE.MISSING_MESSAGE
    rspObj.responseCode = responseCode.CLIENT_ERROR
    loggerError('',rspObj,errCode+errorCodes.CODE1);
    loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
    return response.status(400).send(errorResponse(rspObj,errCode+errorCodes.CODE1))
  }
  const data = _.pick(req.body.request, ['context', 'context_type', 'objecttype', 'channel', 'operation', 'primarycategory', 'data']);
  convertToLowerCase(data, ['context', 'context_type', 'operation']);
  const insertObj = {};
  insertObj.id = uuid();
  insertObj.context = data.context;
  insertObj.context_type = data.context_type;
  insertObj.data = data.data;
  insertObj.channel = data.channel || '*';
  insertObj.objecttype = data.objecttype || '*';
  insertObj.primarycategory = data.primarycategory || '*';
  insertObj.operation = data.operation || '*';
  insertObj.status = data.status || 'Active';
  insertObj.createdon = new Date();

  model.formdata.create(insertObj).then(res => {
    rspObj.result = {
      'id': res.dataValues.id
    }
    rspObj.responseCode = 'OK';
    response.status(200).send(successResponse(rspObj));
  })
  .catch(error => {
    console.log("Error creating form config", JSON.stringify(error));
    const errCode = formMessages.EXCEPTION_CODE+'_'+formMessages.CREATE.EXCEPTION_CODE
    rspObj.errMsg = formMessages.CREATE.FAILED_MESSAGE
    rspObj.responseCode = formMessages.CREATE.FAILED_CODE;
    rspObj.result = {};
    loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
    loggerError('',rspObj,errCode+errorCodes.CODE3);
    return response.status(500).send(errorResponse(rspObj,errCode+errorCodes.CODE3));
  })
}

async function update(req, response) {
  const logObject = {
    traceId : req.headers['x-request-id'] || '',
    message : formMessages.READ.INFO
  }
  var rspObj = req.rspObj;
  loggerService.entryLog(req.body.request, logObject);
  if (!req.body.request || !req.body.request.data || !req.body.request.context || !req.body.request.context_type) {
    rspObj.errCode = formMessages.UPDATE.MISSING_CODE
    rspObj.errMsg = formMessages.UPDATE.MISSING_MESSAGE
    rspObj.responseCode = responseCode.CLIENT_ERROR;
    loggerError('', rspObj, errCode+errorCodes.CODE1);
    loggerService.exitLog({responseCode: rspObj.responseCode, errCode: errCode+errorCodes.CODE1}, logObject);
    return response.status(400).send(errorResponse(rspObj,errCode+errorCodes.CODE1))
  }
  const data = _.pick(req.body.request, ['context', 'context_type', 'objecttype', 'channel', 'operation', 'primarycategory', 'data']);
  convertToLowerCase(data, ['context', 'context_type', 'operation']);
  const query = {
    where: {
      channel: data.channel || '*',
      objecttype: data.objecttype || '*',
      operation: data.operation || '*',
      primarycategory: data.primarycategory || '*',
      context: data.context,
      context_type: data.context_type,
    },
    returning: true,
    individualHooks: true
  }

  const updateValue = {
    data: data.data,
    updatedon: new Date(),
  };

  model.formdata.update(updateValue, query).then(data => {
    if (_.isArray(data) && !data[0]) {
      rspObj.errMsg = formMessages.UPDATE.NOTFOUND_MESSAGE;
      const errCode = formMessages.EXCEPTION_CODE+'_'+formMessages.UPDATE.EXCEPTION_CODE
      rspObj.responseCode = formMessages.UPDATE.FAILED_CODE;
      rspObj.result = {};
      return response.status(400).send(errorResponse(rspObj, errCode));
    }
    else {
      rspObj.result = query.where;
      rspObj.responseCode = 'OK';
      return response.status(200).send(successResponse(rspObj));
    }
  })
  .catch(error => {
    console.log("Error updating formconfig to db", JSON.stringify(error));
    const errCode = formMessages.EXCEPTION_CODE+'_'+formMessages.UPDATE.EXCEPTION_CODE;
    rspObj.errMsg = formMessages.UPDATE.FAILED_MESSAGE
    rspObj.responseCode = formMessages.UPDATE.FAILED_CODE;
    rspObj.result = {};
    loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
    loggerError('',rspObj,errCode+errorCodes.CODE3);
    return response.status(500).send(errorResponse(rspObj,errCode+errorCodes.CODE3));
  })
}

function loggerError(errmsg,data,errCode) {
  var errObj = {}
  errObj.eid = 'Error'
  errObj.edata = {
    err : errCode,
    errtype : errmsg || data.errMsg,
    requestid : data.msgId || uuid(),
    stacktrace : _.truncate(JSON.stringify(data), { 'length': stackTrace_MaxLimit})
  }
  logger.error({msg: 'Error log', errObj})
}

function successResponse(data) {
  var response = {}
  response.id = data.apiId
  response.ver = data.apiVersion
  response.ts = new Date()
  response.params = getParams(data.msgid, 'successful', null, null)
  response.responseCode = data.responseCode || 'OK'
  response.result = data.result
  return response
}

/**
 * function create error response body.
 * @param {Object} data
 * @returns {nm$_responseUtil.errorResponse.response}
 */
function errorResponse(data,errCode) {
  var response = {}
  response.id = data.apiId
  response.ver = data.apiVersion
  response.ts = new Date()
  response.params = getParams(data.msgId, 'failed', data.errCode, data.errMsg)
  response.responseCode = errCode +'_'+ data.responseCode
  response.result = data.result
  return response
}

function getParams(msgId, status, errCode, msg) {
  var params = {}
  params.resmsgid = uuid()
  params.msgid = msgId || null
  params.status = status
  params.err = errCode
  params.errmsg = msg

  return params
}

module.exports.createForm = create
module.exports.updateForm = update
module.exports.getForm = read

