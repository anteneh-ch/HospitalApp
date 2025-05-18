// patient-login.js

function loginPatient() {
  const id = document.getElementById("patientId").value.trim();
  const password = document.getElementById("password").value.trim();

  if (id === "pat-789" && password === "1234") {
    localStorage.setItem("patientId", id);
    window.location.href = "/patient/patient-dashboard.html";
  } else {
    document.getElementById("error-msg").textContent = "Invalid ID or password.";
  }
}

function togglePassword() {
  const pwField = document.getElementById("password");
  if (pwField.type === "password") {
    pwField.type = "text";
  } else {
    pwField.type = "password";
  }
}
