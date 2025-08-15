const setupMaritalStatusTable = document.querySelector(".module-table");
const setupMaritalStatusModal = document.querySelector(
  ".setup-marital-status-module-modal"
);
const setupMaritalStatusForm = document.querySelector(".module-modal-form");
const setupMaritalStatusConfirmationModal = document.querySelector(
  ".setup-marital-status-confirmation-modal"
);
const setupMaritalStatusDetailModal = document.querySelector(
  ".module-detail-modal"
);
const setupMaritalStatusDetailBox = document.querySelector(
  ".module-modal-detail-box"
);
const markedForDeHighlighting = document.querySelectorAll(
  ".module-title-box, .module-navigation, .module-table, .top-nav, .side-nav"
);
const headers = [
  "S/N",
  "Name",
  "Company",
  "Department",
  "Task Date",
  "Task Title",
  "Time Spent",
  "Manager's Remark",
  "Status",
  "View",
];
const rows = [""];

const TOKEN = sessionStorage.getItem("access_token");
const BASE_ENDPOINT = "http://52.150.234.195:7268/api";

const setupMaritalStatusService = async (TOKEN, maritalStatusDetails) => {
  try {
    const response = await fetch(`${BASE_ENDPOINT}/maritalstatuses`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(maritalStatusDetails),
    });
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

setupMaritalStatusTable.innerHTML =
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
                    <td>${row}</td>
                    <td>hii</td>
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
            <p>When Ofofon logs his setup marital status, they will show up here</p>
        </div>
        <div class="cta-box">
            <button onclick="handleOpenSetupMaritalStatus(event)">
                <span>Add New Setup Marital Status</span>
            </button>
        </div>
    </div>`;

setupMaritalStatusForm.innerHTML = `
    <form id="setup-marital-status-form">
        <div class="row form-field-set">
            <label>Marital Status</label>
            <select name="marital-status" >
            <option>Select Marital Status</option>
            <option>Single</option>
            <option>Married</option>
            <option>Divorced</option>
            <option>Widow</option>
            <option>Separated</option>
            </select>
        </div>
        
       
        <div class="row form-cta">
            <button type="reset" onclick="handleCloseSetupMaritalStatusModal()">
                <span>Cancel</span>
            </button>
            <button type="button" onclick="handleOpenConfirmationModal(event)">
                <span>Save Changes</span>
            </button>
        </div>
    </form>
`;

setupMaritalStatusDetailBox.innerHTML = `
        <div>
            // details would go in here
            
        </div>
    `;

function handleOpenDetailModal(e) {
  e.stopPropagation();
  setupMaritalStatusDetailModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseDetailModal() {
  setupMaritalStatusDetailModal.classList.add("close-modal");
  document.body.style.overflow = "auto";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 1;
    item.style.pointerEvents = "auto";
  });
}

function handleOpenSetupMaritalStatus(e) {
  e.stopPropagation();
  setupMaritalStatusModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseSetupMaritalStatusModal() {
  setupMaritalStatusModal.classList.add("close-modal");
  document.body.style.overflow = "auto";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 1;
    item.style.pointerEvents = "auto";
  });
}

function handleOpenConfirmationModal(e) {
  e.stopPropagation();
  handleCloseSetupMaritalStatusModal();
  setupMaritalStatusConfirmationModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseConfirmationModal() {
  setupMaritalStatusConfirmationModal.classList.add("close-modal");
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

async function handleSetupMaritalStatus(e) {
  e.preventDefault();
  const form = document.getElementById("setup-marital-status-form");
  const maritalStatus = form.elements["marital-status"].value;

  const setupButton = document.querySelector(
    '.confirmation-cta button[type="submit"]'
  );
  const errorMessage = document.querySelector(".error-message");

  errorMessage.innerHTML = "";

  const originalText = setupButton.innerHTML;
  setupButton.innerHTML = '<span class="spinner"></span>';
  setupButton.disabled = true;

  try {
    const payload = {
      ...(maritalStatus !== "Select Marital Status" && { name: maritalStatus }),
    };
    const response = await setupMaritalStatusService(TOKEN, payload);
    if (response.status === "Success") {
      handleCloseConfirmationModal();
    } else {
      errorMessage.innerHTML = `Setup Marital Status failed. Please check your credentials and try again`;
      console.log("Failed to setup marital status");
    }
  } catch (error) {
    errorMessage.innerHTML = `Setup Marital Status failed. Please check your credentials and try again`;
    console.error("Setup Marital Status failed:", error);
  } finally {
    setupButton.innerHTML = originalText;
    setupButton.disabled = false;
  }
}

window.addEventListener("click", (e) => {
  // condition - if the modal is currently rendered && if the click is not within the modal
  if (
    !setupMaritalStatusModal.classList.contains("close-modal") &&
    !setupMaritalStatusModal.contains(e.target)
  ) {
    handleCloseSetupMaritalStatusModal();
  }
  if (
    !setupMaritalStatusDetailModal.classList.contains("close-modal") &&
    !setupMaritalStatusDetailModal.contains(e.target)
  ) {
    handleCloseDetailModal();
  }
});
