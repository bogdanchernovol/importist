const main = require('./main');
const user = require('./user');
const common = require('./common');

module.exports=function(app) {
    app.use('/api/user', user);
    app.use('/api/common', common);
    app.use('/', main);
};
