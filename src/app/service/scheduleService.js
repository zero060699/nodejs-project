const config = require("../config/config.json");

class dataSharingService {
    pagingData = (data, size, page) => {
        const pageStart = size * page - size;
        const pageEnd = pageStart + size;
        const result = data.slice(pageStart, pageEnd);
        return result;
    };
}

module.exports = new dataSharingService() 