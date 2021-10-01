export default class AddToDo {
    constructor(){
    this.btn = document.getElementById('add');
    this.title = document.getElementById('title');
    this.description = document.getElementById('description');
    }

    onclick(callback) {
        this.btn.onclick = () => {
            if(title.value === "" || description.value === "") {
                // alert.innerText = 'Title and description are required'
                console.error('Incorrect');
            } else {
                callback(this.title.value, this.description.value);
            }
        }
    }
}