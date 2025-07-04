const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

const cursos = ["NodeJS", "Java", "JavaScript", "PHP", "Python"];

/**
 * Listagem de todos os cursos
 */
app.get("/cursos", (req, res) => {
    res.json(cursos);
});

/**
 * Listagem de um curso por ID
 */
app.get("/cursos/:index", (req, res) => {

    const index = req.params.index;

    res.json({
        Curso: cursos[index]
    })
})

/**
 * Adicionar curso
 */
app.post("/cursos", (req, res) => {
    cursos.push(req.body.curso);
    res.json(cursos);
});

/**
 * Alterar curso
 */
app.put("/cursos/:index", (req, res) => {
    const index = req.params.index;
    const curso = req.body.curso;

    cursos[index] = curso;

    res.json(cursos);
})

/**
 * Remover Curso
 */
app.delete("/cursos/:index", (req, res) => {
    const index = req.params.index;

    cursos.splice(index, 1);

    res.json(cursos)
})

app.listen(PORT);