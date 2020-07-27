if (process.env.NDOE_ENV !== 'production'){
    require('dotenv').config()
}
module.exports = (session) =>{
    const MySQLStore = require('express-mysql-session')(session);    
    return new MySQLStore({
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT | 3306,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        database: process.env.MYSQL_DATABASE
      });
}