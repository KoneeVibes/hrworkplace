const setupBenefitTable = document.querySelector(".module-table");
const setupBenefitModal = document.querySelector(".setup-benefit-module-modal");
const setupBenefitForm = document.querySelector(".module-modal-form");
const setupBenefitConfirmationModal = document.querySelector(
  ".setup-benefit-confirmation-modal"
);
const setupBenefitDetailModal = document.querySelector(".module-detail-modal");
const setupBenefitDetailBox = document.querySelector(
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
            <p>When Ofofon logs his setup staff level step, they will show up here</p>
        </div>
        <div class="cta-box">
            <button onclick="handleOpenSetupBenefitModal(event)">
                <span>Add New Setup Staff Level Step</span>
            </button>
        </div>
    </div>`;

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

function handleOpenDetailModal(e) {
  e.stopPropagation();
  setupBenefitDetailModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
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
    '.confirmation-cta button[type="submit"]'
  );
  const errorMessage = document.querySelector(".error-message");

  errorMessage.innerHTML = "";

  const originalText = setupButton.innerHTML;
  setupButton.innerHTML = '<span class="spinner"></span>';
  setupButton.disabled = true;

  try {
    const payload = {name: benefitName, ...({description: benefitDescription }) };
    const response = await setupBenefitService(TOKEN, payload);
    if (response.status === "Success") {
      handleCloseConfirmationModal();
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
