const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const todos = [{
    id: 1,
    title: 'Lorem, ipsum dolor.',
    completed: true
}, {
    id: 2,
    title: 'Quis ut nam facilis et officia qui',
    completed: false
}, {
    id: 3,
    title: 'Fugiat veniam minus',
    completed: true
}, {
    id: 4,
    title: 'Lorem ipsum. Iste, repellendus! Doloremque',
    completed: false
}, {
    id: 5,
    title: 'Consequatur doloribus veritatis iure voluptates',
    completed: true
}, {
    id: 6,
    title: 'Dolor sit amet consectetur, adipisicing elit',
    completed: true
}, {
    id: 7,
    title: 'Exercitationem eos sed fugit quia voluptatibus optio',
    completed: true
}, {
    id: 8,
    title: 'Reiciendis veritatis eum nemo rem. ',
    completed: true
}, {
    id: 9,
    title: 'Perferendis cupiditate nulla sapiente at necessitatibus exercitationem non amet!',
    completed: true
}, {
    id: 10,
    title: 'Quisquam, hic alias.',
    completed: true
}, {
    id: 11,
    title: 'Nqulla sapiente at necessitatibus exercitationem',
    completed: true
}];

app.get('/api/todos', (req, res) => {
    res.send(todos);
});

app.post('/api/todos', (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({
            success: 'false',
            message: 'title is required',
        });
    }
    const todo = {
        id: todos.length + 1,
        title: req.body.title,
        completed: false
    };

    todos.push(todo);
    res.send(todo);
});

app.put('/api/todos/:id', (req, res) => {
    const todo = todos.find(c => c.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('The answer with the given ID was not found');
    todo.completed = req.body.completed;
    res.send(todo);
});

app.delete('/api/todos/:id', (req, res) => {
    const todo = todos.find(c => c.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('The todo with the given ID was not found');

    const index = todos.indexOf(todo);
    todos.splice(index, 1);
    res.send(todo);
});

app.get('/api/todos/:id', (req, res) => {
    const todo = todos.find(c => c.id === parseInt(req.params.id));
    console.log(req.params.id);
    console.log(todos.id);
    if (!todo) return res.status(404).send('The todo with the given ID was not found');
    res.send(todo);
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listerning on port " + port + "..."));