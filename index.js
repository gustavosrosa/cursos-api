const express = require("express");

const app = express();
const PORT = 3000;

app.get("/curso/:ano", (req, res) => {

    const nome = req.query.nome;
    const ano = req.params.ano;

    res.json({
        OK: `Aprendendo ${nome} em ${ano}`
    })
})

app.listen(PORT);