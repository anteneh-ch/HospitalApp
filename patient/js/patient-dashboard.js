// patient-dashboard.js

document.addEventListener("DOMContentLoaded", () => {
  renderDiagnosis();
  renderMedication();
  renderTests();
});

const patientData = {
  diagnosis: [
    { text: "Seasonal Allergy", notes: "Prescribed antihistamines." },
    { text: "Flu", notes: "Advised rest and fluids." }
  ],
  medication: [
    { name: "Ibuprofen", notes: "200mg every 6 hours" }
  ],
  tests: [
    { type: "Blood Test", notes: "Normal CBC values." },
    { type: "X-ray", notes: "No abnormalities found." }
  ]
};

function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => sec.style.display = "none");
  document.querySelectorAll(".sidebar ul li a").forEach(link => link.classList.remove("active"));
  document.getElementById(`${id}-section`).style.display = "block";
  document.querySelector(`a[onclick*='${id}']`).classList.add("active");
}

function renderDiagnosis() {
  const list = document.getElementById("diagnosis-list");
  list.innerHTML = patientData.diagnosis.map(d => `
    <div class="record">
      <strong>${d.text}</strong><br>${d.notes}
    </div>
  `).join("");
}

function renderMedication() {
  const list = document.getElementById("medication-list");
  list.innerHTML = patientData.medication.map(m => `
    <div class="record">
      <strong>${m.name}</strong><br>${m.notes}
    </div>
  `).join("");
}

function renderTests() {
  const list = document.getElementById("tests-list");
  list.innerHTML = patientData.tests.map(t => `
    <div class="record">
      <strong>${t.type}</strong><br>${t.notes}
    </div>
  `).join("");
}

function logoutPatient() {
  localStorage.removeItem("patientId");
  window.location.href = "/shared-login/login.html";
}

