const setupQualificationTable = document.querySelector(".module-table");
const setupQualificationModal = document.querySelector(
  ".setup-qualification-module-modal"
);
const setupQualificationForm = document.querySelector(".module-modal-form");
const setupQualificationConfirmationModal = document.querySelector(
  ".setup-qualification-confirmation-modal"
);
const setupQualificationDetailModal = document.querySelector(
  ".module-detail-modal"
);
const setupQualificationDetailBox = document.querySelector(
  ".module-modal-detail-box"
);
const markedForDeHighlighting = document.querySelectorAll(
  ".module-title-box, .module-navigation, .module-table, .top-nav, .side-nav"
);
const headers = [
  "",
  "S/N",
  "Name"
];
let rows = [];

const TOKEN = sessionStorage.getItem("access_token");
const BASE_ENDPOINT = "http://52.150.234.195:7268/api";

const setupQualificationService = async (TOKEN, qualificationDetails) => {
  try {
    const response = await fetch(
      `${BASE_ENDPOINT}/Qualifications`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(qualificationDetails),
      }
    );
    const res = await response.json();
    if (!response.ok) {
      console.error("Error:", res);
      throw new Error(res.message);
    }
    return res;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};

const retrieveAllQualificationService = async (TOKEN) => {
  try {
    const response = await fetch(
      `${BASE_ENDPOINT}/Qualifications
`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );
    const res = await response.json();
    if (!response.ok) {
      console.error("Error:", res);
      throw new Error(res.message);
    }
    rows = res?.data;
    renderTable();
    return rows;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};


const renderTable = () => {
setupQualificationTable.innerHTML =
  rows.length > 0
    ? `<table>
        <thead>
            <tr>
                ${headers
                  ?.map(
                    (header, index) => `
                    <th key=${index}>
                        ${header}
                    </th>
                `
                  )
                  .join("")}
            </tr>
        </thead>
        <tbody>
        ${rows
          ?.map(
            (row, index) => `
                <tr 
                    key=${index}
                    onclick="handleOpenDetailModal(event)"
                >
                    <td>
                        <input 
                            type="checkbox"
                        />
                    </td>
                    <td>${row?.id}</td>
                    <td>${row?.name}</td>
                </tr>
            `
          )
          .join("")}
        </tbody>
    </table>`
    : `<div class="call-to-action">
        <div>
            <img src=${"../../assets/search.svg"} alt="search-icon"/>
        </div>
        <div>
            <h3>Nothing to see here...yet</h3>
            <p>When Ofofon logs his setup qualification, they will show up here</p>
        </div>
        <div class="cta-box">
            <button onclick="handleOpenSetupQualification(event)">
                <span>Add New Setup Qualification</span>
            </button>
        </div>
    </div>`;
        }

setupQualificationForm.innerHTML = `
    <form id="setup-qualification-form">
        <div class="row form-field-set">
            <label>Qualification</label>
            <input name="qualificationName" placeholder="Enter Qualification"/>
        </div>
        <div class="row form-cta">
            <button type="reset" onclick="handleCloseSetupQualificationModal()">
                <span>Cancel</span>
            </button>
            <button type="button" onclick="handleOpenConfirmationModal(event)">
                <span>Save Changes</span>
            </button>
        </div>
    </form>
`;

setupQualificationDetailBox.innerHTML = `
        <div>
            // details would go in here
            
        </div>
    `;

function handleOpenDetailModal(e) {
  e.stopPropagation();
  setupQualificationDetailModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseDetailModal() {
  setupQualificationDetailModal.classList.add("close-modal");
  document.body.style.overflow = "auto";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 1;
    item.style.pointerEvents = "auto";
  });
}

function handleOpenSetupQualification(e) {
  e.stopPropagation();
  setupQualificationModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseSetupQualificationModal() {
  setupQualificationModal.classList.add("close-modal");
  document.body.style.overflow = "auto";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 1;
    item.style.pointerEvents = "auto";
  });
}

function handleOpenConfirmationModal(e) {
  e.stopPropagation();
  handleCloseSetupQualificationModal();
  setupQualificationConfirmationModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseConfirmationModal() {
  setupQualificationConfirmationModal.classList.add("close-modal");
  document.body.style.overflow = "auto";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 1;
    item.style.pointerEvents = "auto";
  });
}

function handleOpenSetupManagementModal(e) {
  e.stopPropagation();
  setupManagementModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseSetupManagementModal() {
  setupManagementModal.classList.add("close-modal");
  document.body.style.overflow = "auto";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 1;
    item.style.pointerEvents = "auto";
  });
}

async function handleSetupQualification(e) {
  e.preventDefault();
  const form = document.getElementById("setup-qualification-form");
  const qualification = form.elements["qualificationName"].value;

  const setupButton = document.querySelector(
    '.confirmation-cta button[type="submit"]'
  );
  const errorMessage = document.querySelector(".error-message");

  errorMessage.innerHTML = "";

  const originalText = setupButton.innerHTML;
  setupButton.innerHTML = '<span class="spinner"></span>';
  setupButton.disabled = true;

  try {
    const payload = { ...( { name: qualification }) };
    const response = await setupQualificationService(TOKEN, payload);
    if (response.status === "Success") {
      handleCloseConfirmationModal();
      retrieveAllQualificationService(TOKEN);
    } else {
      errorMessage.innerHTML = `Setup Qualification failed. Please check your credentials and try again`;
      console.log("Failed to setup qualification");
    }
  } catch (error) {
    errorMessage.innerHTML = `Setup Qualification failed. Please check your credentials and try again`;
    console.error("Setup Qualification failed:", error);
  } finally {
    setupButton.innerHTML = originalText;
    setupButton.disabled = false;
  }
}

renderTable();
retrieveAllQualificationService(TOKEN);

window.addEventListener("click", (e) => {
  // condition - if the modal is currently rendered && if the click is not within the modal
  if (
    !setupQualificationModal.classList.contains("close-modal") &&
    !setupQualificationModal.contains(e.target)
  ) {
    handleCloseSetupQualificationModal();
  }
  if (
    !setupQualificationDetailModal.classList.contains("close-modal") &&
    !setupQualificationDetailModal.contains(e.target)
  ) {
    handleCloseDetailModal();
  }
});
