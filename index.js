import express from 'express';
import { conexao } from './db.js';

const app = express();
app.use(express.json());

let users = [];


app.post('/usuarios', async (req, res) => {
    const conec = await conexao();
    const user = req.body;
    await conec.query(
        'INSERT INTO user (nome, idade, email) VALUES (?, ?, ?);',
        [user.nome, user.idade, user.email]
    );
    res.status(201).send(`${user.nome} foi adicionado no banco de dados!`);
});

app.put('/usuarios/:id', async (req, res) => {
    const conec = await conexao();
    const user = req.body;
    await conec.query(
        'UPDATE user SET nome = ?, idade = ?, email = ? WHERE iduser = ?;',
        [user.nome, user.idade, user.email, req.params.id]
    );
    res.status(204).send(`${user.nome} foi atualizado com sucesso!`);
});

app.delete('/usuarios/:id', async (req, res) => {
    const conec = await conexao();
    const user = await conec.query('DELETE FROM user WHERE iduser = ?;',
        [req.params.id]
    );
    res.status(204).send(`${user.nome} foi deletado com sucesso!`);
});

app.get('/usuarios', async (req, res) => {
    const conec = await conexao();
    const users = await conec.query('SELECT * FROM user;');
    res.status(200).send(users[0]);
});

app.listen(3000);
