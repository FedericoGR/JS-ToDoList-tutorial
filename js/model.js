export default class Model {
    constructor() {
        this.view = null;
        this.ToDos = [];
        this.currentID = 1;
    }

    setView(view) {
        this.view = view;
    }
    getToDos() {
        return this.ToDos
    }
    findToDo(id) {
        return this.ToDos.findIndex((todo) => todo.id === id);
    }

    toggleCompleted(id) {
        console.log(id);
/*         const index = this.findToDo(id);
        const todo = this.ToDos[index];
        todo.completed = !todo.completed;
        console.log(this.ToDos); */
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
        return {...todo};
    }
    removeToDo(id) {
        const index = this.findToDo(id);
        this.ToDos.splice(index, 1);
    }
}