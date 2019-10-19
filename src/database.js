const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
    host: "mysql1004.mochahost.com",
    user: "cachigua_arqui2",
    password: "123456",
    database: "cachigua_arqui2datasync",
});

mysqlConnection.connect(function(err)
{
    if (err){
        console.log(err);
        return;
    }
    else{
        console.log("Db is connected");
    }
});

module.exports = mysqlConnection;