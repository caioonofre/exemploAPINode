import express from 'express';

const app = express();
app.use(express.json());

let users = [];
app.post('/usuarios', (req, res) => {
    users.push(req.body);
    res.status(201).send('Post deu certo');
});

app.get('/usuarios', (req, res) => {
    res.status(200).send(users);
});

app.listen(3000);

// app.post('/usuarios');
// app.put('/usuarios');
// app.delete('/usuarios');