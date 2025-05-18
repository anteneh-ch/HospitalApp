// doctor-dashboard.js

const mockDatabase = {
  patients: [
    {
      id: "pat-789",
      name: "John Doe",
      dob: "1985-04-23",
      lastVisit: "2023-10-10",
      records: []
    }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  const doctorId = localStorage.getItem("doctorId");
  if (doctorId) {
    document.getElementById("doctor-name").textContent = "Dr. " + doctorId;
  }

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("doctorId");
    window.location.href = "doctor-login.html";
  });
});

function showSection(sectionId) {
  const allSections = document.querySelectorAll('.section-content');
  allSections.forEach(sec => sec.classList.add('hidden'));

  document.getElementById(`section-${sectionId}`).classList.remove('hidden');

  const links = document.querySelectorAll('.sidebar-menu a');
  links.forEach(link => link.classList.remove('active'));
  const activeLink = Array.from(links).find(l => l.textContent.toLowerCase().includes(sectionId));
  if (activeLink) activeLink.classList.add('active');
}

function toggleMedicalSection() {
  const section = document.getElementById("medicalRecords");
  section.classList.toggle("hidden");
}

function searchPatient() {
  const id = document.getElementById("patient-id-input").value.trim();
  const patient = mockDatabase.patients.find(p => p.id === id);

  if (!patient) return showToast("Patient not found", "error");

  document.getElementById("patientSection").classList.remove("hidden");
  document.getElementById("patientName").textContent = patient.name;
  document.getElementById("patientDOB").textContent = patient.dob;
  document.getElementById("lastVisit").textContent = patient.lastVisit;

  renderPatientRecords(patient.records);
}

function renderPatientRecords(records) {
  const section = document.getElementById("medicalRecords");
  section.classList.remove("hidden");

  const old = document.querySelector("#medicalRecords .card-records");
  if (old) old.remove();

  const container = document.createElement("div");
  container.className = "card card-records";

  container.innerHTML = records.map(r => `
    <div class="record-item">
      <h3>${r.diagnosis}</h3>
      <p><strong>Date:</strong> ${r.date}</p>
      <p><strong>Vitals:</strong> BP: ${r.vitals.bp}, HR: ${r.vitals.hr}, Oxy: ${r.vitals.oxy}, Temp: ${r.vitals.temp}</p>
      <p><strong>Notes:</strong> ${r.notes || "N/A"}</p>
      <p><strong>Medication:</strong> ${r.medication || "None"} (${r.medDone ? "✔ Done" : "Pending"})</p>
      <p><strong>Orders:</strong> ${r.orders.length ? r.orders.join(", ") : "None"}</p>
      <p><strong>Next Appointment:</strong> ${r.appointment || "Not scheduled"}</p>
    </div>
  `).join('');

  section.appendChild(container);
}

function submitRecord() {
  const patient = mockDatabase.patients[0];

  const diagnosis = document.getElementById("diagnosis").value.trim();
  const bp = document.getElementById("bpInput").value.trim();
  const hr = document.getElementById("hrInput").value.trim();
  const oxy = document.getElementById("oxyInput").value.trim();
  const temp = document.getElementById("tempInput").value.trim();
  const notes = document.getElementById("notes").value.trim();
  const medication = document.getElementById("medication").value.trim();
  const medDone = document.getElementById("medDone").checked;
  const appointment = document.getElementById("appointment").value;

  const selectedOrders = Array.from(document.querySelectorAll(".order:checked")).map(o => o.value);
  const customOrder = document.getElementById("customOrder").value.trim();
  if (customOrder) selectedOrders.push(customOrder);

  if (!diagnosis) return showToast("Diagnosis is required", "error");

  const record = {
    id: `rec-${Date.now()}`,
    date: new Date().toISOString().split("T")[0],
    diagnosis,
    vitals: { bp, hr, oxy, temp },
    notes,
    medication,
    medDone,
    orders: selectedOrders,
    appointment
  };

  patient.records.unshift(record);
  renderPatientRecords(patient.records);
  showToast("Record saved", "success");

  document.getElementById("diagnosis").value = "";
  document.getElementById("bpInput").value = "";
  document.getElementById("hrInput").value = "";
  document.getElementById("oxyInput").value = "";
  document.getElementById("tempInput").value = "";
  document.getElementById("notes").value = "";
  document.getElementById("medication").value = "";
  document.getElementById("appointment").value = "";
  document.getElementById("medDone").checked = false;
  document.getElementById("customOrder").value = "";
  document.querySelectorAll(".order").forEach(o => o.checked = false);
}

function showToast(message, type = "info") {
  const color = {
    success: "#28a745",
    error: "#dc3545",
    info: "#007bff"
  }[type] || "#007bff";

  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: color
  }).showToast();
}
