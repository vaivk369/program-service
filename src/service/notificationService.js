const envVariables = require('../envVariables');
const learnerService = envVariables['LEARNER_SERVICE_URL'];
const axios = require('axios');
const _ = require("lodash");

class NotificationService {
    constructor () {
    }

    async sendNotification(req, reqData) {
        const option = {
            url: learnerService + '/user/v1/notification/email',
            method: 'post',
            headers: {
                ...req.headers
            },
            data: {
                request: reqData
            }
        };

        return axios(option);
    }

    getTemplate(status, type) {
        let template = '';
        if (status === 'Approved') {
            template = type + 'NominationAccept';
        }
        if (status === 'Rejected') {
            template = type + 'NominationReject';
        }
        return template;
    }

    async sendNominationEmail(req, users, program) {
        const userIdsToEmail = _.compact(_.map(users, user => {
            if (user.email) {
                return user.userId;
            }
        }));

        if (_.isEmpty(userIdsToEmail)) {
            return;
        }

        const emailSubject = `VidyaDaan: Your nomination for ${ program.name } project is accepted`;
        const mode = 'email';
        const request = {
            mode: mode,
            subject: emailSubject,
            recipientUserIds: userIdsToEmail,
            emailTemplateType: this.getTemplate('Approved', mode),
            projectName: program.name,
            baseUrl: envVariables.baseURL,
            body: 'VidyaDaan'
        };
        return this.sendNotification(req, request);
    }

    async sendNominationSms(req, users, program) {
        const userIdsToSms = _.compact(_.map(users, user => {
            if (user.phone) {
                return user.userId;
            }
        }));

        if (_.isEmpty(userIdsToSms)) {
            return;
        }

        const projectName = _.truncate(program.name, { length: 25 });
        const smsURL = envVariables.baseURL;
        const smsYouAreNominated = `VidyaDaan: Your nomination for ${ projectName } is accepted. Please login to ${ smsURL } to start contributing content`;

        const request = {
            mode: 'sms',
            subject: 'VidyaDaan',
            body: smsYouAreNominated,
            recipientUserIds: userIdsToSms
        };
        return this.sendNotification(req, request);
    }
}

module.exports = NotificationService;
