const API_URL = "http://localhost:5000";

async function getEmpresas() {
    const res = await fetch(`${API_URL}/empresas`);
    const data = await res.json();

    // console.log(data);
    return data;
}

async function addUser() {
    const name = document.getElementById("nameInput").value;
    await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
    });
    loadUsers();
}

async function deleteUser(id) {
    await fetch(`${API_URL}/users/${id}`, { method: "DELETE" });
    loadUsers();
}
