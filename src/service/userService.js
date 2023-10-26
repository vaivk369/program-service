const envVariables = require('../envVariables')
const learnerService = envVariables['LEARNER_SERVICE_URL']
const axios = require('axios');
const _ = require("lodash");
const RegistryService = require('./registryService')
const registryService = new RegistryService()
const loggerService = require('./loggerService');

const messageUtils = require('./messageUtil');
const userMessages = messageUtils.USER;
var async = require('async')


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

  function searchOsUserWithUserId(userId, callback) {
    let userDetailReq = {
      body: {
        id: "open-saber.registry.search",
        request: {
          entityType: ["User"],
          filters: {
            userId: {
              eq: userId
            }
          }
  
        }
      }
    }
  
    return registryService.searchRecord(userDetailReq, callback);
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
    let userDetailReq = {
      body: {
        id: "open-saber.registry.search",
        request: {
          entityType: ["User_Org"],
          filters: {
            userId: {
              eq: userId
            }
          }
  
        }
      }
    }   
    return registryService.searchRecord(userDetailReq, callback);
  }

  function searchAdminOfOrg (orgOsId, callback) {
    let req = {
      body: {
        id: "open-saber.registry.search",
        request: {
          entityType: ["User_Org"],
          filters: {
            orgId: {
              eq: orgOsId
            },
            roles: {'contains': 'admin'}
          }
        }
      }
    }
  
    return registryService.searchRecord(req, callback);
  }

  function searchOsUserWithUserId (userOsId, callback) {
    let userDetailReq = {
      body: {
        id: "open-saber.registry.search",
        request: {
          entityType: ["User"],
          filters: {
            osid: {
              eq: userOsId
            }
          }
  
        }
      }
    }
  
    return registryService.searchRecord(userDetailReq, callback);
  }

  function deleteUser(req, response) {
    const logObject = {
      traceId : req.headers['x-request-id'] || '',
      message : userMessages.DELETE.INFO
    }
    loggerService.entryLog(req.body, logObject);
    var rspObj = req.rspObj

    if (req.params.userId) {
      console.log(req.params.userId);
      searchOsUserWithUserId(req.params.userId, (err, res) => {
        if (res && res.status == 200 && res.data.result.User.length > 0) {
          var userDetails = res.data.result.User[0];
          if (userDetails.osid) {
            this.deleteOsUser(userDetails.osid, (mapErr, mapRes) => {
              if (mapRes && mapRes.status == 200 && _.get(mapRes.data, 'params.status' == "SUCCESSFULL")) {
                if (userDetails.roles.includes('individual')) { 
                  this.generateDeleteUserEvent (req.params.userId, '')
                  // Generate kafka event
                } else {
                  // get the user org roles. User can be a sourcing org reviewer and or admin / user
                  this.
                  this.getuserOrgList(userDetails.osid, (userOrgError, userOrgRes) => {
                    if (userOrgRes && userOrgRes.status == 200 && userOrgRes.data.result.User_Org.length > 0) {
                      let userRoles = _.map(this.data.result.User_Org, 'role');

                      // if contributing org user 
                      if (userRoles.includes('user')) {
                        const orgId = _.get(_.find(userOrgRes.data.result.User_Org, { role: 'user', userId: userDetails.osid }), 'terms');

                        // find admin of the org to transfer ownership of contents
                        this.searchAdminOfOrg(orgId, (error, res) => {
                          if (res && res.status == 200 && res.data.result.User_Org.length > 0) {
                            var adminUserOrgDetails = res.data.result.User_Org[0];
                            if (adminUserOrgDetails.userId) {
                              this.searchOSUserWithUserOsId(adminUserOrgDetails.userId, (adminErr, adminRes) => {
                                if (adminRes && adminRes.status == 200 && adminRes.data.result.User.length > 0) {
                                  var adminDetails = res.data.result.User_Org[0];
                                  this.generateDeleteUserEvent (req.params.userId, adminDetails.userId);
                                }
                              });
                            
                            }
                  
                          }
                        })



                      }
                    }
                  })


                }
              }
            })
          }
        } else {

        }
      }); 
    }
  }

module.exports.getSunbirdUserProfiles = getSunbirdUserProfiles
module.exports.delete = deleteUser
