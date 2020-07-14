const express = require('express')

const server = express()
server.use(express.json())

const projetos = []


function verificaProjeto(req, res, next){
    //Se não tiver um elemento no array projetos com id colocado então é retornado msg de erro
    const id = req.params.id
    let existe = false

    projetos.forEach( e => {
        if(e.id){
            existe = true
        }
    })

    if(!existe){
        return res.status(400).json({error: 'Projeto Não Existe!'})   
    }
    return next()
}

server.post('/projects', (req, res) => {
    const id = req.body.id
    const title = req.body.title

    let projeto1 = {"id": id, "title": title, "tasks": []}

    projetos.push(projeto1)

    return res.json('Deu certo')
})

server.post('/projects/:id/tasks', verificaProjeto, (req, res) => {
    const title = req.body.title
    const id = req.params.id
    projetos.forEach( e => {
        if(e.id == id){
            e.tasks.push(title)
        }
    });
    return res.json(projetos[0])
})

server.get('/projects', (req,res) => {
    return res.json(projetos)
})

server.put('/projects/:id', verificaProjeto, (req, res) => {
    const id = req.params.id
    const title = req.body.title

    projetos.forEach(e => {
        if(e.id == id){
            e.title = title
        }
    })
    return res.json('OK')
})

server.delete('/projects/:id', verificaProjeto, (req, res) => {
    const id = req.params.id
    
    projetos.forEach( e => {
        if(e.id == id){
            projetos.slice(e, 1)
        }
    });
    projetos.slice(0, 1)
    return res.json('OkK')
})


server.listen(3000);