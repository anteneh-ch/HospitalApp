// doctor-dashboard.js

let currentPatient = null;

const mockPatients = {
  "pat-789": {
    diagnosis: [
      { date: "2024-12-01", doctor: "Dr. Helen", hospital: "City Clinic", text: "Diabetes", test: "Blood Test: Normal" }
    ],
    medication: [
      { date: "2024-12-01", doctor: "Dr. Helen", hospital: "City Clinic", name: "Metformin" }
    ],
    tests: [
      { date: "2024-12-01", doctor: "Dr. Helen", hospital: "City Clinic", type: "Blood Test", notes: "Normal CBC" }
    ]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  showSection("diagnosis");
});

function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => sec.style.display = "none");
  document.querySelectorAll(".sidebar ul li a").forEach(link => link.classList.remove("active"));
  document.getElementById(`${id}-section`).style.display = "block";
  document.querySelector(`a[onclick*='${id}']`).classList.add("active");
}

function loadPatient() {
  const id = document.getElementById("searchId").value.trim();
  const error = document.getElementById("search-error");
  error.textContent = "";

  if (mockPatients[id]) {
    currentPatient = mockPatients[id];
    renderAll();
  } else {
    error.textContent = "Patient not found.";
    currentPatient = null;
    clearAll();
  }
}

function renderAll() {
  renderDiagnosis();
  renderMedication();
  renderTests();
}

function clearAll() {
  document.getElementById("diagnosis-list").innerHTML = "";
  document.getElementById("medication-list").innerHTML = "";
  document.getElementById("tests-list").innerHTML = "";
}

function renderDiagnosis() {
  const list = document.getElementById("diagnosis-list");
  if (!currentPatient) return;
  list.innerHTML = currentPatient.diagnosis.map(d => `
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
  if (!currentPatient) return;
  list.innerHTML = currentPatient.medication.map(m => `
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
  if (!currentPatient) return;
  list.innerHTML = currentPatient.tests.map(t => `
    <tr>
      <td>${t.date}</td>
      <td>${t.hospital}</td>
      <td>${t.doctor}</td>
      <td>${t.type}</td>
      <td>${t.notes}</td>
    </tr>
  `).join("");
}

function addDiagnosis() {
  if (!currentPatient) return;
  const doctor = document.getElementById("diagnosis-doctor").value.trim();
  const hospital = document.getElementById("diagnosis-hospital").value.trim();
  const text = document.getElementById("diagnosis-input").value.trim();
  const test = document.getElementById("test-input").value.trim();
  if (!doctor || !hospital || !text) return;
  const date = new Date().toISOString().split("T")[0];
  currentPatient.diagnosis.unshift({ date, doctor, hospital, text, test });
  renderDiagnosis();
  document.getElementById("diagnosis-doctor").value = "";
  document.getElementById("diagnosis-hospital").value = "";
  document.getElementById("diagnosis-input").value = "";
  document.getElementById("test-input").value = "";
}

function addMedication() {
  if (!currentPatient) return;
  const doctor = document.getElementById("medication-doctor").value.trim();
  const hospital = document.getElementById("medication-hospital").value.trim();
  const name = document.getElementById("medication-input").value.trim();
  if (!doctor || !hospital || !name) return;
  const date = new Date().toISOString().split("T")[0];
  currentPatient.medication.unshift({ date, doctor, hospital, name });
  renderMedication();
  document.getElementById("medication-doctor").value = "";
  document.getElementById("medication-hospital").value = "";
  document.getElementById("medication-input").value = "";
}

function addTestResult() {
  if (!currentPatient) return;
  const doctor = document.getElementById("test-doctor").value.trim();
  const hospital = document.getElementById("test-hospital").value.trim();
  const type = document.getElementById("test-type").value;
  const notes = document.getElementById("test-notes").value.trim();
  if (!doctor || !hospital || !type) return;
  const date = new Date().toISOString().split("T")[0];
  currentPatient.tests.unshift({ date, doctor, hospital, type, notes });
  renderTests();
  document.getElementById("test-doctor").value = "";
  document.getElementById("test-hospital").value = "";
  document.getElementById("test-notes").value = "";
}

function toggleDiagnosisForm() {
  const form = document.getElementById("add-diagnosis-form");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

function toggleMedicationForm() {
  const form = document.getElementById("add-medication-form");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

function toggleTestForm() {
  const form = document.getElementById("add-test-form");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

function logoutDoctor() {
  localStorage.removeItem("doctorId");
  window.location.href = "/shared-login/login.html";
}


