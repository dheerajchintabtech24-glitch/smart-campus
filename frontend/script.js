function login() {
    const email = document.getElementById("email").value;

    let role = "student";

    if (email.includes("admin")) role = "admin";
    if (email.includes("staff")) role = "staff";

    localStorage.setItem("role", role);

    window.location.href = "dashboard.html";
}