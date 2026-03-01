const setupNationalityTable = document.querySelector(".module-table");
const setupNationalityModal = document.querySelector(
  ".setup-nationality-module-modal"
);
const setupNationalityForm = document.querySelector(".module-modal-form");
const setupNationalityConfirmationModal = document.querySelector(
  ".setup-nationality-confirmation-modal"
);
const setupNationalityDetailModal = document.querySelector(
  ".module-detail-modal"
);
const setupNationalityDetailBox = document.querySelector(
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

const BASE_ENDPOINT = "http://52.150.234.195:7268/api";

let rows = [];

const TOKEN = sessionStorage.getItem("access_token");


const setupNationalityService = async (TOKEN, nationalityDetails) => {
  try {
    const response = await fetch(`${BASE_ENDPOINT}/Nationalities`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nationalityDetails),
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

const retrieveAllNationalitiesService = async (TOKEN) => {
  try {
    const response = await fetch(
      `${BASE_ENDPOINT}/Nationalities
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
    rows = res?.data?.items;
    renderTable();
    return rows;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};


const renderTable = () => {
setupNationalityTable.innerHTML =
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
                    <td>${row.name}</td>
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
            <p>When Ofofon logs his setup nationality, they will show up here</p>
        </div>
        <div class="cta-box">
            <button onclick="handleOpenSetupNationality(event)">
                <span>Add New Setup Nationality</span>
            </button>
        </div>
    </div>`;
        }

setupNationalityForm.innerHTML = `
    <form id="setup-nationality-form">
        <div class="row form-field-set">
            <label>Nationality</label>
            <input name="nationalityName" placeholder="Enter Nationality"/>
        </div>
        
        <div class="row form-cta">
            <button type="reset" onclick="handleCloseSetupNationalityModal()">
                <span>Cancel</span>
            </button>
            <button type="button" onclick="handleOpenConfirmationModal(event)">
                <span>Save Changes</span>
            </button>
        </div>
    </form>
`;

setupNationalityDetailBox.innerHTML = `
        <div>
            // details would go in here
            
        </div>
    `;

function handleOpenDetailModal(e) {
  e.stopPropagation();
  setupNationalityDetailModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseDetailModal() {
  setupNationalityDetailModal.classList.add("close-modal");
  document.body.style.overflow = "auto";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 1;
    item.style.pointerEvents = "auto";
  });
}

function handleOpenSetupNationality(e) {
  e.stopPropagation();
  setupNationalityModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseSetupNationalityModal() {
  setupNationalityModal.classList.add("close-modal");
  document.body.style.overflow = "auto";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 1;
    item.style.pointerEvents = "auto";
  });
}

function handleOpenConfirmationModal(e) {
  e.stopPropagation();
  handleCloseSetupNationalityModal();
  setupNationalityConfirmationModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseConfirmationModal() {
  setupNationalityConfirmationModal.classList.add("close-modal");
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

async function handleSetupNationality(e) {
  e.preventDefault();
  const form = document.getElementById("setup-nationality-form");
  const nationality = form.elements["nationalityName"].value;

  const setupButton = document.querySelector(
    '.confirmation-cta button[type="submit"]'
  );
  const errorMessage = document.querySelector(".error-message");

  errorMessage.innerHTML = "";

  const originalText = setupButton.innerHTML;
  setupButton.innerHTML = '<span class="spinner"></span>';
  setupButton.disabled = true;

  try {
    const payload = { ...{ name: nationality } };
    const response = await setupNationalityService(TOKEN, payload);
    if (response.status === "Success") {
      handleCloseConfirmationModal();
      retrieveAllNationalitiesService(TOKEN);
    } else {
      errorMessage.innerHTML = `Setup Nationality failed. Please check your credentials and try again`;
      console.log("Failed to setup nationality");
    }
  } catch (error) {
    errorMessage.innerHTML = `Setup Nationality failed. Please check your credentials and try again`;
    console.error("Setup Nationality failed:", error);
  } finally {
    setupButton.innerHTML = originalText;
    setupButton.disabled = false;
  }
}

renderTable();
retrieveAllNationalitiesService(TOKEN);

window.addEventListener("click", (e) => {
  // condition - if the modal is currently rendered && if the click is not within the modal
  if (
    !setupNationalityModal.classList.contains("close-modal") &&
    !setupNationalityModal.contains(e.target)
  ) {
    handleCloseSetupNationalityModal();
  }
  if (
    !setupNationalityDetailModal.classList.contains("close-modal") &&
    !setupNationalityDetailModal.contains(e.target)
  ) {
    handleCloseDetailModal();
  }
});
