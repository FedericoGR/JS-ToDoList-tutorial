import AddToDo from './components/add-todo.js'

export default class View {
    constructor() {
        this.model = null;
        this.table = document.getElementById('table');
        this.addToDoForm = new AddToDo();

        this.addToDoForm.onclick((title, description) => this.addToDo(title, description));
    }

    setModel(model) {
        this.model = model;
    }

    addToDo(title, description) {
    const todo = this.model.addToDo(title, description);
    this.createRow(todo);

    }
    toggleCompleted(id)
{
    this.model.toggleCompleted(id);
    
}    removeToDo(id) {
        this.model.removeToDo(id);
        document.getElementById(id).remove();
    }
    createRow(todo) {
        const row = table.insertRow();
        row.setAttribute('id', todo.id)
        row.innerHTML = `
        <td>${todo.title}</td>
        <td>${todo.description}</td>
            <td class="text-center">
                </td>
                <td class="text-right">
                    <button class="btn btn-primary mb-1">
                    <i class="fa fa-pencil"></i>
                    </button>
                </td>
        `;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toggleCompleted(todo.id);
        row.children[2].appendChild(checkbox);

        const removeBtn = document.createElement("button");
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1')
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>'
        removeBtn.onclick = () => { this.removeToDo(todo.id); }
        row.children[3].appendChild(removeBtn);

    } 
}