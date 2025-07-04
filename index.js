const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

const cursos = ["NodeJS", "Java", "JavaScript", "PHP", "Python"];

/**
 * Middleware global: Chamada sempre
 */
app.use((req, res, next) => {
    console.log(`API CHAMADA NA PORTA ${PORT} NA ROTA ${req.url}`);

    return next();
})

function checkCursoExistente(req, res, next) {
    if (cursos.includes(req.body.curso)) {
        return res.status(400).json( {
            error: {
                status: 400,
                message: "Curso já existente"
            }
        })
    }
    return next();
}

function checkCurso(req, res, next) {
    if (!req.body.curso) {
        return res.status(400).json( {
            error: {
                status: 400,
                message: "Nome do curso obrigatório"
            }
        })
    }
    return next();
}

function checkId(req, res, next) {
    const index = req.params.index;
    if (!cursos.at(index)) {
        return res.status(400).json( {
            error: {
                status: 400,
                message: "Curso não encontrado!"
            }
        })
    }

    req.curso = cursos[index];
    req.index = index;
    return next();
}

/**
 * Listagem de todos os cursos
 */
app.get("/cursos", (req, res) => {
    res.json(cursos);
});

/**
 * Listagem de um curso por ID
 */
app.get("/cursos/:index", checkId, (req, res) => {
    res.json(cursos[req.index])
})

/**
 * Adicionar curso
 */
app.post("/cursos", checkCurso, checkCursoExistente, (req, res) => {
    cursos.push(req.body.curso);
    res.json(cursos);
});

/**
 * Alterar curso
 */
app.put("/cursos/:index", checkCurso, checkId, (req, res) => {
    const curso = req.body.curso;

    cursos[req.index] = curso;

    res.json(cursos);
})

/**
 * Remover Curso
 */
app.delete("/cursos/:index", checkId, (req, res) => {
    const index = req.params.index;

    cursos.splice(index, 1);

    res.json(cursos)
})

app.listen(PORT);