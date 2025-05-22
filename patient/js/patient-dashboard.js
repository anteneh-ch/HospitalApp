// patient-dashboard.js (read-only)

document.addEventListener("DOMContentLoaded", () => {
  showSection("diagnosis");
  renderDiagnosis();
  renderMedication();
  renderTests();
});

function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => sec.style.display = "none");
  document.querySelectorAll(".sidebar ul li a").forEach(link => link.classList.remove("active"));
  document.getElementById(`${id}-section`).style.display = "block";
  document.querySelector(`a[onclick*='${id}']`).classList.add("active");
}

const patientData = {
  diagnosis: [
    { date: "2024-12-01", doctor: "Dr. Helen", hospital: "City Clinic", text: "Diabetes", test: "Blood Test: Normal" },
    { date: "2024-11-20", doctor: "Dr. Kenan", hospital: "Universal Health", text: "Flu", test: "X-ray: Clear" }
  ],
  medication: [
    { date: "2024-12-01", doctor: "Dr. Helen", hospital: "City Clinic", name: "Metformin" },
    { date: "2024-11-21", doctor: "Dr. Kenan", hospital: "Universal Health", name: "Ibuprofen" }
  ],
  tests: [
    { date: "2024-12-01", doctor: "Dr. Helen", hospital: "City Clinic", type: "Blood Test", notes: "Normal CBC" },
    { date: "2024-11-20", doctor: "Dr. Kenan", hospital: "Universal Health", type: "X-ray", notes: "No issue found" }
  ]
};

function renderDiagnosis() {
  const list = document.getElementById("diagnosis-list");
  list.innerHTML = patientData.diagnosis.map(d => `
    <tr>
      <td>${d.date}</td>
      <td>${d.hospital}</td>
      <td>${d.doctor}</td>
      <td>${d.text}</td>
      <td>${d.test}</td>
    </tr>
  `).join("");
}

function renderMedication() {
  const list = document.getElementById("medication-list");
  list.innerHTML = patientData.medication.map(m => `
    <tr>
      <td>${m.date}</td>
      <td>${m.hospital}</td>
      <td>${m.doctor}</td>
      <td>${m.name}</td>
    </tr>
  `).join("");
}

function renderTests() {
  const list = document.getElementById("tests-list");
  list.innerHTML = patientData.tests.map(t => `
    <tr>
      <td>${t.date}</td>
      <td>${t.hospital}</td>
      <td>${t.doctor}</td>
      <td>${t.type}</td>
      <td>${t.notes}</td>
    </tr>
  `).join("");
}

function logoutPatient() {
  localStorage.removeItem("patientId");
  window.location.href = "/shared-login/login.html";
}

