// patient-dashboard.js

document.addEventListener("DOMContentLoaded", () => {
  const id = localStorage.getItem("patientId");
  if (!id) return (window.location.href = "/patient/patient-login.html");

  const mockPatients = {
    "pat-789": {
      name: "John Doe",
      records: [
        {
          date: "2025-05-17",
          diagnosis: "Hypertension",
          vitals: { bp: "120/80", hr: "70", oxy: "98%", temp: "36.7" },
          medication: "Lisinopril",
          medDone: true,
          notes: "Follow-up in 1 month",
          orders: ["Blood Test", "CT Scan"],
          appointment: "2025-06-01"
        },
        {
          date: "2025-04-15",
          diagnosis: "Routine Checkup",
          vitals: { bp: "115/75", hr: "72", oxy: "97%", temp: "36.6" },
          medication: "None",
          medDone: false,
          notes: "Patient stable.",
          orders: [],
          appointment: "2025-05-01"
        }
      ],
      flaggedDoctors: ["Dr. Strange", "Dr. Banner"]
    }
  };

  const patient = mockPatients[id];
  if (!patient) return (document.body.innerHTML = "<h1>Patient Not Found</h1>");

  document.getElementById("patient-name").textContent = patient.name;

  renderRecords(patient.records);
  renderAppointments(patient.records);
  renderFlaggedDoctors(patient.flaggedDoctors);
});

function logoutPatient() {
  localStorage.removeItem("patientId");
  window.location.href = "/patient/patient-login.html";
}

function renderRecords(records) {
  const list = document.getElementById("record-list");
  list.innerHTML = records.map(r => `
    <div class="record">
      <strong>Date:</strong> ${r.date}<br>
      <strong>Diagnosis:</strong> ${r.diagnosis}<br>
      <strong>Vitals:</strong> BP ${r.vitals.bp}, HR ${r.vitals.hr}, OXY ${r.vitals.oxy}, Temp ${r.vitals.temp}<br>
      <strong>Medication:</strong> ${r.medication} ${r.medDone ? "(✔)" : "(Pending)"}<br>
      <strong>Notes:</strong> ${r.notes}<br>
      <strong>Orders:</strong> ${r.orders.join(", ") || "None"}
    </div>
  `).join("");
}

function renderAppointments(records) {
  const list = document.getElementById("appointment-list");
  list.innerHTML = records.map(r => r.appointment).filter(Boolean).map(date => `
    <div class="appointment">
      <strong>Scheduled:</strong> ${date}
    </div>
  `).join("");
}

function renderFlaggedDoctors(doctors) {
  const list = document.getElementById("flagged-doctors");
  list.innerHTML = doctors.length
    ? doctors.map(doc => `<div class="flagged">${doc}</div>`).join("")
    : "<p>No flagged doctors.</p>";
}
