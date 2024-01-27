const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const scrapingRouter = require('./scraping');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let noticias = [];

function leerDatos() {
    try {
        const data = fs.readFileSync('noticias.json', 'utf-8');
        noticias = JSON.parse(data);
        return noticias;
    } catch (error) {
        console.error('Ha ocurrido un error al recoger las noticias.', error.message);
    }
}

function guardarDatos() {
    fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));
}



app.use('/', scrapingRouter);

app.get('/noticias', (req, res) => {
    res.json(noticias);
});

app.post('/noticias', (req, res) => {
    leerDatos();
    const noticia = {
        id: noticias.length,
        titulo: req.body.titulo,
        imagen: req.body.imagen,
        descripcion: req.body.descripcion,
        enlace: req.body.enlace,
    };
    noticias.push(noticia);
    guardarDatos();
    res.json(noticia);
});

app.get('/noticias/:id', (req, res) => {
    const id = req.params.id;
    noticias = leerDatos();
    const findNews = noticias.find(noticia => noticia.id == id);
    res.json(findNews);
});

app.put('/noticias/:id', (req, res) => {
    noticias = leerDatos();
    const id = req.params.id;
    const index = noticias.findIndex(noticia => noticia.id == id);
    if (index != -1) {
        noticias[index] = {
            id: noticias[index].id,
            titulo: req.body.titulo,
            imagen: req.body.imagen,
            descripcion: req.body.descripcion,
            enlace: req.body.enlace,
        };
        guardarDatos();
        res.json(noticias[index]);
    } else {
        res.status(404).send('No se ha podido hallar la noticia.');
    }
});

app.delete('/noticias/:id', (req, res) => {
    leerDatos();
    const id = req.params.id;
    noticias = noticias.filter(noticia => noticia.id != id);
    guardarDatos();
    res.json(noticias);
});

app.listen(3000, () => {
    console.log('Express está escuchando en el puerto http://localhost:3000');
});
