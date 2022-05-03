// Получение всех отелей
 async function GetPeople() {
     // отправляет запрос и получаем ответ
     const response = await fetch("/api/peoples", {
         method: "GET",
         headers: { "Accept": "application/json" }
 });
 // если запрос прошел нормально

 if (response.ok === true) {
     // получаем данные
     const peoples = await response.json();
     let rows = document.querySelector("tbody");
     peoples.forEach(people => {
         // добавляем полученные элементы в таблицу
         rows.append(row(people));
        
    });
    
}
 }
 // Получение одного отеля
 async function GetPeopleById(id) {
     const response = await fetch("/api/peoples/" + id, {
         method: "GET",
         headers: { "Accept": "application/json" }
 });
 if (response.ok === true) {
     const people = await response.json();
     const form = document.forms["peoplesForm"];
     form.elements["id"].value = people.id;
     form.elements["name"].value = people.name;
     form.elements["age"].value = people.age;
     form.elements["surname"].value = people.surname;
     
    
}
 }

async function CreatePeople(peopleId, peopleName, peopleAge,
    peopleSurname) {
     const response = await fetch("/api/peoples", {
         method: "POST",
        headers: {
            "Accept": "application/json", "Content-Type":
                "application/json"
        },
         body: JSON.stringify({
             id: parseInt(peopleId, 10),
             name: peopleName,
             age: parseInt(peopleAge, 10),
             surname: peopleSurname
            
 })
 });
     if (response.ok === true) {
         const people = await response.json();
         reset();
         document.querySelector("tbody").append(row(people));
        
    }
    
}

async function EditPeople(peopleId, peopleName, peopleAge,
    peopleSurname) {
     const response = await fetch("/api/peoples/" + peopleId, {
         method: "PUT",
        
headers: {
        "Accept": "application/json", "Content-Type":
            "application/json"
    },
         body: JSON.stringify({
             id: parseInt(peopleId, 10),
             name: peopleName,
             age: parseInt(peopleAge, 10),
             surname: peopleSurname
            
 })
 });
 if (response.ok === true) {
     const people = await response.json();
    
     reset();
    
    document.querySelector("tr[data-rowid='" + people.id +
        "']").replaceWith(row(people));
    
}
 }
 // Удаление пользователя
 async function DeletePeople(id) {
     const response = await fetch("/api/peoples/" + id, {
         method: "DELETE",
         headers: { "Accept": "application/json" }
 });
 if (response.ok === true) {
     const people = await response.json();
    
    document.querySelector("tr[data-rowid='" + people.id +
        "']").remove();
    
}
 }
 // сброс формы
 function reset() {
     const form = document.forms["peoplesForm"];
     form.reset();
     form.elements["id"].value = 0;
    
    
}
 // создание строки для таблицы
 function row(people) {
     const tr = document.createElement("tr");
     tr.setAttribute("data-rowid", people.id);
     const idTd = document.createElement("td");
     idTd.append(people.id);
     tr.append(idTd);
     const nameTd = document.createElement("td");
     nameTd.append(people.name);
     tr.append(nameTd);
     const ageTd = document.createElement("td");
     ageTd.append(people.age);
     tr.append(ageTd);
     const surnameTd = document.createElement("td");
     surnameTd.append(people.surname);
     tr.append(surnameTd);
     const linksTd = document.createElement("td");
     const editLink = document.createElement("a");
     editLink.setAttribute("data-id", people.id);
     editLink.setAttribute("style", "cursor:pointer;padding:15px;");
     editLink.append("Изменить");
     editLink.addEventListener("click", e => {
         e.preventDefault();
         GetPeopleById(people.id);
        
    });
     linksTd.append(editLink);
     const removeLink = document.createElement("a");
     removeLink.setAttribute("data-id", people.id);
     removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
     removeLink.append("Удалить");
     removeLink.addEventListener("click", e => {
         e.preventDefault();
         DeletePeople(people.id);
        
    });
     linksTd.append(removeLink);
     tr.appendChild(linksTd);
     return tr;
    
}

function InitialFunction() {
   
     // сброс значений формы
     document.getElementById("reset").click(function (e) {
         e.preventDefault();
         reset();
        
        
    })
     // отправка формы
     document.forms["peoplesForm"].addEventListener("submit", e => {
         e.preventDefault();
         const form = document.forms["peoplesForm"];
         const id = form.elements["id"].value;
         const name = form.elements["name"].value;
         const age = form.elements["age"].value;
         const surname = form.elements["surname"].value;
         if (id == 0)
             CreatePeople(id, name, age, surname);
         else
         EditPeople(id, name, age, surname);
        
    });
     GetPeople();
}