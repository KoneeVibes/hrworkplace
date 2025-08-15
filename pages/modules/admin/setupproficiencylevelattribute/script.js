const setupProficiencyLevelAttributeTable =
  document.querySelector(".module-table");
const setupProficiencyLevelAttributeModal = document.querySelector(
  ".setup-proficiency-level-attribute-module-modal"
);
const setupProficiencyLevelAttributeForm =
  document.querySelector(".module-modal-form");
const setupProficiencyLevelAttributeConfirmationModal = document.querySelector(
  ".setup-proficiency-level-attribute-confirmation-modal"
);
const setupProficiencyLevelAttributeDetailModal = document.querySelector(
  ".module-detail-modal"
);
const setupProficiencyLevelAttributeDetailBox = document.querySelector(
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

const proficiencyLevelDimension = [
  { id: 1, name: "Select a dimension" },
  { id: 2, name: "Communication" },
  { id: 3, name: "Technical Skills" },
  { id: 4, name: "Leadership" },
];

const proficiencyLevel = [
  { id: 1, name: "Select a level" },
  { id: 2, name: "Beginner" },
  { id: 3, name: "Intermediate" },
  { id: 4, name: "Advanced" },
];

const TOKEN = sessionStorage.getItem("access_token");
const BASE_ENDPOINT = "http://52.150.234.195:7268/api";

const setupProficiencyLevelAttributeService = async (
  TOKEN,
  proficiencyLevelAttributeDetails
) => {
  try {
    const response = await fetch(
      `${BASE_ENDPOINT}/Proficiencies/level-core-attributes`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proficiencyLevelAttributeDetails),
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

setupProficiencyLevelAttributeTable.innerHTML =
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
            <p>When Ofofon logs his setup proficiency level attribute, they will show up here</p>
        </div>
        <div class="cta-box">
            <button onclick="handleOpenSetupProficiencyLevelAttribute(event)">
                <span>Add New Setup Proficiency Level Attribute</span>
            </button>
        </div>
    </div>`;

setupProficiencyLevelAttributeForm.innerHTML = `
    <form id="setup-proficiency-attribute">
        <div class="row form-field-set">
            <label>Proficiency Level Core Attribute</label>
            <input name="proficiency-attribute-name" placeholder="Enter Proficiency Level Core Attribute"/>
        </div>
        <div class="row form-field-set">
        <label>Proficiency Level Core Dimension</label>
        <select name="proficiency-core-dimension-id">
          ${proficiencyLevelDimension.map(
            (dimension) => `<option>${dimension.name}</option>`
          )}
        </select>
      </div>

       <div class="row form-field-set">
        <label>Proficiency Level</label>
        <select name="proficiency-level-id">
          ${proficiencyLevel.map((level) => `<option>${level.name}</option>`)}
        </select>
      </div>
       
        <div class="row form-cta">
            <button type="reset" onclick="handleCloseSetupProficiencyLevelAttributeModal()">
                <span>Cancel</span>
            </button>
            <button type="button" onclick="handleOpenConfirmationModal(event)">
                <span>Save Changes</span>
            </button>
        </div>
    </form>
`;

setupProficiencyLevelAttributeDetailBox.innerHTML = `
        <div>
            // details would go in here
            
        </div>
    `;

function handleOpenDetailModal(e) {
  e.stopPropagation();
  setupProficiencyLevelAttributeDetailModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseDetailModal() {
  setupProficiencyLevelAttributeDetailModal.classList.add("close-modal");
  document.body.style.overflow = "auto";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 1;
    item.style.pointerEvents = "auto";
  });
}

function handleOpenSetupProficiencyLevelAttribute(e) {
  e.stopPropagation();
  setupProficiencyLevelAttributeModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseSetupProficiencyLevelAttributeModal() {
  setupProficiencyLevelAttributeModal.classList.add("close-modal");
  document.body.style.overflow = "auto";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 1;
    item.style.pointerEvents = "auto";
  });
}

function handleOpenConfirmationModal(e) {
  e.stopPropagation();
  handleCloseSetupProficiencyLevelAttributeModal();
  setupProficiencyLevelAttributeConfirmationModal.classList.remove(
    "close-modal"
  );
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseConfirmationModal() {
  setupProficiencyLevelAttributeConfirmationModal.classList.add("close-modal");
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

async function handleSetupProficiencyLevelAttribute(e) {
  e.preventDefault();
  const form = document.getElementById("setup-proficiency-attribute");
  const proficiencyAttributeName =
    form.elements["proficiency-attribute-name"].value;
  const proficiencyDimensionName =
    form.elements["proficiency-core-dimension-id"].value;
  const specificProficiencyDimension = proficiencyLevelDimension.find(
    (d) => d.name === proficiencyDimensionName
  );
  const proficiencyDimensionId = specificProficiencyDimension.id;

  const proficiencyLevelName = form.elements["proficiency-level-id"].value;
  const specificProficiencyLevel = proficiencyLevel.find(
    (d) => d.name === proficiencyLevelName
  );
  const proficiencyLevelId = specificProficiencyLevel.id;

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
      ...{
        name: proficiencyAttributeName,
      },
      proficiencyLevelCoreDimensionId: proficiencyDimensionId,
      proficiencyLevelId: proficiencyLevelId,
    };
    const response = await setupProficiencyLevelAttributeService(
      TOKEN,
      payload
    );
    if (response.status === "Success") {
      handleCloseConfirmationModal();
    } else {
      errorMessage.innerHTML = `Setup Proficiency Level Core Attribute failed. Please check your credentials and try again`;
      console.log("Failed to setup proficiency level core attribute");
    }
  } catch (error) {
    errorMessage.innerHTML = `Setup Proficiency Level Core Attribute failed. Please check your credentials and try again`;
    console.error("Setup Proficiency Level Core Attribute failed:", error);
  } finally {
    setupButton.innerHTML = originalText;
    setupButton.disabled = false;
  }
}

window.addEventListener("click", (e) => {
  // condition - if the modal is currently rendered && if the click is not within the modal
  if (
    !setupProficiencyLevelAttributeModal.classList.contains("close-modal") &&
    !setupProficiencyLevelAttributeModal.contains(e.target)
  ) {
    handleCloseSetupProficiencyLevelAttributeModal();
  }
  if (
    !setupProficiencyLevelAttributeDetailModal.classList.contains(
      "close-modal"
    ) &&
    !setupProficiencyLevelAttributeDetailModal.contains(e.target)
  ) {
    handleCloseDetailModal();
  }
});
