const uploadPromotionsTable = document.querySelector(".module-table");
const uploadPromotionsModal = document.querySelector(
  ".upload-promotions-module-modal"
);
const uploadPromotionsForm = document.querySelector(".module-modal-form");
const uploadPromotionsConfirmationModal = document.querySelector(
  ".upload-promotions-confirmation-modal"
);
const uploadPromotionsDetailModal = document.querySelector(
  ".module-detail-modal"
);
const uploadPromotionsDetailBox = document.querySelector(
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

const promotionPositions = [
  { id: 1, position: "Junior Developer" },
  { id: 2, position: "Senior Developer" },
  { id: 3, position: "Team Lead" },
  { id: 4, position: "Project Manager" },
  { id: 5, position: "HR Manager" },
  { id: 6, position: "CTO" },
];

const TOKEN = sessionStorage.getItem("access_token");
const BASE_ENDPOINT = "http://52.150.234.195:7268/api";

const setupPromotionService = async (TOKEN, promotionDetails) => {
  try {
    const response = await fetch(`${BASE_ENDPOINT}/PromotionLetterTemplate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(promotionDetails),
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

uploadPromotionsTable.innerHTML =
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
            <p>When Ofofon logs his upload promotions, they will show up here</p>
        </div>
        <div class="cta-box">
            <button onclick="handleOpenUploadPromotionsModal(event)">
                <span>Add New Upload Promotions</span>
            </button>
        </div>
    </div>`;

uploadPromotionsForm.innerHTML = `
    <form id="setup-promotion-form">
        <div class="row form-field-set">
            <label>Promotion Options</label>
            <select name="promotion-options">
               ${promotionPositions.map(
                 (promotion) => `<option>${promotion.position}</option>`
               )}
            </select>
        </div>
        <div class="row form-field-set">
            <label>Promotion Title</label>
            <input name="promotion-title" placeholder="Enter Promotion Title"/>
        </div>
        <div class="row form-field-set">
            <label>Description</label>
            <textarea name="promotion-body" placeholder="Enter a description"></textarea>
        </div>
       
        <div class="row form-cta">
            <button type="reset" onclick="handleCloseUploadPromotionsModal()">
                <span>Cancel</span>
            </button>
            <button type="button" onclick="handleOpenConfirmationModal(event)">
                <span>Save Changes</span>
            </button>
        </div>
    </form>
`;

uploadPromotionsDetailBox.innerHTML = `
        <div>
            // details would go in here
            
        </div>
    `;

function handleOpenDetailModal(e) {
  e.stopPropagation();
  uploadPromotionsDetailModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseDetailModal() {
  uploadPromotionsDetailModal.classList.add("close-modal");
  document.body.style.overflow = "auto";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 1;
    item.style.pointerEvents = "auto";
  });
}

function handleOpenUploadPromotionsModal(e) {
  e.stopPropagation();
  uploadPromotionsModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseUploadPromotionsModal() {
  uploadPromotionsModal.classList.add("close-modal");
  document.body.style.overflow = "auto";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 1;
    item.style.pointerEvents = "auto";
  });
}

function handleOpenConfirmationModal(e) {
  e.stopPropagation();
  handleCloseUploadPromotionsModal();
  uploadPromotionsConfirmationModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseConfirmationModal() {
  uploadPromotionsConfirmationModal.classList.add("close-modal");
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

async function handleSetupPromotion(e) {
  e.preventDefault();
  const form = document.getElementById("setup-promotion-form");
  const promotionTitle = form.elements["promotion-title"].value;
  const promotionBody = form.elements["promotion-body"].value;
  const promotionOption = form.elements["promotion-options"].value;
  const specificPromotion = promotionPositions.find(
    (pos) => (pos.name = promotionOption)
  );
  const promotionId = specificPromotion.id;

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
      id: promotionId,
      ...{
        title: promotionTitle
      },
      ...{
        body: promotionBody
      },
    };
    const response = await setupPromotionService(TOKEN, payload);
    if (response.status === "Success") {
      handleCloseConfirmationModal();
    } else {
      errorMessage.innerHTML = `Promotion Upload failed. Please check your credentials and try again`;
      console.log("Failed to upload promotion");
    }
  } catch (error) {
    errorMessage.innerHTML = `Promotion Upload failed. Please check your credentials and try again`;
    console.error("Promotion Upload failed:", error);
  } finally {
    setupButton.innerHTML = originalText;
    setupButton.disabled = false;
  }
}

window.addEventListener("click", (e) => {
  // condition - if the modal is currently rendered && if the click is not within the modal
  if (
    !uploadPromotionsModal.classList.contains("close-modal") &&
    !uploadPromotionsModal.contains(e.target)
  ) {
    handleCloseUploadPromotionsModal();
  }
  if (
    !uploadPromotionsDetailModal.classList.contains("close-modal") &&
    !uploadPromotionsDetailModal.contains(e.target)
  ) {
    handleCloseDetailModal();
  }
});
