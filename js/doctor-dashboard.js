document.addEventListener("DOMContentLoaded", () => {
  const patients = {
    "P001": {
      name: "John Doe",
      history: [
        {
          date: "2025-04-01",
          diagnosis: "Flu",
          oxygen: "97%",
          heartRate: "75 bpm",
          medication: "Paracetamol",
          notes: "Fever and sore throat"
        }
      ]
    }
  };

  const searchForm = document.getElementById("searchForm");
  const diagnosisForm = document.getElementById("diagnosisForm");
  const notFoundMsg = document.getElementById("notFoundMsg");
  const patientSection = document.getElementById("patientSection");
  const historyCards = document.getElementById("historyCards");

  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const inputId = document.getElementById("patientId").value.trim();
    const patient = patients[inputId];

    if (patient) {
      document.getElementById("patientName").textContent = patient.name;
      document.getElementById("patientIdDisplay").textContent = inputId;
      diagnosisForm.setAttribute("data-id", inputId);

      // Show history
      historyCards.innerHTML = "";
      patient.history.forEach(record => addCard(record));

      notFoundMsg.classList.add("hidden");
      patientSection.classList.remove("hidden");
    } else {
      patientSection.classList.add("hidden");
      notFoundMsg.classList.remove("hidden");
    }
  });

  diagnosisForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const id = diagnosisForm.getAttribute("data-id");
    const diagnosis = document.getElementById("diagnosis").value;
    const oxygen = document.getElementById("oxygen").value;
    const heartRate = document.getElementById("heartRate").value;
    const medication = document.getElementById("medication").value;
    const date = document.getElementById("visitDate").value;
    const notes = document.getElementById("notes").value;

    const record = {
      date,
      diagnosis,
      oxygen: `${oxygen}%`,
      heartRate: `${heartRate} bpm`,
      medication,
      notes
    };

    patients[id].history.push(record);
    addCard(record);
    diagnosisForm.reset();
  });

  function addCard(record) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <p><strong>Date:</strong> ${record.date}</p>
      <p><strong>Diagnosis:</strong> ${record.diagnosis}</p>
      <p><strong>Oxygen:</strong> ${record.oxygen}</p>
      <p><strong>Heart Rate:</strong> ${record.heartRate}</p>
      <p><strong>Medication:</strong> ${record.medication}</p>
      <p><strong>Notes:</strong> ${record.notes || '-'}</p>
    `;
    historyCards.appendChild(card);
  }
});
