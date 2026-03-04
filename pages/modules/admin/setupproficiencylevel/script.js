const setupProficiencyLevelTable = document.querySelector(".module-table");
const setupProficiencyLevelModal = document.querySelector(
  ".setup-proficiency-level-module-modal",
);
const setupProficiencyLevelForm = document.querySelector(".module-modal-form");
const setupProficiencyLevelConfirmationModal = document.querySelector(
  ".setup-proficiency-level-confirmation-modal",
);
const setupProficiencyLevelDetailModal = document.querySelector(
  ".module-detail-modal",
);
const setupProficiencyLevelDetailBox = document.querySelector(
  ".module-modal-detail-box",
);
const markedForDeHighlighting = document.querySelectorAll(
  ".module-title-box, .module-navigation, .module-table, .top-nav, .side-nav",
);
const headers = ["", "S/N", "Name"];

let rows = [];

const TOKEN = sessionStorage.getItem("access_token");
const BASE_ENDPOINT = "http://52.150.234.195:7268/api";

const setupProficiencyLevelService = async (TOKEN, proficiencyLevelDetails) => {
  try {
    const response = await fetch(`${BASE_ENDPOINT}/Proficiencies/levels`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proficiencyLevelDetails),
    });
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

const retrieveAllProficiencyLevelService = async (TOKEN) => {
  try {
    const response = await fetch(`${BASE_ENDPOINT}/Proficiencies/levels`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();

   console.log(res);
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

const retrieveProficiencyLevelByIdService = async (
  TOKEN,
  proficiencyLevelId,
) => {
  try {
    const response = await fetch(
      `${BASE_ENDPOINT}/Proficiencies/levels/${proficiencyLevelId}`,
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

const updateProficiencyLevelByIdService = async (
  TOKEN,
  proficiencyLevelId,
  proficiencyLevelDetails,
) => {
  try {
    const response = await fetch(
      `${BASE_ENDPOINT}/Proficiencies/levels/${proficiencyLevelId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proficiencyLevelDetails),
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
  setupProficiencyLevelTable.innerHTML =
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
            <p>When Ofofon logs his setup proficiency level, they will show up here</p>
        </div>
        <div class="cta-box">
            <button onclick="handleOpenSetupProficiencyLevelModal(event)">
                <span>Add New Setup Proficiency Level</span>
            </button>
        </div>
    </div>`;
};

setupProficiencyLevelForm.innerHTML = `
    <form id="setup-proficiency-level-form">
        <div class="row form-field-set">
            <label>Proficiency Level</label>
            <input name="proficiencyLevel" placeholder="Enter Proficiency Level"/>
        </div>
        
        <div class="row form-cta">
            <button type="reset" onclick="handleCloseSetupProficiencyLevelModal()">
                <span>Cancel</span>
            </button>
            <button type="button" onclick="handleOpenConfirmationModal(event)">
                <span>Save Changes</span>
            </button>
        </div>
    </form>
`;

setupProficiencyLevelDetailBox.innerHTML = `
        <div>
            // details would go in here
            
        </div>
    `;

async function handleOpenDetailModal(e, proficiencyLevelId) {
  e.stopPropagation();
  setupProficiencyLevelDetailModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });

  setupProficiencyLevelDetailBox.innerHTML = `<p style="text-align: center">Loading...</p>`;

  try {
    const response = await retrieveProficiencyLevelByIdService(
      TOKEN,
      proficiencyLevelId,
    );

    setupProficiencyLevelDetailBox.innerHTML = `
      <form id="detail-proficiency-level-form">
       <div class="row form-field-set">
            <label>Proficiency Level</label>
            <input name="proficiencyLevel" value="${response.name}" placeholder="Enter Proficiency Level"/>
        </div>
        
        <div class="row form-cta">
            <button type="reset" onclick="handleCloseDetailModal()">
                <span>Cancel</span>
            </button>
            <button type="button" id="update-proficiency-level-btn">
                <span>Save Changes</span>
            </button>
        </div>
      </form>
    `;

    document
      .getElementById("update-proficiency-level-btn")
      .addEventListener("click", async () => {
        const form = document.getElementById("detail-proficiency-level-form");
        const updatedName = form.elements["proficiencyLevel"].value;

        const payload = {
          name: updatedName,
        };

        try {
          const response = await updateProficiencyLevelByIdService(
            TOKEN,
            proficiencyLevelId,
            payload,
          );

          if (response.status == "Success") {
            handleCloseDetailModal();
            retrieveAllProficiencyLevelService(TOKEN);
          }
        } catch (error) {
          console.error("Update failed:", error);
        }
      });
  } catch (error) {
    setupProficiencyLevelDetailBox.innerHTML = `<p class="error-message">Failed to load proficiency level details.</p>`;
  }
}

function handleCloseDetailModal() {
  setupProficiencyLevelDetailModal.classList.add("close-modal");
  document.body.style.overflow = "auto";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 1;
    item.style.pointerEvents = "auto";
  });
}

function handleOpenSetupProficiencyLevelModal(e) {
  e.stopPropagation();
  setupProficiencyLevelModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseSetupProficiencyLevelModal() {
  setupProficiencyLevelModal.classList.add("close-modal");
  document.body.style.overflow = "auto";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 1;
    item.style.pointerEvents = "auto";
  });
}

function handleOpenConfirmationModal(e) {
  e.stopPropagation();
  handleCloseSetupProficiencyLevelModal();
  setupProficiencyLevelConfirmationModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseConfirmationModal() {
  setupProficiencyLevelConfirmationModal.classList.add("close-modal");
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

async function handleSetupProficiencyLevel(e) {
  e.preventDefault();

  const form = document.getElementById("setup-proficiency-level-form");
  const proficiencyLevel = form.elements["proficiencyLevel"].value;

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
      ...{ name: proficiencyLevel },
    };
    const response = await setupProficiencyLevelService(TOKEN, payload);
    if (response.status === "Success") {
      handleCloseConfirmationModal();
      retrieveAllProficiencyLevelService();
    } else {
      errorMessage.innerHTML = `Setup Proficiency Level failed. Please check your credentials and try again`;
      console.log("Failed to setup proficiency level");
    }
  } catch (error) {
    errorMessage.innerHTML = `Setup Proficiency Level failed. Please check your credentials and try again`;
    console.error("Setup Proficiency Level failed:", error);
  } finally {
    setupButton.innerHTML = originalText;
    setupButton.disabled = false;
  }
}

renderTable();
retrieveAllProficiencyLevelService(TOKEN);

window.addEventListener("click", (e) => {
  // condition - if the modal is currently rendered && if the click is not within the modal
  if (
    !setupProficiencyLevelModal.classList.contains("close-modal") &&
    !setupProficiencyLevelModal.contains(e.target)
  ) {
    handleCloseSetupProficiencyLevelModal();
  }
  if (
    !setupProficiencyLevelDetailModal.classList.contains("close-modal") &&
    !setupProficiencyLevelDetailModal.contains(e.target)
  ) {
    handleCloseDetailModal();
  }
});
