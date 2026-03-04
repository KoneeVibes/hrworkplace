const setupProficiencyLevelAttributeTable =
  document.querySelector(".module-table");
const setupProficiencyLevelAttributeModal = document.querySelector(
  ".setup-proficiency-level-attribute-module-modal",
);
const setupProficiencyLevelAttributeForm =
  document.querySelector(".module-modal-form");
const setupProficiencyLevelAttributeConfirmationModal = document.querySelector(
  ".setup-proficiency-level-attribute-confirmation-modal",
);
const setupProficiencyLevelAttributeDetailModal = document.querySelector(
  ".module-detail-modal",
);
const setupProficiencyLevelAttributeDetailBox = document.querySelector(
  ".module-modal-detail-box",
);
const markedForDeHighlighting = document.querySelectorAll(
  ".module-title-box, .module-navigation, .module-table, .top-nav, .side-nav",
);
const headers = ["", "S/N", "Name", "Proficiency Level", "Core Dimension"];

let rows = [];
let proficiencyLevels = [];
let proficiencyLevelCoreDimensions = [];

const TOKEN = sessionStorage.getItem("access_token");
const BASE_ENDPOINT = "http://52.150.234.195:7268/api";


const setupProficiencyLevelAttributeService = async (
  TOKEN,
  proficiencyLevelAttributeDetails,
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

const retrieveAllProficiencyLevelAttributeService = async (TOKEN) => {
  try {
    const response = await fetch(
      `${BASE_ENDPOINT}/Proficiencies/level-core-attributes`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );
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

const retrieveProficiencyLevelAttributeByIdService = async (
  TOKEN,
  proficiencyLevelAttributeId,
) => {
  try {
    const response = await fetch(
      `${BASE_ENDPOINT}/Proficiencies/level-core-attributes/${proficiencyLevelAttributeId}`,
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

const updateProficiencyLevelAttributeByIdService = async (
  TOKEN,
  proficiencyLevelAttributeId,
  proficiencyLevelAttributeDetails,
) => {
  try {
    const response = await fetch(
      `${BASE_ENDPOINT}/Proficiencies/level-core-attributes/${proficiencyLevelAttributeId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proficiencyLevelAttributeDetails),
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
    console.error("API patch error:", error);
    throw error;
  }
};

const retrieveAllProficiencyLevelsService = async (TOKEN) => {
  try {
    const response = await fetch(`${BASE_ENDPOINT}/Proficiencies/levels`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    if (!response.ok) {
      throw new Error(res.message);
    }
    proficiencyLevels = res?.data || [];
    return proficiencyLevels;
  } catch (error) {
    console.error("API fetch error (levels):", error);
    throw error;
  }
};

const retrieveAllProficiencyLevelCoreDimensionsService = async (TOKEN) => {
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
      throw new Error(res.message);
    }
    proficiencyLevelCoreDimensions = res?.data || [];
    return proficiencyLevelCoreDimensions;
  } catch (error) {
    console.error("API fetch error (core dimensions):", error);
    throw error;
  }
};

const renderTable = () => {
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
                    <td>${row.proficiencyLevel}</td>
                    <td>${row.proficiencyLevelCoreDimension}</td>
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
            <p>When proficiency level attributes are added, they will show up here</p>
        </div>
        <div class="cta-box">
            <button onclick="handleOpenSetupProficiencyLevelAttributeModal(event)">
                <span>Add New Setup Proficiency Level Attribute</span>
            </button>
        </div>
    </div>`;
};


const renderAddForm = () => {
  setupProficiencyLevelAttributeForm.innerHTML = `
    <form id="setup-proficiency-level-attribute-form">
        <div class="row form-field-set">
            <label>Proficiency Level Core Attribute</label>
            <input name="proficiency-attribute-name" placeholder="Enter Proficiency Level Core Attribute"/>
        </div>
        <div class="row form-field-set">
            <label>Proficiency Level Core Dimension</label>
            <select name="proficiency-core-dimension-id">
                <option value="">Select a dimension</option>
                ${proficiencyLevelCoreDimensions
                  .map(
                    (dimension) =>
                      `<option value="${dimension.id}">${dimension.name}</option>`,
                  )
                  .join("")}
            </select>
        </div>
        <div class="row form-field-set">
            <label>Proficiency Level</label>
            <select name="proficiency-level-id">
                <option value="">Select a level</option>
                ${proficiencyLevels
                  .map(
                    (level) =>
                      `<option value="${level.id}">${level.name}</option>`,
                  )
                  .join("")}
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
};

setupProficiencyLevelAttributeDetailBox.innerHTML = `
    <div>
        // details would go in here
    </div>
`;

async function handleOpenDetailModal(e, proficiencyLevelAttributeId) {
  e.stopPropagation();
  setupProficiencyLevelAttributeDetailModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });

  setupProficiencyLevelAttributeDetailBox.innerHTML = `<p style="text-align: center">Loading...</p>`;

  try {
    const response = await retrieveProficiencyLevelAttributeByIdService(
      TOKEN,
      proficiencyLevelAttributeId,
    );

    setupProficiencyLevelAttributeDetailBox.innerHTML = `
      <form id="detail-proficiency-level-attribute-form">
        <div class="row form-field-set">
          <label>Proficiency Level Core Attribute</label>
          <input name="proficiency-attribute-name" value="${response.name}" placeholder="Enter Proficiency Level Core Attribute"/>
        </div>
        <div class="row form-field-set">
          <label>Proficiency Level Core Dimension</label>
          <select name="proficiency-core-dimension-id">
            <option value="">Select a dimension</option>
            ${proficiencyLevelCoreDimensions
              .map(
                (dimension) =>
                  `<option value="${dimension.id}" ${dimension.id === response.proficiencyLevelCoreDimensionId ? "selected" : ""}>${dimension.name}</option>`,
              )
              .join("")}
          </select>
        </div>
        <div class="row form-field-set">
          <label>Proficiency Level</label>
          <select name="proficiency-level-id">
            <option value="">Select a level</option>
            ${proficiencyLevels
              .map(
                (level) =>
                  `<option value="${level.id}" ${level.id === response.proficiencyLevelId ? "selected" : ""}>${level.name}</option>`,
              )
              .join("")}
          </select>
        </div>
        <div class="row form-cta">
          <button type="reset" onclick="handleCloseDetailModal()">
            <span>Cancel</span>
          </button>
          <button type="button" id="update-proficiency-level-attribute-btn">
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    `;

    document
      .getElementById("update-proficiency-level-attribute-btn")
      .addEventListener("click", async () => {
        const form = document.getElementById(
          "detail-proficiency-level-attribute-form",
        );
        const updatedName = form.elements["proficiency-attribute-name"].value;
        const updatedDimensionId =
          form.elements["proficiency-core-dimension-id"].value;
        const updatedLevelId = form.elements["proficiency-level-id"].value;

        const payload = {
          name: updatedName,
          proficiencyLevelCoreDimensionId: Number(updatedDimensionId),
          proficiencyLevelId: Number(updatedLevelId),
        };

        try {
          const res = await updateProficiencyLevelAttributeByIdService(
            TOKEN,
            proficiencyLevelAttributeId,
            payload,
          );

          if (res.status === "Success") {
            handleCloseDetailModal();
            retrieveAllProficiencyLevelAttributeService(TOKEN);
          }
        } catch (error) {
          console.error("Update failed:", error);
        }
      });
  } catch (error) {
    setupProficiencyLevelAttributeDetailBox.innerHTML = `<p class="error-message">Failed to load proficiency level attribute details.</p>`;
  }
}

function handleCloseDetailModal() {
  setupProficiencyLevelAttributeDetailModal.classList.add("close-modal");
  document.body.style.overflow = "auto";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 1;
    item.style.pointerEvents = "auto";
  });
}

async function handleOpenSetupProficiencyLevelAttributeModal(e) {
  e.stopPropagation();

  try {
    await Promise.all([
      retrieveAllProficiencyLevelsService(TOKEN),
      retrieveAllProficiencyLevelCoreDimensionsService(TOKEN),
    ]);
  } catch (error) {
    console.error("Failed to load select data:", error);
  }

  renderAddForm();

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
    "close-modal",
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

async function handleSetupProficiencyLevelAttribute(e) {
  e.preventDefault();

  const form = document.getElementById("setup-proficiency-level-attribute-form");
  const proficiencyAttributeName =
    form.elements["proficiency-attribute-name"].value;
  const proficiencyCoreDimensionId =
    form.elements["proficiency-core-dimension-id"].value;
  const proficiencyLevelId = form.elements["proficiency-level-id"].value;

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
      name: proficiencyAttributeName,
      proficiencyLevelCoreDimensionId: Number(proficiencyCoreDimensionId),
      proficiencyLevelId: Number(proficiencyLevelId),
    };

    const response = await setupProficiencyLevelAttributeService(
      TOKEN,
      payload,
    );

    if (response.status === "Success") {
      handleCloseConfirmationModal();
      retrieveAllProficiencyLevelAttributeService(TOKEN);
    } else {
      errorMessage.innerHTML = `Setup Proficiency Level Attribute failed. Please check your inputs and try again`;
      console.log("Failed to setup proficiency level attribute");
    }
  } catch (error) {
    errorMessage.innerHTML = `Setup Proficiency Level Attribute failed. Please check your inputs and try again`;
    console.error("Setup Proficiency Level Attribute failed:", error);
  } finally {
    setupButton.innerHTML = originalText;
    setupButton.disabled = false;
  }
}

renderTable();
retrieveAllProficiencyLevelAttributeService(TOKEN);

Promise.all([
  retrieveAllProficiencyLevelsService(TOKEN),
  retrieveAllProficiencyLevelCoreDimensionsService(TOKEN),
]).catch((err) => console.error("Pre-fetch failed:", err));

window.addEventListener("click", (e) => {
  if (
    !setupProficiencyLevelAttributeModal.classList.contains("close-modal") &&
    !setupProficiencyLevelAttributeModal.contains(e.target)
  ) {
    handleCloseSetupProficiencyLevelAttributeModal();
  }
  if (
    !setupProficiencyLevelAttributeDetailModal.classList.contains(
      "close-modal",
    ) &&
    !setupProficiencyLevelAttributeDetailModal.contains(e.target)
  ) {
    handleCloseDetailModal();
  }
});
