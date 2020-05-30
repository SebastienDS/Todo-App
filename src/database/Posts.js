const db = require('./connection.js');


const getPosts = function (callback) {
    db.query('SELECT * FROM Posts', (err, rows) => {
        if (err) throw err;
    
        callback(rows);
    });
};

const getPost = function (id, callback) {
    db.query('SELECT * FROM Posts WHERE id = ?', [id], (err, row) => {
        if (err) throw err;
    
        callback(row[0]);
    });
};

const insertPost = function (todo, callback) {
    db.query('INSERT INTO Posts (content, checked) values (?, ?)', [todo.content, todo.checked], (err, res) => {
        if (err) throw err;
        
        callback({id: res.insertId, ...todo});
    });
};

const changePostState = function (id, callback) {
    getPost(id, (todo) => {
        todo.checked = !todo.checked;
        db.query('UPDATE Posts SET checked = ? WHERE id = ?', [todo.checked, id], (err, res) => {
            if (err) throw err;

            callback(todo);
        });
    });
};

const deletePost = function (id) {
    db.query('DELETE FROM Posts WHERE id = ?', [id], (err, res) => {
        if (err) throw err;
    })
}

module.exports = {
    getPosts,
    getPost,
    insertPost,
    changePostState,
    deletePost
};