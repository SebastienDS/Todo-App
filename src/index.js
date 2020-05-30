const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const posts = require('./database/Posts.js');

const app = express();
const port = 8000;

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/posts', (req, res) => {
    posts.getPosts(rows => {
        res.json(rows);
    });
});

app.get('/post/:id', (req, res) => {
    posts.getPost(req.params.id, todo => {
        res.json(todo);
    });
});

app.post('/post', (req, res) => {
    posts.insertPost(req.body, todo => {  
        res.json(todo);
    });
});

app.patch('/post/:id', (req, res) => {
    posts.changePostState(req.params.id, todo => {
        res.json(todo);
    });
});

app.delete('/post/:id', (req, res) => {
    posts.deletePost(req.params.id);
    res.status(200).end();
});


app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
});