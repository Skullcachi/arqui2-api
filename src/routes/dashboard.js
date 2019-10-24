const { Router } = require('express');
const router = Router();

const pool = require("../database");

router.get('/', async (req, res) => {
    const datos = await pool.query("SELECT * FROM datos");
    console.log(datos);
    const vueltas = await pool.query("SELECT COUNT(dato) as vueltas FROM datos");
    console.log("vueltas:",vueltas[0]);
    res.render('links/dashboard', {datos, vueltas: vueltas[0]});
});
router.get('/get', async (req, res) => {
    const datos = await pool.query("SELECT * FROM datos");
    const vueltas = await pool.query("SELECT COUNT(dato) as vueltas FROM datos");
    console.log("vueltas:",vueltas.vueltas);
    console.log(datos);
    res.render('links/dashboard', {datos, vueltas: vueltas[0]});
});

router.post('/setDiameter', async (req, res) => {
    const { diameter } = req.body;
    console.log("diametro", diameter);
    const datos = await pool.query("SELECT * FROM datos");
    const vueltas = await pool.query("SELECT COUNT(dato) as vueltas FROM datos");
    const perimetro = parseFloat((parseFloat(diameter) * Math.PI));
    console.log("perimetro", perimetro);
    const distancia = parseFloat(perimetro * parseFloat(vueltas[0].vueltas)).toFixed(2);
    const tiempoMinimo = await pool.query("SELECT MIN(id) as tiempo FROM datos");
    console.log("Minimo", tiempoMinimo[0].tiempo);
    const tiempoMaximo = await pool.query("SELECT MAX(id) as tiempo FROM datos");
    console.log("Máximo", tiempoMaximo[0].tiempo);
    const tiempo = await pool.query("SELECT TIMESTAMPDIFF(SECOND, '" + tiempoMinimo[0].tiempo + "','" + tiempoMaximo[0].tiempo +"') as tiempo_total ");
    console.log("distancia", distancia + " m");
    console.log("tiempo", tiempo[0].tiempo_total + " s");
    const velocidad = (distancia / parseFloat(tiempo[0].tiempo_total)).toFixed(2);;
    console.log("velocidad", velocidad + " m/s");
    res.render('links/dashboard', {datos, vueltas: vueltas[0], distancia, velocidad, tiempo: tiempo[0]});
});

router.get('/truncate', async (req, res) => {
    const datos = await pool.query("TRUNCATE datos");    
    res.render('links/dashboard', {datos});
});



module.exports = router;