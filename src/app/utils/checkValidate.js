class CheckValidate {
    checkGenerateLicsnse(body) {
        if (!body.startTime) throw new Error('startTime is require');
        if (!body.endTime) throw new Error('startTime is require');
        if (!body.organization) throw new Error('organization is require');
        if (!body.secret) throw new Error('secret is require');
        if (body.endTime < body.startTime) throw new Error('start time cannot be greater than end time')
    }
    checkCreateLog(body){
        if (!body.typeLog) throw new Error('typeLog is require');
    }
}

module.exports = new CheckValidate();