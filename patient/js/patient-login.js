// patient-login.js

function loginPatient() {
  const id = document.getElementById('patientId').value.trim();
  const password = document.getElementById('password').value.trim();

  // 🔒 Mock login check
  if (id === "pat-789" && password === "1234") {
    localStorage.setItem("patientId", id);
    window.location.href = "/patient/patient-dashboard.html"; // ✅ correct path
  } else {
    document.getElementById('error-msg').textContent = "Invalid ID or password.";
  }
}
