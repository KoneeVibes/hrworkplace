const setupProficiencyLevelCoreTable = document.querySelector(".module-table");
const setupProficiencyLevelCoreModal = document.querySelector(
  ".setup-proficiency-level-core-module-modal"
);
const setupProficiencyLevelCoreForm =
  document.querySelector(".module-modal-form");
const setupProficiencyLevelCoreConfirmationModal = document.querySelector(
  ".setup-proficiency-level-core-confirmation-modal"
);
const setupProficiencyLevelCoreDetailModal = document.querySelector(
  ".module-detail-modal"
);
const setupProficiencyLevelCoreDetailBox = document.querySelector(
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

const setupProficiencyLevelCoreService = async (
  TOKEN,
  proficiencyLevelCoreDetails
) => {
  try {
    const response = await fetch(
      `${BASE_ENDPOINT}/Proficiencies/level-core-dimensions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proficiencyLevelCoreDetails),
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

setupProficiencyLevelCoreTable.innerHTML =
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
            <p>When Ofofon logs his setup proficiency level core, they will show up here</p>
        </div>
        <div class="cta-box">
            <button onclick="handleOpenSetupProficiencyLevelCoreModal(event)">
                <span>Add New Setup Proficiency Level Core</span>
            </button>
        </div>
    </div>`;

setupProficiencyLevelCoreForm.innerHTML = `
     <form id="setup-proficiency-level-core-form">
        <div class="row form-field-set">
            <label>Proficiency Level Core Dimension</label>
            <input name="proficiencyLevel-core" placeholder="Enter Proficiency Level Core Dimensions"/>
        </div>
        <div class="row form-cta">
            <button type="reset" onclick="handleCloseSetupProficiencyLevelCoreModal()">
                <span>Cancel</span>
            </button>
            <button type="button" onclick="handleOpenConfirmationModal(event)">
                <span>Save Changes</span>
            </button>
        </div>
    </form>
`;

setupProficiencyLevelCoreDetailBox.innerHTML = `
        <div>
            // details would go in here
            
        </div>
    `;

function handleOpenDetailModal(e) {
  e.stopPropagation();
  setupProficiencyLevelCoreDetailModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseDetailModal() {
  setupProficiencyLevelCoreDetailModal.classList.add("close-modal");
  document.body.style.overflow = "auto";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 1;
    item.style.pointerEvents = "auto";
  });
}

function handleOpenSetupProficiencyLevelCoreModal(e) {
  e.stopPropagation();
  setupProficiencyLevelCoreModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseSetupProficiencyLevelCoreModal() {
  setupProficiencyLevelCoreModal.classList.add("close-modal");
  document.body.style.overflow = "auto";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 1;
    item.style.pointerEvents = "auto";
  });
}

function handleOpenConfirmationModal(e) {
  e.stopPropagation();
  handleCloseSetupProficiencyLevelCoreModal();
  setupProficiencyLevelCoreConfirmationModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseConfirmationModal() {
  setupProficiencyLevelCoreConfirmationModal.classList.add("close-modal");
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

async function handleSetupProficiencyLevelCore(e) {
  e.preventDefault();

  const form = document.getElementById("setup-proficiency-level-core-form");
  const proficiencyLevelCore = form.elements["proficiencyLevel-core"].value;

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
      ...({ name: proficiencyLevelCore }),
    };
    const response = await setupProficiencyLevelCoreService(TOKEN, payload);
    if (response.status === "Success") {
      handleCloseConfirmationModal();
    } else {
      errorMessage.innerHTML = `Setup Proficiency Level Core Dimensions failed. Please check your credentials and try again`;
      console.log("Failed to setup proficiency level core dimension");
    }
  } catch (error) {
    errorMessage.innerHTML = `Setup Proficiency Level Core Dimension failed. Please check your credentials and try again`;
    console.error("Setup Proficiency Level Core Dimension failed:", error);
  } finally {
    setupButton.innerHTML = originalText;
    setupButton.disabled = false;
  }
}

window.addEventListener("click", (e) => {
  // condition - if the modal is currently rendered && if the click is not within the modal
  if (
    !setupProficiencyLevelCoreModal.classList.contains("close-modal") &&
    !setupProficiencyLevelCoreModal.contains(e.target)
  ) {
    handleCloseSetupProficiencyLevelCoreModal();
  }
  if (
    !setupProficiencyLevelCoreDetailModal.classList.contains("close-modal") &&
    !setupProficiencyLevelCoreDetailModal.contains(e.target)
  ) {
    handleCloseDetailModal();
  }
});
