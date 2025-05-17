document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (email && password) {
      alert(`Logged in as ${email}`);
      window.location.href = "doctor-dashboard.html";
    } else {
      alert("Please enter both email and password.");
    }
  });
});
