loadTable();
function loadTable() {
    let stdTable = document.getElementById("tblStudent");

    let body = ` <thead class="thead-light"> <tr>
                            <th>Student ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr></tbody>`

    fetch("http://localhost:8080").then(res => res.json()).then(data => {

        data.forEach(element => {
            console.log(element);
            body += `<tr>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>${element.address}</td>
                <td><button class="btn btn-sm btn-outline-primary edit-btn mr-2">✏️</button>
                    <button class="btn btn-sm btn-outline-danger delete-btn">🗑️</button>
                    </td>
            </tr>`
        });
        stdTable.innerHTML = body;
    })
}

function addStudent() {
    let name = document.getElementById("txtName").value;
    let address = document.getElementById("txtAddress").value;

    console.log("name : " + name);
    console.log("address : " + address);

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

        })
        .catch((error) => console.error(error));

}

