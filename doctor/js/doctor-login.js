document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get Doctor ID and Password
  const doctorId = document.getElementById("doctorId").value;
  const password = document.getElementById("password").value;

  // Basic validation (mocked for demo)
  if (doctorId === "doc-123" && password === "password") {
    // Store Doctor ID in LocalStorage for session persistence
    localStorage.setItem("doctorId", doctorId);

    // Redirect to the dashboard
    window.location.href = "doctor-dashboard.html";
  } else {
    alert("Invalid credentials! Please try again.");
  }
});
