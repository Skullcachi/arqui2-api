const { Router } = require('express');
const router = Router();

const mysqlConnection = require("../database");

router.get('/:string', (req,res) => {
    const { string }  = req.params;
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    console.log(today);
    console.log(string);
    mysqlConnection.query("INSERT INTO datos VALUES (?, ?)", [dateTime, string], (err, rows, fields) => {
        if (!err)
        {
            res.json({"code": 200});
        }
        else
        {
            console.log(err);
            res.json({"code": 500});
        }
    });
});

module.exports = router;