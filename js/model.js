export default class Model {
    constructor() {
        this.view = null;
        this.ToDos = JSON.parse(localStorage.getItem('toDos'));
        if (!this.ToDos || this.ToDos.length < 1) {
            this.ToDos = [
                {
                    id: 0,
                    title: 'Learn JS',
                    description: 'Watch JS tutorials',
                    completed: false,
                }
            ]
            this.currentID = 1;
        } else {
            this.currentID = this.ToDos[this.ToDos.length  - 1].id + 1;
        }
        this.currentID = 1;
    }

    setView(view) {
        this.view = view;
    }

    save() {
        localStorage.setItem('toDos', JSON.stringify(this.ToDos));
    }
    getToDos() {
        return this.ToDos.map((todo) => ({...todo}));
    }
    findToDo(id) {
        return this.ToDos.findIndex((todo) => todo.id === id);
    }

    toggleCompleted(id) {
        const index = this.findToDo(id);
        const todo = this.ToDos[index];
        todo.completed = !todo.completed;
        this.save();
    }
    editToDo(id, values) {
        const index = this.findToDo(id);
        Object.assign(this.ToDos[index], values);
        this.save();
    }
    addToDo(title, description){
        const todo = {
            id: this.currentID++,
            title,
            description,
            completed: false
        }
        
        this.ToDos.push(todo);
        console.log(this.ToDos);
        this.save();
        return {...todo};
    }
    removeToDo(id) {
        const index = this.findToDo(id);
        this.ToDos.splice(index, 1);
        this.save();
    }
}