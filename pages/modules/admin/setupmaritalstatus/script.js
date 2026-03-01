const setupMaritalStatusTable = document.querySelector(".module-table");
const setupMaritalStatusModal = document.querySelector(
  ".setup-marital-status-module-modal",
);
const setupMaritalStatusForm = document.querySelector(".module-modal-form");
const setupMaritalStatusConfirmationModal = document.querySelector(
  ".setup-marital-status-confirmation-modal",
);
const setupMaritalStatusDetailModal = document.querySelector(
  ".module-detail-modal",
);
const setupMaritalStatusDetailBox = document.querySelector(
  ".module-modal-detail-box",
);
const markedForDeHighlighting = document.querySelectorAll(
  ".module-title-box, .module-navigation, .module-table, .top-nav, .side-nav",
);
const headers = ["", "S/N", "Name"];
let rows = [];

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
    console.error("API post error:", error);
    throw error;
  }
};

const retrieveAllMaritalStatusService = async (TOKEN) => {
  try {
    const response = await fetch(
      `${BASE_ENDPOINT}/MaritalStatuses
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

const retrieveMaritalStatusByIdService = async (TOKEN, maritalStatusId) => {
  try {
    const response = await fetch(
      `${BASE_ENDPOINT}/MaritalStatuses/${maritalStatusId}`,
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

const updateMaritalStatusByIdService = async (
  TOKEN,
  maritalStatusId,
  maritalStatusDetails,
) => {
  try {
    const response = await fetch(
      `${BASE_ENDPOINT}/MaritalStatuses/${maritalStatusId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(maritalStatusDetails),
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
                    <td>${row?.id || index + 1}</td>
                    <td>${row?.name}</td>
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
            <p>When Ofofon logs his setup marital status, they will show up here</p>
        </div>
        <div class="cta-box">
            <button onclick="handleOpenSetupMaritalStatus(event)">
                <span>Add New Setup Marital Status</span>
            </button>
        </div>
    </div>`;
};

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

async function handleOpenDetailModal(e, maritalStatusId) {
  e.stopPropagation();
  setupMaritalStatusDetailModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });

  setupMaritalStatusDetailBox.innerHTML = `<p style="text-align: center">Loading...</p>`;

  try {
    const response = await retrieveMaritalStatusByIdService(
      TOKEN,
      maritalStatusId,
    );

    setupMaritalStatusDetailBox.innerHTML = `
      <form id="detail-marital-status-form">
        <div class="row form-field-set">
            <label>Marital Status</label>
           <select name="marital-status">
  <option>Select Marital Status</option>
  ${["single", "married", "divorced", "widow", "separated"]
    .map(
      (status) =>
        `<option ${status === response.name ? "selected" : ""}>${status}</option>`,
    )
    .join("")}
</select>
        </div>
        
       
        <div class="row form-cta">
            <button type="reset" onclick="handleCloseDetailModal()">
                <span>Cancel</span>
            </button>
            <button type="button" id="update-marital-status-btn">
                <span>Save Changes</span>
            </button>
        </div>
      </form>
    `;

    document
      .getElementById("update-marital-status-btn")
      .addEventListener("click", async () => {
        const form = document.getElementById("detail-marital-status-form");
        const updatedMaritalStatus = form.elements["marital-status"].value;

        const payload = {
          name: updatedMaritalStatus,
        };

        try {
          const response = await updateMaritalStatusByIdService(
            TOKEN,
            maritalStatusId,
            payload,
          );

          if (response.status == "Success") {
            handleCloseDetailModal();
            retrieveAllMaritalStatusService(TOKEN);
          }
        } catch (error) {
          console.error("Update failed:", error);
        }
      });
  } catch (error) {
    setupMaritalStatusDetailBox.innerHTML = `<p class="error-message">Failed to load marital status details.</p>`;
  }
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
    '.confirmation-cta button[type="submit"]',
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
      retrieveAllMaritalStatusService(TOKEN);
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

renderTable();
retrieveAllMaritalStatusService(TOKEN);
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
