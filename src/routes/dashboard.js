const { Router } = require('express');
const router = Router();

const pool = require("../database");

router.get('/', async (req, res) => {
    const datos = await pool.query("SELECT * FROM datos");
    console.log(datos);
    res.render('links/dashboard', {datos});
});
router.get('/get', async (req, res) => {
    const datos = await pool.query("SELECT * FROM datos");
    console.log(datos);
    res.render('links/dashboard', {datos});
});

router.get('/truncate', async (req, res) => {
    const datos = await pool.query("TRUNCATE datos");    
    res.render('links/dashboard', {datos});
});



module.exports = router;