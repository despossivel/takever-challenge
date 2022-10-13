 
const ModelUser = require('../../src/models/User');
 
 
const user = async () => await ModelUser.deleteMany({});
 
module.exports = {
    user,
};
