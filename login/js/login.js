// login.js

function loginUser() {
  const role = document.getElementById("role").value;
  const id = document.getElementById("userId").value.trim();
  const password = document.getElementById("password").value.trim();

  const errorMsg = document.getElementById("error-msg");
  errorMsg.textContent = "";

  if (!role || !id || !password) {
    errorMsg.textContent = "Please fill all fields and select a role.";
    return;
  }

  if (role === "doctor" && id === "doc-123" && password === "4321") {
    localStorage.setItem("doctorId", id);
    window.location.href = "/doctor/doctor-dashboard.html";
  } else if (role === "patient" && id === "pat-789" && password === "1234") {
    localStorage.setItem("patientId", id);
    window.location.href = "/patient/patient-dashboard.html";
  } else {
    errorMsg.textContent = "Invalid credentials for selected role.";
  }
}

function togglePassword() {
  const pw = document.getElementById("password");
  const toggle = document.querySelector(".toggle-pass");
  const isVisible = pw.type === "text";
  pw.type = isVisible ? "password" : "text";

  // Animation (pulse)
  toggle.style.transform = "scale(1.2)";
  toggle.style.transition = "transform 0.2s ease";
  setTimeout(() => {
    toggle.style.transform = "scale(1)";
  }, 150);
}
