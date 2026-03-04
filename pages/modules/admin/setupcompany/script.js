const setupCompanyTable = document.querySelector(".module-table");
const setupCompanyModal = document.querySelector(".setup-company-module-modal");
const setupCompanyForm = document.querySelector(".module-modal-form");
const setupCompanyConfirmationModal = document.querySelector(
  ".setup-company-confirmation-modal",
);
const setupCompanyDetailModal = document.querySelector(".module-detail-modal");
const setupCompanyDetailBox = document.querySelector(
  ".module-modal-detail-box",
);
const markedForDeHighlighting = document.querySelectorAll(
  ".module-title-box, .module-navigation, .module-table, .top-nav, .side-nav",
);
const headers = ["", "S/N", "Name", "CompanyHeadUserName"];
let rows = [];

const TOKEN = sessionStorage.getItem("access_token");
const BASE_ENDPOINT = "http://52.150.234.195:7268/api";

const setupCompanyService = async (TOKEN, companyDetails) => {
  try {
    const response = await fetch(`${BASE_ENDPOINT}/companies`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(companyDetails),
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

const retrieveAllCompanyService = async (TOKEN) => {
  try {
    const response = await fetch(`${BASE_ENDPOINT}/Companies`, {
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

const retrieveCompanyByIdService = async (TOKEN, companyId) => {
  try {
    const response = await fetch(`${BASE_ENDPOINT}/Companies/${companyId}`, {
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
    return res?.data;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};

const updateCompanyByIdService = async (TOKEN, companyId, companyDetails) => {
  try {
    const response = await fetch(`${BASE_ENDPOINT}/Companies/${companyId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(companyDetails),
    });
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
  setupCompanyTable.innerHTML =
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
                    onclick="handleOpenDetailModal(event, ${row?.id})"
                >
                    <td>
                        <input 
                            type="checkbox"
                        />
                    </td>
                    <td>${row?.id}</td>
                    <td>${row.name}</td>
                      <td>${row.companyHeadUsername}</td>
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
            <p>When Ofofon logs his setup company, they will show up here</p>
        </div>
        <div class="cta-box">
            <button onclick="handleOpenSetupCompanyModal(event)">
                <span>Add New Setup Company</span>
            </button>
        </div>
    </div>`;
};

setupCompanyForm.innerHTML = `
    <form
        id="setup-company-form"
    >
        <div class="row form-field-set">
            <label>Company Name</label>
            <input name="companyName" placeholder="Enter Company Name"/>
        </div>
        <div class="row form-field-set">
            <label>Company Head Username</label>
            <input name="companyHeadUsername" placeholder="Enter Company Head Username"/>
        </div>
        <div class="row form-cta">
            <button type="reset" onclick="handleCloseSetupCompanyModal()">
                <span>Cancel</span>
            </button>
            <button type="button" onclick="handleOpenConfirmationModal(event)">
                <span>Save Changes</span>
            </button>
        </div>
    </form>
`;

setupCompanyDetailBox.innerHTML = `
        <div>
            // details would go in here
            
        </div>
    `;

async function handleOpenDetailModal(e, companyId) {
  e.stopPropagation();
  setupCompanyDetailModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });

  setupCompanyDetailBox.innerHTML = `<p style="text-align: center">Loading...</p>`;

  try {
    const company = await retrieveCompanyByIdService(TOKEN, companyId);
    const companyDetails = {
      name: company.name,
      companyHeadUsername: company.companyHeadUsername,
    };

    setupCompanyDetailBox.innerHTML = `
      <form id="detail-company-form">
         <div class="row form-field-set">
            <label>Company Name</label>
            <input name="companyName" value="${company.name}" placeholder="Enter Company Name"/>
        </div>
        <div class="row form-field-set">
            <label>Company Head Username</label>
            <input name="companyHeadUsername" value="${company.companyHeadUsername}" placeholder="Enter Company Head Username"/>
        </div>
        <div class="row form-cta">
            <button type="reset" onclick="handleCloseDetailModal()">
                <span>Cancel</span>
            </button>
            <button type="button" id="update-company-btn">
                <span>Save Changes</span>
            </button>
        </div>
        </div>
      </form>
    `;

    document.getElementById("update-company-btn").addEventListener("click", async () => {
      const form = document.getElementById("detail-company-form");
      const updatedName = form.elements["companyName"].value;
      const updatedCompanyHeadUsername = form.elements["companyHeadUsername"].value;

      const payload = {
        name: updatedName,
        companyHeadUsername: updatedCompanyHeadUsername,
      };

      try {
        const response = await updateCompanyByIdService(
          TOKEN,
          companyId,
          payload,
        );

        if (response.status == "Success") {
          handleCloseDetailModal();
          retrieveAllCompanyService(TOKEN);
        }
      } catch (error) {
        console.error("Update failed:", error);
      }
    });
  } catch (error) {
    setupCompanyDetailBox.innerHTML = `<p class="error-message">Failed to load company details.</p>`;
  }
}

function handleCloseDetailModal() {
  setupCompanyDetailModal.classList.add("close-modal");
  document.body.style.overflow = "auto";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 1;
    item.style.pointerEvents = "auto";
  });
}

function handleOpenSetupCompanyModal(e) {
  e.stopPropagation();
  setupCompanyModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseSetupCompanyModal() {
  setupCompanyModal.classList.add("close-modal");
  document.body.style.overflow = "auto";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 1;
    item.style.pointerEvents = "auto";
  });
}

function handleOpenConfirmationModal(e) {
  e.stopPropagation();
  handleCloseSetupCompanyModal();
  setupCompanyConfirmationModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseConfirmationModal() {
  setupCompanyConfirmationModal.classList.add("close-modal");
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

async function handleSetupCompany(e) {
  e.preventDefault();
  const form = document.getElementById("setup-company-form");
  const companyName = form.elements["companyName"].value;
  const companyHeadUsername = form.elements["companyHeadUsername"].value;

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
      name: companyName,
      ...(companyHeadUsername.trim() && { companyHeadUsername }),
    };
    const response = await setupCompanyService(TOKEN, payload);
    if (response.status === "Success") {
      handleCloseConfirmationModal();
      retrieveAllCompanyService(TOKEN);
    } else {
      errorMessage.innerHTML = `Setup company failed. Please check your credentials and try again`;
      console.log("Failed to setup company");
    }
  } catch (error) {
    errorMessage.innerHTML = `Setup company failed. Please check your credentials and try again`;
    console.error("Setup company failed:", error);
  } finally {
    setupButton.innerHTML = originalText;
    setupButton.disabled = false;
  }
}

renderTable();
retrieveAllCompanyService(TOKEN);

window.addEventListener("click", (e) => {
  // condition - if the modal is currently rendered && if the click is not within the modal
  if (
    !setupCompanyModal.classList.contains("close-modal") &&
    !setupCompanyModal.contains(e.target)
  ) {
    handleCloseSetupCompanyModal();
  }
  if (
    !setupCompanyDetailModal.classList.contains("close-modal") &&
    !setupCompanyDetailModal.contains(e.target)
  ) {
    handleCloseDetailModal();
  }
});
