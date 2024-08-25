// loadTable();
// function loadTable() {
//     let stdTable = document.getElementById("tblStudent");

//     let body = ` <thead class="thead-light"> <tr>
//                             <th>Student ID</th>
//                             <th>Name</th>
//                             <th>Address</th>
//                             <th>Action</th>
//                         </tr></tbody>`

//     fetch("http://localhost:8080").then(res => res.json()).then(data => {

//         data.forEach(element => {
//             console.log(element);
//             body += `<tr>
//                 <td>${element.id}</td>
//                 <td>${element.name}</td>
//                 <td>${element.address}</td>
//                 <td><button class="btn btn-sm btn-outline-primary edit-btn mr-2" onclick="updateStudent()>✏️</button>
//                     <button class="btn btn-sm btn-outline-danger delete-btn" onclick="deleteStudent()>🗑️</button>
//                     </td>
//             </tr>`
//         });
//         stdTable.innerHTML = body;
//     })
// }

// function addStudent() {
//     let name = document.getElementById("txtName").value;
//     let address = document.getElementById("txtAddress").value;

//     console.log("name : " + name);
//     console.log("address : " + address);

//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     const raw = JSON.stringify({
//         "name": name,
//         "address": address
//     });

//     const requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: raw,
//         redirect: "follow"
//     };

//     fetch("http://localhost:8080", requestOptions)
//         .then((response) => response.text())
//         .then((result) => {
//             console.log(result)
//             loadTable();

//         })
//         .catch((error) => console.error(error));

// }

// function addStudent() {

// }

function loadTable() {
    let stdTable = document.getElementById("tblStudent");

    let body = `<thead class="thead-light"> 
                    <tr>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>`;

    fetch("http://localhost:8080").then(res => res.json()).then(data => {
        data.forEach(element => {
            body += `<tr>
                        <td>${element.id}</td>
                        <td>${element.name}</td>
                        <td>${element.address}</td>
                        <td>
                            <button class="btn btn-sm btn-outline-primary edit-btn mr-2" onclick="updateStudent('${element.id}', '${element.name}', '${element.address}')">✏️</button>
                            <button class="btn btn-sm btn-outline-danger delete-btn" onclick="deleteStudent(${element.id})">🗑️</button>
                        </td>
                    </tr>`;
        });
        stdTable.innerHTML = body;
    })
}

function addStudent() {
    let name = document.getElementById("txtName").value;
    let address = document.getElementById("txtAddress").value;

    if (name === "" || address === "") {
        alert("Please fill out all fields.");
        return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "name": name,
        "address": address
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://localhost:8080", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result)
            loadTable();
            document.getElementById("txtName").value = "";
            document.getElementById("txtAddress").value = "";
        })
        .catch((error) => console.error(error));
}

function updateStudent(id, name, address) {
    document.getElementById('updateId').value = id;
    document.getElementById('updateName').value = name;
    document.getElementById('updateAddress').value = address;

    $('#updateModal').modal('show');
}

function submitUpdate() {
    let id = document.getElementById('updateId').value;
    let name = document.getElementById('updateName').value;
    let address = document.getElementById('updateAddress').value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "id": id,
        "name": name,
        "address": address
    });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://localhost:8080", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            $('#updateModal').modal('hide');
            loadTable();
        })
        .catch(error => console.error('Error:', error));
}

function deleteStudent(id) {
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
    };

    fetch(`http://localhost:8080/${id}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            loadTable();
        })
        .catch(error => console.error('Error:', error));
}

loadTable();
