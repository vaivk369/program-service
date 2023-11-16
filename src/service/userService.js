const envVariables = require('../envVariables')
const uuid = require("uuid/v1")

const learnerService = envVariables['LEARNER_SERVICE_URL']
const axios = require('axios');
const _ = require("lodash");
const { successResponse, errorResponse, loggerError } = require('../helpers/responseUtil');
const KafkaService = require('../helpers/kafkaUtil')
const { of  } = require("rxjs");
const RegistryService = require('./registryService')
const registryService = new RegistryService()
const loggerService = require('./loggerService');
const messageUtils = require('./messageUtil');
const responseCode = messageUtils.RESPONSE_CODE;
const userMessages = messageUtils.USER;
var async = require('async')
let mappedOrgs = [];
let logObject = {};

async function getSunbirdUserProfiles(req, identifier) {
    const option = {
      url: learnerService + '/user/v3/search',
      method: 'post',
      headers: {
        ...req.headers
      },
      data: {
        "request": {
          "filters": {
            "identifier": identifier
          }
        }
      }
    };
    return axios(option);
}

function searchRegistry(entity, filter, callback) {
  let regReq = {
    body: {
      id: "open-saber.registry.search",
      request: {
        entityType: entity,
        filters: {
          filter
        }
      }
    }
  }

  return registryService.searchRecord(regReq, callback);
}

function searchOsUserWithUserId(userId, callback) {
  let filter= {
        userId: {
           eq: userId
        }
      }
  return searchRegistry(["User"], filter, callback);
}

function deleteOsUser (userOsId, callback) {
    let regReq = {
      body: {
        id: "open-saber.registry.update",
        request: {
          User: {
            osid: userOsId,
            firstName: "Deleted User",
            lastName: (userDetails.lastName) ? "Deleted USer": '',
            isDeleted: true
          }
        }
      }
    }
    return registryService.updateRecord(regReq, callback);
}

function getuserOrgList(userId) {
  let filter = {
        userId: {
          eq: userId
        }
      }
  return searchRegistry(["User_Org"], filter, callback);
 }

function searchAdminOfOrg (orgOsId, callback) {
  let filter = {
          orgId: {
            eq: orgOsId
          },
          roles: {'contains': 'admin'}
  }
  return searchRegistry(["User_Org"], filter, callback);
}

function searchOSUserWithOsId (userOsId, callback) {
  let filter = {
       osid: {
        eq: userOsId
      }
    }
  return searchRegistry(["User"], filter, callback);
}

function getUserRole(userDetails) {
  if (userDetails.roles.includes('individual')) {
    return 'individual';
  } else {
    getuserOrgList(userDetails.osid, (userOrgError, userOrgRes) => {
      if (userOrgRes && userOrgRes.status == 200 && userOrgRes.data.result.User_Org.length > 0) {
        mappedOrgs = userOrgRes.data.result.User_Org;
        let userRoles = _.map(userOrgRes.data.result.User_Org, 'role');
        const osroles = ['user', 'admin', 'sourcing_admin', 'sourcing_reviewer']

        _.forEach(osroles, (roleName) => {
          if (userRoles.includes(roleName)) {
            return roleName;
          }
        })
        // if contributing org user 
        /*if (userRoles.includes('user')) {
          return 'user';
        } else if (userRoles.includes('admin')) {
            return 'admin';
        }
        else if (userRoles.includes('sourcing_admin')) {
          return 'sourcing_admin';
        }
        else if (userRoles.includes('sourcing_reviewer')) {
          return 'sourcing_reviewer';
        }*/
      } else {
        console.log('User deletion failed', JSON.stringify(userOrgError))
        if(userOrgError.response && userOrgError.response.data) {
          console.log(`User delete error ==> ${req.params.userId}  ==>`, JSON.stringify(userOrgError.response.data));
        }
        rspObj.errCode = userMessages.DELETE.FAILED_CODE
        rspObj.errMsg = userMessages.DELETE.FAILED_MESSAGE
        rspObj.responseCode = responseCode.SERVER_ERROR
        return '';
      }
    });
  }
}

function onIndividualUserDeletion (req, response, userDetails) {
  const eventData = generateDeleteUserEvent (req, response, userDetails, {});
  KafkaService.sendRecord(eventData, function (err, res) {
    if (err) {
      handleUserDeleteError(req, response, error);
    } else {
      rspObj.responseCode = 'OK'
      rspObj.result = {
        'publishStatus': `Publish Operation for Content Id ${data.request.content_id} Started Successfully!`
      }
      loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
      return response.status(200).send(successResponse(rspObj));
    }
  });
}
function onOrgUserDeletion(req, response, userDetails) {
  const orgId = _.get(_.find(mappedOrgs, { role: 'user', userId: userDetails.osid }), 'orgId');

  // find admin of the org to transfer ownership of contents
  searchAdminOfOrg(orgId, (error, res) => {
    if (res && res.status == 200) {
      if (res.data.result.User_Org.length > 0) {
        var adminUserOrgDetails = res.data.result.User_Org[0];
        if (adminUserOrgDetails.userId) {
          searchOSUserWithOsId(adminUserOrgDetails.userId, (adminErr, adminRes) => {
            if (adminRes && adminRes.status == 200 && adminRes.data.result.User.length > 0) {
              var adminDetails = adminRes.data.result.User[0];
              generateDeleteUserEvent (req, response, userDetails, {role: 'admin', users: [adminDetails.userId]});
            } else {
              handleUserDeleteError(req, response, adminErr)
            }
          });
        }
      } else {
        handleUserDeleteError(req, response, "Admin for the org not found");
      }
    } else {
      handleUserDeleteError(req, response, error);
    }
  });
}

function handleUserDeleteError (req, response, error) {
  var rspObj = req.rspObj
  console.log('User deletion failed', JSON.stringify(error))
  if(error.response && error.response.data) {
    console.log(`User delete error ==> ${req.params.userId}  ==>`, JSON.stringify(error.response.data));
  }
  const errCode = userMessages.DELETE.EXCEPTION_CODE;
  rspObj.errCode = userMessages.DELETE.FAILED_CODE;
  rspObj.errMsg = userMessages.DELETE.FAILED_MESSAGE
  rspObj.responseCode = responseCode.SERVER_ERROR
  rspObj.result  = error;
  loggerError(rspObj, errCode);
  loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
  return response.status(500).send(errorResponse(rspObj, errCode));
}

function generateDeleteUserEvent(req, response, userDetails, replacementUsers) {
  var ets = Date.now();
  var dataObj = {
    'eid': 'BE_JOB_REQUEST',
    'ets': ets,
    'mid': `LP.${ets}.${uuid()}`,
    'actor': {
      'id': 'delete-user',
      'type': 'System'
    },
    'context': {
      'pdata': {  
        'ver': '1.0',
        'id': 'org.sunbird.platform'
      },
      'channel': userDetails.channel,
      'env': envVariables.PUBLISH_ENV
    },
    'object': {
      'type': 'User',
      'id': userDetails.userId
    },
    'edata': {
      'action': 'delete-user',
      'iteration': 1,
      'organisationId': '',
      'userId': userDetails.userId,
      'suggested_users' : replacementUsers
    }
  }

  return dataObj;
}

function deleteUser(req, response) {
  logObject['message'] = userMessages.DELETE.INFO
  logObject['traceId'] = req.headers['x-request-id'] || '',
  loggerService.entryLog(req.body, logObject);
  var rspObj = req.rspObj
  if (req.params.userId) {
    console.log(req.params.userId);
    searchOsUserWithUserId(req.params.userId, (err, res) => {
      if (res && res.status == 200) {
        if (res.data.result.User.length > 0) {
        var userDetails = res.data.result.User[0];
        if (userDetails.osid) {
          deleteOsUser(userDetails.osid, (mapErr, mapRes) => {
            if (mapRes && mapRes.status == 200 && _.get(mapRes.data, 'params.status' == "SUCCESSFULL")) {
              const userRole = getUserRole(userDetails);
              switch(userRole) {
                case 'individual' :
                  onIndividualUserDeletion (req, response, userDetails)
                break;
                case 'user': 
                  onOrgUserDeletion(req, response, userDetails)
                break;
                case 'admin':
                break;
                case 'sourcing_admin':
                break;
                case 'sourcing_reviewer':
                break;
                default: 
                break;
              }
            } else {
              handleUserDeleteError(req, response, mapErr)
            }
          });
        } else {
          handleUserDeleteError(req, response,  'OpenSaber entry for given user is not found');
        }
        } else {
          handleUserDeleteError(req, response, 'OpenSaber entry for given user is not found');
        }
      } else {
        handleUserDeleteError(req, response, err)
      }
    }); 
  } else {
    rspObj.errCode = userMessages.DELETE.MISSING_CODE
    rspObj.errMsg = userMessages.DELETE.MISSING_MESSAGE
    rspObj.responseCode = responseCode.CLIENT_ERROR
    loggerError(rspObj,errCode);
    loggerService.exitLog({responseCode: rspObj.responseCode}, logObject);
    return response.status(400).send(errorResponse(rspObj,errCode))
  }
}

module.exports.getSunbirdUserProfiles = getSunbirdUserProfiles
module.exports.delete = deleteUser
