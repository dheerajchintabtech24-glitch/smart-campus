// ================= API URL =================
const API = "https://smart-campus-74c7.onrender.com";

// ================= LOGIN =================
function login() {
    const email = document.getElementById("email").value;

    let role = "student";
    if (email.includes("admin")) role = "admin";
    if (email.includes("staff")) role = "staff";

    localStorage.setItem("role", role);
    window.location.href = "dashboard.html";
}

// ================= LOAD DASHBOARD =================
window.onload = function () {
    const role = localStorage.getItem("role");

    if (document.getElementById("dashboardTitle")) {
        document.getElementById("dashboardTitle").innerText =
            role.toUpperCase() + " DASHBOARD";
    }

    loadIssues();
};

// ================= LOAD ISSUES =================
function loadIssues() {
    fetch(API + "/issues")
        .then(res => res.json())
        .then(data => {
            const role = localStorage.getItem("role");

            if (role === "admin") renderAdmin(data);
            else if (role === "staff") renderStaff(data);
            else renderStudent(data);
        });
}

// ================= STUDENT =================
function submitIssue() {
    const student = document.getElementById("studentName").value;
    const description = document.getElementById("description").value;
    const location = document.getElementById("location").value;
    const category = document.getElementById("category").value;

    fetch(API + "/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student, description, location, category })
    })
    .then(() => {
        alert("Issue Submitted");
        loadIssues();
    });
}

function renderStudent(data) {
    let html = `
        <table>
            <tr>
                <th>Name</th>
                <th>Issue</th>
                <th>Status</th>
            </tr>
    `;

    data.forEach(i => {
        html += `
            <tr>
                <td>${i.student}</td>
                <td>${i.description}</td>
                <td><span class="${i.status.toLowerCase()}">${i.status}</span></td>
            </tr>
        `;
    });

    html += `</table>`;

    document.getElementById("issuesContainer").innerHTML = html;
}

// ================= ADMIN =================
function renderAdmin(data) {
    let html = `
        <table>
            <tr>
                <th>Student</th>
                <th>Issue</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
    `;

    data.forEach(i => {
        html += `
            <tr>
                <td>${i.student}</td>
                <td>${i.description}</td>
                <td>${i.category}</td>
                <td><span class="${i.status.toLowerCase()}">${i.status}</span></td>
                <td>
                    ${i.status === "PENDING" ? `
                        <button onclick="updateStatus(${i.id}, 'APPROVED')">Approve</button>
                        <button onclick="updateStatus(${i.id}, 'DENIED')">Deny</button>
                    ` : "—"}
                </td>
            </tr>
        `;
    });

    html += `</table>`;

    document.getElementById("issuesContainer").innerHTML = html;
}

// ================= STAFF =================
function renderStaff(data) {
    let html = `
        <table>
            <tr>
                <th>Issue</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
    `;

    data.forEach(i => {
        if (i.status === "APPROVED") {
            html += `
                <tr>
                    <td>${i.description}</td>
                    <td>${i.location}</td>
                    <td><span class="${i.status.toLowerCase()}">${i.status}</span></td>
                    <td>
                        <button onclick="updateStatus(${i.id}, 'FIXED')">Mark Done</button>
                    </td>
                </tr>
            `;
        }
    });

    html += `</table>`;

    document.getElementById("issuesContainer").innerHTML = html;
}

// ================= UPDATE STATUS =================
function updateStatus(id, status) {
    fetch(API + "/issues/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
    })
    .then(() => loadIssues());
}

// ================= LOGOUT =================
function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}