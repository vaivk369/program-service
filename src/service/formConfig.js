const _ = require("lodash");
const uuid = require("uuid/v1");
const logger = require('sb_logger_util_v2');
const messageUtils = require('./messageUtil');
const Sequelize = require('sequelize');
const moment = require('moment');
const responseCode = messageUtils.RESPONSE_CODE;
const programMessages = messageUtils.PROGRAM;
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

async function getForm(req, response) {
  const logObject = {
    traceId : req.headers['x-request-id'] || '',
    message : programMessages.FORM.READ.INFO
  }
  loggerService.entryLog(data, logObject);
  if (!req.body.request || !req.body.request.context || !req.body.request.context_type) {
    rspObj.errCode = programMessages.FORM.READ.MISSING_CODE
    rspObj.errMsg = programMessages.FORM.READ.MISSING_MESSAGE
    rspObj.responseCode = responseCode.CLIENT_ERROR;
    loggerError('', rspObj, errCode+errorCodes.CODE1);
    loggerService.exitLog({responseCode: rspObj.responseCode, errCode: errCode+errorCodes.CODE1}, logObject);
    return response.status(400).send(errorResponse(rspObj,errCode+errorCodes.CODE1))
  }
  const data = _.pick(req.body.request, ['context', 'context_type', 'objectype', 'channel', 'operation', 'component', 'primarycategory']);
  convertToLowerCase(data, ['context', 'context_type', 'operation']);
  const query = {
    channel: data.channel || '*',
    objectype: data.objectype || '*',
    operation: data.operation || '*',
    primarycategory: data.primarycategory || '*',
    context: data.context,
    context_type: data.context_type,
    component: data.component,
    status: 'Active'
  }
  await model.formConfig.findOne(query).then(async data => {
    if (!data) {
      // find record by specified rootOrgId with channel = '*'
      await model.formConfig.findOne(Object.assign({}, query, { channel: "*" }))
    } else {
      return data;
    }
  })
  .then(async data => {
      if (!data) {
        // get the default data
        return await model.formConfig.findOne(Object.assign({}, query, { primarycategory: "*" }))
      } else {
        return data;
      }
    })
    .then(async data => {
      if (!data) {
        // get the default data
        return await model.formConfig.findOne(Object.assign({}, query, { channel: "*", primarycategory: "*" }))
      } else {
        return data;
      }
    })
    .then(async data => {
      if (!data) {
        // get the default data
        return await model.formConfig.findOne(Object.assign({}, query, { channel: "*", primarycategory: "*", objectype: "*" }))
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
        rspObj.responseCode = 'ERR_GET_FORM_FAILED';
        rspObj.result = {};
        loggerService.exitLog({responseCode: rspObj.responseCode, errCode: errCode+errorCodes.CODE2}, logObject);
        loggerError(rspObj.responseCode,rspObj,errCode+errorCodes.CODE2);
        return response.status(400).send(errorResponse(rspObj,errCode+errorCodes.CODE2));
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

module.exports.createForm = createForm
module.exports.updateForm = updateForm
module.exports.getForm = getForm

