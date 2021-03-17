const envVariables = require('../envVariables')
const learningUrl = envVariables['LEARNING_SERVICE_URL']
const axios = require('axios');

class UserService {
  async getDikshaUserProfiles(req, identifier, fields) {
    const option = {
      url: learningUrl + '/user/v1/search',
      method: 'post',
      headers: { ...req.headers },
      data: {
        "request": {
          "fields": fields || [],
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
