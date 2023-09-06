const formTasks = document.getElementById("tasks-form");
const inputTask = document.getElementById("name");
const taskContent = document.querySelector("table tbody");
const btnAdd = document.getElementById("submit-btn");


const tasks = JSON.parse(localStorage.getItem("tasks-List")) ?? [];
let status = null;

tasks.forEach(element => {
    taskContent.innerHTML += `
    <tr>
        <td>
            ${element.title}
        </td>
        <td>
            <button class="btn btn-info text-white btn-edit" data-id = "${element.id}">Edit</button>
        </td>
        <td>
            <button class="btn btn-danger btn-delete" data-id = "${element.id}">Delete</button>
        </td>
    </tr>
    `
});



formTasks.addEventListener("submit", (e)=>{
    e.preventDefault();
    if (status == null && inputTask.value != "") {
        taskContent.innerHTML += `
    <tr>
        <td>
            ${inputTask.value}
        </td>
        <td>
            <button class="btn btn-info text-white">Edit</button>
        </td>
        <td>
            <button class="btn btn-danger">Delete</button>
        </td>
    </tr>
    `
    }else{
        let storageData = JSON.parse(localStorage.getItem("tasks-List"));
        let newData = storageData.map(function(item){
         if(item.id==status){
            return {
                id: status,
                title: inputTask.value
            }
         }else{
            return item
         }
        });
    }
    setItemInLocalStorage();
    inputTask.value = "";
});


setItemInLocalStorage = () =>{
    if (inputTask.value != "") {
        tasks.push({id: parseInt(Math.random() * 10000), title: inputTask.value});
        localStorage.setItem("tasks-List", JSON.stringify(tasks))
    }
}


const deleteBtns = document.querySelectorAll(".btn-delete");
const editBtns = document.querySelectorAll(".btn-edit");


deleteBtns.forEach((item) =>{
    item.addEventListener("click", ()=>{
        let id = item.getAttribute("data-id");
        let storageData = JSON.parse(localStorage.getItem("tasks-List"));
        let newData = storageData.filter(function(item){
            return item.id != id;
        });
        localStorage.setItem("tasks-List", JSON.stringify(newData))
        item.closest("tr").remove()
    });
});


editBtns.forEach(element => {
    element.addEventListener("click", ()=>{
        let taskTitle = element.parentElement.previousElementSibling.textContent.trim();
        inputTask.value = taskTitle
        btnAdd.value = "Update";
        btnAdd.classList.replace("bg-success", "bg-info");
        status = element.getAttribute("data-id")
    });
});