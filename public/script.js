const app = new Vue({
    el: '#app',
    data: {
        posts: [],
        inputTodo: ""
    },
    
    created () {
        fetch("http://localhost:8000/posts")
        .then(res => res.json())
        .then(data => {
            this.posts = data;
        });
    },

    methods: {
        changeTodoState (todo) {
            fetch(`http://localhost:8000/post/${todo.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todo)
            })
            .then(res => res.json())
            .then(data => {
                Vue.set(app.posts, this.posts.indexOf(todo), data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        },

        addTodo () {
            if (!this.inputTodo) {
                return;
            }
            const todo = {
                content: this.inputTodo,
                checked: false
            }

            this.saveTodo(todo, (data) => {
                this.posts.push(data);
                this.inputTodo = "";
            })
        },

        saveTodo (todo, callback) {
            fetch('http://localhost:8000/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todo)
            })
            .then(res => res.json())
            .then(data => {
                callback(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        },

        deleteTodo (todo) {
            fetch(`http://localhost:8000/post/${todo.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todo)
            })
            .then(res => {
                this.posts.splice(this.posts.indexOf(todo), 1);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }
});