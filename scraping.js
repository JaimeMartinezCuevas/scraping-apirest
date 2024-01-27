const express = require('express')
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // Tu lógica de scraping aquí
        res.send('Scraping completado exitosamente'); // Puedes ajustar el mensaje según sea necesario
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el scraping');
    }
});

module.exports = router;