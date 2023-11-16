const envVariables = require('../envVariables')
const learnerService = envVariables['LEARNER_SERVICE_URL']
const axios = require('axios');

class UserService {
  async getSunbirdUserProfiles(req, identifier) {
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
}

module.exports = UserService;
