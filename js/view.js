import AddToDo from './components/add-todo.js'
import Modal from './components/modal.js'
import Filters from './components/filters.js'

export default class View {
    constructor() {
        this.model = null;
        this.table = document.getElementById('table');
        this.addToDoForm = new AddToDo();
        this.Modal = new Modal();
        this.addToDoForm.onclick((title, description) => this.addToDo(title, description));
        this.Modal.onClick((id, values) => this.editToDo(id, values));
        this.Filters = new Filters();
        this.Filters.onClick((filters) => this.filter(filters));
    }

    setModel(model) {
        this.model = model;
    }
    render() {
        const toDos = this.model.getToDos();
        toDos.forEach((todo) => this.createRow(todo));
    }

    filter(filters) {
        const {type, words} = filters;
        const [, ...rows] = this.table.getElementsByTagName('tr');
        for (const row of rows) {
            const [title, description, completed] = row.children;
            let shouldHide = false;

            if (words) {
                shouldHide = !title.innerText.includes(words) 
                && 
                !description.innerText.includes(words);
            }
            const shouldBeCompleted = type === 'completed';
            const isCompleted = completed.children[0].checked;
            if (type !== 'all' && shouldBeCompleted !== isCompleted) {
                shouldHide = true;
            }
            if (shouldHide) {
                row.classList.add('d-none');
            } else {
            row.classList.remove('d-none');
        }
        }
    }
    addToDo(title, description) {
    const todo = this.model.addToDo(title, description);
    this.createRow(todo);

    }
    toggleCompleted(id)
{
    this.model.toggleCompleted(id);
    
}    
 editToDo(id, values) {
     this.model.editToDo(id, values);
     const row = document.getElementById(id);
     row.children[0].innerText = values.title;
     row.children[1].innerText = values.description;
     row.children[2].children[0].checked = values.completed;
 }
removeToDo(id) {
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
                </td>
        `;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toggleCompleted(todo.id);
        row.children[2].appendChild(checkbox);
        
        const editBtn = document.createElement("button");
        editBtn.classList.add('btn', 'btn-primary', 'mb-1')
        editBtn.innerHTML = '<i class="fa fa-pencil"></i>'
        editBtn.setAttribute('data-toggle', 'modal');
        editBtn.setAttribute('data-target', '#modal');
        editBtn.onclick = () => this.Modal.setValues({
            id: todo.id,
            title: row.children[0].innerText,
            description: row.children[1].innerText,
            completed: row.children[2].children[0].checked,
        });
        row.children[3].appendChild(editBtn);
        
        const removeBtn = document.createElement("button");
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1')
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>'
        removeBtn.onclick = () => { this.removeToDo(todo.id); }
        row.children[3].appendChild(removeBtn);

    } 
}