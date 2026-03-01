const setupLocalGovernmentTable = document.querySelector(".module-table");
const setupLocalGovernmentModal = document.querySelector(
  ".setup-local-government-module-modal",
);
const setupLocalGovernmentForm = document.querySelector(".module-modal-form");
const setupLocalGovernmentConfirmationModal = document.querySelector(
  ".setup-local-government-confirmation-modal",
);
const setupLocalGovernmentDetailModal = document.querySelector(
  ".module-detail-modal",
);
const setupLocalGovernmentDetailBox = document.querySelector(
  ".module-modal-detail-box",
);
const markedForDeHighlighting = document.querySelectorAll(
  ".module-title-box, .module-navigation, .module-table, .top-nav, .side-nav",
);
const headers = ["", "S/N", "Name"];
let rows = [];
const statesOfNigeria = [
  { id: 1, name: "Abia" },
  { id: 2, name: "Adamawa" },
  { id: 3, name: "Akwa Ibom" },
  { id: 4, name: "Anambra" },
  { id: 5, name: "Bauchi" },
  { id: 6, name: "Bayelsa" },
  { id: 7, name: "Benue" },
  { id: 8, name: "Borno" },
  { id: 9, name: "Cross River" },
  { id: 10, name: "Delta" },
  { id: 11, name: "Ebonyi" },
  { id: 12, name: "Edo" },
  { id: 13, name: "Ekiti" },
  { id: 14, name: "Enugu" },
  { id: 15, name: "Gombe" },
  { id: 16, name: "Imo" },
  { id: 17, name: "Jigawa" },
  { id: 18, name: "Kaduna" },
  { id: 19, name: "Kano" },
  { id: 20, name: "Katsina" },
  { id: 21, name: "Kebbi" },
  { id: 22, name: "Kogi" },
  { id: 23, name: "Kwara" },
  { id: 24, name: "Lagos" },
  { id: 25, name: "Nasarawa" },
  { id: 26, name: "Niger" },
  { id: 27, name: "Ogun" },
  { id: 28, name: "Ondo" },
  { id: 29, name: "Osun" },
  { id: 30, name: "Oyo" },
  { id: 31, name: "Plateau" },
  { id: 32, name: "Rivers" },
  { id: 33, name: "Sokoto" },
  { id: 34, name: "Taraba" },
  { id: 35, name: "Yobe" },
  { id: 36, name: "Zamfara" },
  { id: 37, name: "Federal Capital Territory" },
];

const TOKEN = sessionStorage.getItem("access_token");
const BASE_ENDPOINT = "http://52.150.234.195:7268/api";

const setupLocalGovernmentService = async (TOKEN, localGovernmentDetails) => {
  try {
    const response = await fetch(`${BASE_ENDPOINT}/LocalGovernments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(localGovernmentDetails),
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

const retrieveAllLocalGovernmentService = async (TOKEN) => {
  try {
    const response = await fetch(`${BASE_ENDPOINT}/LocalGovernments`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    if (!response.ok) {
      console.error("Error:", res);
      throw new Error(res.message);
    }
    console.log(res?.data?.items);
    rows = res?.data?.items;
    renderTable();
    return rows;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};

const retrieveLocalGovernmentByIdService = async (TOKEN, localGovernmentId) => {
  try {
    const response = await fetch(
      `${BASE_ENDPOINT}/LocalGovernments/${localGovernmentId}`,
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

const updateLocalGovernmentByIdService = async (
  TOKEN,
  localGovernmentId,
  localGovernmentDetails,
) => {
  try {
    const response = await fetch(
      `${BASE_ENDPOINT}/LocalGovernments/${localGovernmentId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(localGovernmentDetails),
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
  setupLocalGovernmentTable.innerHTML =
    rows && rows.length > 0
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
                        <input type="checkbox"/>
                    </td>
                    <td>${row?.id}</td>
                    <td>${row?.name.charAt(0).toUpperCase() + row?.name.slice(1)}</td>
                </tr>
            `,
            )
            .join("")}
          </tbody>
      </table>`
      : `<div class="call-to-action">
          <div>
              <img src=${"/../../assets/search.svg"} alt="search-icon"/>
          </div>
          <div>
              <h3>Nothing to see here...yet</h3>
              <p>When Ofofon logs his setup local government, they will show up here</p>
          </div>
          <div class="cta-box">
              <button onclick="handleOpenSetupLocalGovernment(event)">
                  <span>Add New Setup Local Government</span>
              </button>
          </div>
      </div>`;
};

setupLocalGovernmentForm.innerHTML = `
    <form id="setup-local-government-form">
        <div class="row form-field-set">
            <label>Local Government Area</label>
            <input name="local-government-name" placeholder="Enter Local Government Area"/>
        </div>
        <div class="row form-field-set">
            <label>State</label>
            <select name="state-name">
              <option>Select State</option>
              ${statesOfNigeria
                .map((state) => `<option value="${state.id}">${state.name}</option>`)
                .join("")}
            </select>
        </div>
        <div class="row form-cta">
            <button type="reset" onclick="handleCloseSetupLocalGovernmentModal()">
                <span>Cancel</span>
            </button>
            <button type="button" onclick="handleOpenConfirmationModal(event)">
                <span>Save Changes</span>
            </button>
        </div>
    </form>
`;

setupLocalGovernmentDetailBox.innerHTML = `
        <div>
            // details would go in here
            
        </div>
    `;

async function handleOpenDetailModal(e, localGovernmentId) {
  e.stopPropagation();
  setupLocalGovernmentDetailModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });

  setupLocalGovernmentDetailBox.innerHTML = `<p style="text-align: center">Loading...</p>`;

  try {
    const response = await retrieveLocalGovernmentByIdService(
      TOKEN,
      localGovernmentId,
    );

    setupLocalGovernmentDetailBox.innerHTML = `
      <form id="detail-local-government-form">
       <div class="row form-field-set">
            <label>Local Government Area</label>
            <input name="local-government-name" value="${response.name}"  placeholder="Enter Local Government Area"/>
        </div>
        <div class="row form-field-set">
            <label>State</label>
            <select name="state-name">
              <option>Select State</option>
              ${statesOfNigeria
                .map((state) => `<option value="${state.id}" ${state.id === response.stateId ? "selected": ""}>${state.name}</option>`)
                .join("")}
            </select>
        </div>
        <div class="row form-cta">
            <button type="reset" onclick="handleCloseDetailModal()">
                <span>Cancel</span>
            </button>
            <button type="button" id="update-local-government-btn">
                <span>Save Changes</span>
            </button>
        </div>
      </form>
    `;

    document
      .getElementById("update-local-government-btn")
      .addEventListener("click", async () => {
        const form = document.getElementById("detail-local-government-form");
        const updatedLocalGovernmentName = form.elements["local-government-name"].value;
        const updatedStateId = form.elements["state-name"].value;

        const payload = {
          name: updatedLocalGovernmentName,
          stateId: Number(updatedStateId),
        };

        try {
          const response = await updateLocalGovernmentByIdService(
            TOKEN,
            localGovernmentId,
            payload,
          );

          if (response.status == "Success") {
            handleCloseDetailModal();
            retrieveAllLocalGovernmentService(TOKEN);
          }
        } catch (error) {
          console.error("Update failed:", error);
        }
      });
  } catch (error) {
    setupLocalGovernmentDetailBox.innerHTML = `<p class="error-message">Failed to load local government details.</p>`;
  }
}

function handleCloseDetailModal() {
  setupLocalGovernmentDetailModal.classList.add("close-modal");
  document.body.style.overflow = "auto";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 1;
    item.style.pointerEvents = "auto";
  });
}

function handleOpenSetupLocalGovernment(e) {
  e.stopPropagation();
  setupLocalGovernmentModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseSetupLocalGovernmentModal() {
  setupLocalGovernmentModal.classList.add("close-modal");
  document.body.style.overflow = "auto";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 1;
    item.style.pointerEvents = "auto";
  });
}

function handleOpenConfirmationModal(e) {
  e.stopPropagation();
  handleCloseSetupLocalGovernmentModal();
  setupLocalGovernmentConfirmationModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseConfirmationModal() {
  setupLocalGovernmentConfirmationModal.classList.add("close-modal");
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

async function handleSetupLocalGovernment(e) {
  e.preventDefault();
  const form = document.getElementById("setup-local-government-form");
  const localGovernmentName = form.elements["local-government-name"].value;
  const stateName = form.elements["state-name"].value;
  const specificState = statesOfNigeria.find(
    (state) => state.name === stateName,
  );
  const stateId = specificState.id;

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
      name: localGovernmentName,
      ...(stateId && { stateId }),
    };
    const response = await setupLocalGovernmentService(TOKEN, payload);
    if (response.status === "Success") {
      handleCloseConfirmationModal();
    } else {
      errorMessage.innerHTML = `Setup local government failed. Please check your credentials and try again`;
      console.error("Failed to setup local government");
    }
  } catch (error) {
    errorMessage.innerHTML = `Setup local government failed. Please check your credentials and try again`;
    console.error("Setup local government failed:", error);
  } finally {
    setupButton.innerHTML = originalText;
    setupButton.disabled = false;
  }
}

renderTable();
retrieveAllLocalGovernmentService(TOKEN);

window.addEventListener("click", (e) => {
  // condition - if the modal is currently rendered && if the click is not within the modal
  if (
    !setupLocalGovernmentModal.classList.contains("close-modal") &&
    !setupLocalGovernmentModal.contains(e.target)
  ) {
    handleCloseSetupLocalGovernmentModal();
  }
  if (
    !setupLocalGovernmentDetailModal.classList.contains("close-modal") &&
    !setupLocalGovernmentDetailModal.contains(e.target)
  ) {
    handleCloseDetailModal();
  }
});
