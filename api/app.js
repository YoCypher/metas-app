const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('./models/Metas');
const Meta = mongoose.model('Meta');

const app = express();

app.use(express.json());

//Especificação do Cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
});

mongoose.connect('mongodb://localhost/celke', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection with database successful!");
}).catch((err) => {
    console.log("Error: Connection is not successful!" + err);
});

app.get('/metas', async (req, res) => {
    await Meta.find({}).then((metas) => {
        return res.json({
            error: false,
            metas
        });
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum registro encontrado!"
        });
    });
});

app.post('/metas', async(req, res) => {
    await Meta.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Erro: Meta não cadastrada com sucesso!"
        });
    });
    return res.json({
        error: false,
        message: "Meta cadastrada com sucesso!"
    });
});

app.listen(8080, () => {
    console.log("Servidor iniciado com sucesso na porta 8080: https://localhost:8080");
});