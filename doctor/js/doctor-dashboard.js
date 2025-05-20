// doctor-dashboard.js

// Sample data to simulate real patient entries
const patientData = {
  diagnosis: [
    { text: "Diabetes Type II", notes: "Patient advised to reduce sugar intake." }
  ],
  medication: [
    { name: "Metformin", notes: "500mg daily after breakfast" }
  ],
  tests: [
    { type: "Blood Test", notes: "Normal glucose levels." }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  renderAll();
});

function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
  document.querySelectorAll('.sidebar ul li a').forEach(link => link.classList.remove('active'));

  document.getElementById(`${id}-section`).style.display = 'block';
  document.querySelector(`a[onclick*="${id}"]`).classList.add('active');
}

function renderAll() {
  renderDiagnosis();
  renderMedication();
  renderTests();
}

function renderDiagnosis() {
  const list = document.getElementById("diagnosis-list");
  list.innerHTML = patientData.diagnosis.map(d => `
    <div class="record">
      <strong>${d.text}</strong><br>
      ${d.notes}
    </div>
  `).join("");
}

function renderMedication() {
  const list = document.getElementById("medication-list");
  list.innerHTML = patientData.medication.map(m => `
    <div class="record">
      <strong>${m.name}</strong><br>
      ${m.notes}
    </div>
  `).join("");
}

function renderTests() {
  const list = document.getElementById("tests-list");
  list.innerHTML = patientData.tests.map(t => `
    <div class="record">
      <strong>${t.type}</strong><br>
      ${t.notes}
    </div>
  `).join("");
}

function addDiagnosis() {
  const text = document.getElementById("diagnosis-input").value.trim();
  const notes = document.getElementById("diagnosis-notes").value.trim();
  if (!text) return;
  patientData.diagnosis.unshift({ text, notes });
  renderDiagnosis();
  document.getElementById("diagnosis-input").value = "";
  document.getElementById("diagnosis-notes").value = "";
}

function addMedication() {
  const name = document.getElementById("medication-input").value.trim();
  const notes = document.getElementById("medication-notes").value.trim();
  if (!name) return;
  patientData.medication.unshift({ name, notes });
  renderMedication();
  document.getElementById("medication-input").value = "";
  document.getElementById("medication-notes").value = "";
}

function addTestResult() {
  const type = document.getElementById("test-type").value;
  const notes = document.getElementById("test-notes").value.trim();
  if (!type) return;
  patientData.tests.unshift({ type, notes });
  renderTests();
  document.getElementById("test-notes").value = "";
}

function logoutDoctor() {
  localStorage.removeItem("doctorId");
  window.location.href = "/shared-login/login.html";
}

