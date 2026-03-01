const setupBenefitTable = document.querySelector(".module-table");
const setupBenefitModal = document.querySelector(".setup-benefit-module-modal");
const setupBenefitForm = document.querySelector(".module-modal-form");
const setupBenefitConfirmationModal = document.querySelector(
  ".setup-benefit-confirmation-modal",
);
const setupBenefitDetailModal = document.querySelector(".module-detail-modal");
const setupBenefitDetailBox = document.querySelector(
  ".module-modal-detail-box",
);
const markedForDeHighlighting = document.querySelectorAll(
  ".module-title-box, .module-navigation, .module-table, .top-nav, .side-nav",
);
const headers = ["", "S/N", "Name", "Description"];
let rows = [];

const TOKEN = sessionStorage.getItem("access_token");
const BASE_ENDPOINT = "http://52.150.234.195:7268/api";

const setupBenefitService = async (TOKEN, benefitDetails) => {
  try {
    const response = await fetch(`${BASE_ENDPOINT}/benefits`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(benefitDetails),
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

const retrieveAllBenefitService = async (TOKEN) => {
  try {
    const response = await fetch(`${BASE_ENDPOINT}/benefits`, {
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
    rows = res?.data;
    renderTable();
    return rows;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};

const retrieveBenefitByIdService = async (TOKEN, benefitId) => {
  try {
    const response = await fetch(`${BASE_ENDPOINT}/benefits/${benefitId}`, {
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

const updateBenefitByIdService = async (TOKEN, benefitId, benefitDetails) => {
  try {
    const response = await fetch(`${BASE_ENDPOINT}/benefits/${benefitId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(benefitDetails),
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
  setupBenefitTable.innerHTML =
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
                     <td>${row.description}</td>
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
            <p>When Ofofon logs his setup staff level step, they will show up here</p>
        </div>
        <div class="cta-box">
            <button onclick="handleOpenSetupBenefitModal(event)">
                <span>Add New Setup Staff Level Step</span>
            </button>
        </div>
    </div>`;
};

setupBenefitForm.innerHTML = `
    <form id="setup-benefit-form">
        <div class="row form-field-set">
            <label>Benefit</label>
            <input name="benefit-name" placeholder="Enter Benefit"/>
        </div>
        <div class="row form-field-set">
            <label>Description</label>
            <textarea name="benefit-description" placeholder="Enter Description"></textarea>
        </div>
        
        <div class="row form-cta">
            <button type="reset" onclick="handleCloseSetupBenefitModal()">
                <span>Cancel</span>
            </button>
            <button type="button" onclick="handleOpenConfirmationModal(event)">
                <span>Save Changes</span>
            </button>
        </div>
    </form>
`;

setupBenefitDetailBox.innerHTML = `
        <div>
            // details would go in here
            
        </div>
    `;

async function handleOpenDetailModal(e, benefitId) {
  e.stopPropagation();
  setupBenefitDetailModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });

  setupBenefitDetailBox.innerHTML = `<p style="text-align: center">Loading...</p>`;

  try {
    const benefit = await retrieveBenefitByIdService(TOKEN, benefitId);

    setupBenefitDetailBox.innerHTML = `
      <form id="detail-benefit-form">
        <div class="row form-field-set">
          <label>Benefit</label>
          <input name="benefit-name" value="${benefit.name}" placeholder="Enter Benefit"/>
        </div>
        <div class="row form-field-set">
          <label>Description</label>
          <textarea name="benefit-description" placeholder="Enter Description">${benefit.description}</textarea>
        </div>
        <div class="row form-cta">
          <button type="reset" onclick="handleCloseDetailModal()">
            <span>Cancel</span>
          </button>
          <button type="button" id="update-benefit-btn">
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    `;

    document.getElementById("update-benefit-btn").addEventListener("click", async () => {
      const form = document.getElementById("detail-benefit-form");
      const updatedName = form.elements["benefit-name"].value;
      const updatedDescription = form.elements["benefit-description"].value;

      const payload = {
        name: updatedName,
        description: updatedDescription,
      };

      try {
        const response = await updateBenefitByIdService(
          TOKEN,
          benefitId,
          payload,
        );

        if (response.status == "Success") {
          handleCloseDetailModal();
          retrieveAllBenefitService(TOKEN);
        }
      } catch (error) {
        console.error("Update failed:", error);
      }
    });
  } catch (error) {
    setupBenefitDetailBox.innerHTML = `<p class="error-message">Failed to load benefit details.</p>`;
  }
}

function handleCloseDetailModal() {
  setupBenefitDetailModal.classList.add("close-modal");
  document.body.style.overflow = "auto";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 1;
    item.style.pointerEvents = "auto";
  });
}

function handleOpenSetupBenefitModal(e) {
  e.stopPropagation();
  setupBenefitModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseSetupBenefitModal() {
  setupBenefitModal.classList.add("close-modal");
  document.body.style.overflow = "auto";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 1;
    item.style.pointerEvents = "auto";
  });
}

function handleOpenConfirmationModal(e) {
  e.stopPropagation();
  handleCloseSetupBenefitModal();
  setupBenefitConfirmationModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseConfirmationModal() {
  setupBenefitConfirmationModal.classList.add("close-modal");
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

async function handleSetupBenefit(e) {
  e.preventDefault();
  const form = document.getElementById("setup-benefit-form");
  const benefitName = form.elements["benefit-name"].value;
  const benefitDescription = form.elements["benefit-description"].value;

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
      name: benefitName,
      ...{ description: benefitDescription },
    };
    const response = await setupBenefitService(TOKEN, payload);
    if (response.status === "Success") {
      handleCloseConfirmationModal();
      retrieveAllBenefitService(TOKEN);
    } else {
      errorMessage.innerHTML = `Setup Benefit failed. Please check your credentials and try again`;
      console.log("Failed to setup benefit");
    }
  } catch (error) {
    errorMessage.innerHTML = `Setup Benefit failed. Please check your credentials and try again`;
    console.error("Setup Benefit failed:", error);
  } finally {
    setupButton.innerHTML = originalText;
    setupButton.disabled = false;
  }
}

renderTable();
retrieveAllBenefitService(TOKEN);

window.addEventListener("click", (e) => {
  // condition - if the modal is currently rendered && if the click is not within the modal
  if (
    !setupBenefitModal.classList.contains("close-modal") &&
    !setupBenefitModal.contains(e.target)
  ) {
    handleCloseSetupBenefitModal();
  }
  if (
    !setupBenefitDetailModal.classList.contains("close-modal") &&
    !setupBenefitDetailModal.contains(e.target)
  ) {
    handleCloseDetailModal();
  }
});
