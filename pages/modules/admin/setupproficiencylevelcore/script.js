const setupProficiencyLevelCoreTable = document.querySelector(".module-table");
const setupProficiencyLevelCoreModal = document.querySelector(
  ".setup-proficiency-level-core-module-modal",
);
const setupProficiencyLevelCoreForm =
  document.querySelector(".module-modal-form");
const setupProficiencyLevelCoreConfirmationModal = document.querySelector(
  ".setup-proficiency-level-core-confirmation-modal",
);
const setupProficiencyLevelCoreDetailModal = document.querySelector(
  ".module-detail-modal",
);
const setupProficiencyLevelCoreDetailBox = document.querySelector(
  ".module-modal-detail-box",
);
const markedForDeHighlighting = document.querySelectorAll(
  ".module-title-box, .module-navigation, .module-table, .top-nav, .side-nav",
);
const headers = ["", "S/N", "Name"];

let rows = [];

const TOKEN = sessionStorage.getItem("access_token");
const BASE_ENDPOINT = "http://52.150.234.195:7268/api";

const setupProficiencyLevelCoreService = async (
  TOKEN,
  proficiencyLevelCoreDetails,
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
      },
    );
    const res = await response.json();
    if (!response.ok) {
      console.error("Error:", res);
      throw new Error(res.message);
    }
    return res;
  } catch (error) {
    console.error("API post error:", error);
    throw error;
  }
};

const retrieveAllProficiencyLevelCoreService = async (TOKEN) => {
  try {
    const response = await fetch(
      `${BASE_ENDPOINT}/Proficiencies/level-core-dimensions`,
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

const retrieveProficiencyLevelCoreByIdService = async (
  TOKEN,
  proficiencyLevelCoreId,
) => {
  try {
    const response = await fetch(
      `${BASE_ENDPOINT}/Proficiencies/level-core-dimensions/${proficiencyLevelCoreId}`,
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
      throw new Error(res.message);
    }
    return res?.data;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};

const updateProficiencyLevelCoreByIdService = async (
  TOKEN,
  proficiencyLevelCoreId,
  proficiencyLevelCoreDetails,
) => {
  try {
    const response = await fetch(
      `${BASE_ENDPOINT}/Proficiencies/level-core-dimensions/${proficiencyLevelCoreId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proficiencyLevelCoreDetails),
      },
    );
    const res = await response.json();
    console.log(res);
    if (!response.ok) {
      console.error("Error:", res);
      throw new Error(res.message);
    }
    return res;
  } catch (error) {
    console.error("API post error:", error);
    throw error;
  }
};

const renderTable = () => {
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
                `,
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
                    onclick="handleOpenDetailModal(event, ${row.id})"
                >
                    <td>
                        <input 
                            type="checkbox"
                        />
                    </td>
                    <td>${row?.id}</td>
                    <td>${row.name}</td>
                </tr>
            `,
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
};

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

async function handleOpenDetailModal(e, proficiencyLevelCoreId) {
  e.stopPropagation();
  setupProficiencyLevelCoreDetailModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });

  setupProficiencyLevelCoreDetailBox.innerHTML = `<p style="text-align: center">Loading...</p>`;

  try {
    const response = await retrieveProficiencyLevelCoreByIdService(
      TOKEN,
      proficiencyLevelCoreId,
    );

    setupProficiencyLevelCoreDetailBox.innerHTML = `
      <form id="detail-proficiency-level-core-form">
       <div class="row form-field-set">
            <label>Proficiency Level</label>
            <input name="proficiencyLevel-core" value="${response.name}" placeholder="Enter Proficiency Level Core Dimensions"/>
        </div>
        
        <div class="row form-cta">
            <button type="reset" onclick="handleCloseDetailModal()">
                <span>Cancel</span>
            </button>
            <button type="button" id="update-proficiencyLevel-core-btn">
                <span>Save Changes</span>
            </button>
        </div>
      </form>
    `;

    document
      .getElementById("update-proficiencyLevel-core-btn")
      .addEventListener("click", async () => {
        const form = document.getElementById("detail-proficiency-level-core-form");
        const updatedName = form.elements["proficiencyLevel-core"].value;

        const payload = {
          name: updatedName,
        };

        try {
          const response = await updateProficiencyLevelCoreByIdService(
            TOKEN,
            proficiencyLevelCoreId,
            payload,
          );

          if (response.status == "Success") {
            handleCloseDetailModal();
            retrieveAllProficiencyLevelCoreService(TOKEN);
          }
        } catch (error) {
          console.error("Update failed:", error);
        }
      });
  } catch (error) {
    setupProficiencyLevelCoreDetailBox.innerHTML = `<p class="error-message">Failed to load proficiency level core dimensions.</p>`;
  }
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
    '.confirmation-cta button[type="submit"]',
  );
  const errorMessage = document.querySelector(".error-message");

  errorMessage.innerHTML = "";

  const originalText = setupButton.innerHTML;
  setupButton.innerHTML = '<span class="spinner"></span>';
  setupButton.disabled = true;

  try {
    const payload = {
      ...{ name: proficiencyLevelCore },
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

renderTable();
retrieveAllProficiencyLevelCoreService(TOKEN);

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
