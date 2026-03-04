const uploadRedeploymentsTable = document.querySelector(".module-table");
const uploadRedeploymentsModal = document.querySelector(
  ".upload-redeployments-module-modal",
);
const uploadRedeploymentsForm = document.querySelector(".module-modal-form");
const uploadRedeploymentsConfirmationModal = document.querySelector(
  ".upload-redeployments-confirmation-modal",
);
const uploadRedeploymentsDetailModal = document.querySelector(
  ".module-detail-modal",
);
const uploadRedeploymentsDetailBox = document.querySelector(
  ".module-modal-detail-box",
);
const markedForDeHighlighting = document.querySelectorAll(
  ".module-title-box, .module-navigation, .module-table, .top-nav, .side-nav",
);
const headers = [
  "",
  "S/N",
  "CompanyName",
  "LastName",
  "FirstName",
  "EmployeeUsername",
  "DepartmentName",
  "MonthsInOldUnit",
  "OldLineManagerUsername",
  "CurrentLineManagerUsername",
  "JobPosition",
  "TransferDate",
  "ResumptionDate",
];
let rows = [];

const TOKEN = sessionStorage.getItem("access_token");
const BASE_ENDPOINT = "http://52.150.234.195:7268/api";

const setupRedeploymentService = async (TOKEN, redeploymentDetails) => {
  try {
    const response = await fetch(`${BASE_ENDPOINT}/Redeployments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(redeploymentDetails),
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

const retrieveAllRedeploymentsService = async (TOKEN) => {
  try {
    const response = await fetch(
      `${BASE_ENDPOINT}/Redeployments
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
    rows = res?.data?.items;
    renderTable();
    return rows;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};

const renderTable = () => {
  uploadRedeploymentsTable.innerHTML =
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
                    onclick="handleOpenDetailModal(event)"
                >
                    <td>
                        <input 
                            type="checkbox"
                        />
                    </td>
                    <td>${row?.id}</td>
                    <td>${rows?.companyName}</td>
                     <td>${rows?.lastName}</td>
                      <td>${rows?.firstName}</td>
                       <td>${rows?.employeeUsername}</td>
                        <td>${rows?.departmentName}</td>
                         <td>${rows?.monthsInOldUnit}</td>
                          <td>${rows?.oldLineManagerUsername}</td>
                           <td>${rows?.currentLineManagerUsername}</td>
                            <td>${rows?.jobPosition}</td>
                             <td>${rows?.transferDate}</td>
                              <td>${rows?.resumptionDate}</td>

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
            <p>When Ofofon logs his upload redeployments, they will show up here</p>
        </div>
        <div class="cta-box">
            <button onclick="handleOpenUploadRedeploymentsModal(event)">
                <span>Add New Upload Redeployments</span>
            </button>
        </div>
    </div>`;
};

uploadRedeploymentsForm.innerHTML = `
    <form id="setup-redeployment-form">
    <div class="row form-field-set">
            <label>Company</label>
            <select name="company-id">
                <option value="">Select Company</option>
                <option value="1">Company A</option>
                <option value="2">Company B</option>
            </select>
        </div>
        <div class="row form-field-set">
            <label>User</label>
            <select name="user-id">
                <option value="">Select User</option>
                <option value="1">John Doe</option>
                <option value="2">Jane Smith</option>
            </select>
        </div>
        <div class="row form-field-set">
            <label>New Department</label>
            <select name="new-department-id">
                <option value="">Select Department</option>
                <option value="1">Engineering</option>
                <option value="2">Marketing</option>
            </select>
        </div>
        <div class="row form-field-set">
            <label>Job Position</label>
            <select name="job-position-id">
                <option value="">Select Position</option>
                <option value="1">Software Engineer</option>
                <option value="2">Product Manager</option>
            </select>
        </div>
        <div class="row form-field-set">
            <label>Transfer Date</label>
            <input name="transfer-date" type="date"/>
        </div>
        <div class="row form-field-set">
            <label>Resumption Date</label>
            <input name="resumption-date" type="date"/>
        </div>
         <div class="row form-field-set">
            <label>New Line Manager Username</label>
            <input name="manager-username" placeholder="Enter new line manager username"/>
        </div>
        <div class="row form-cta">
            <button type="reset" onclick="handleCloseUploadRedeploymentsModal()">
                <span>Cancel</span>
            </button>
            <button type="button" onclick="handleOpenConfirmationModal(event)">
                <span>Save Changes</span>
            </button>
        </div>
    </form>
`;

uploadRedeploymentsDetailBox.innerHTML = `
        <div>
            // details would go in here
            
        </div>
    `;

function handleOpenDetailModal(e) {
  e.stopPropagation();
  uploadRedeploymentsDetailModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseDetailModal() {
  uploadRedeploymentsDetailModal.classList.add("close-modal");
  document.body.style.overflow = "auto";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 1;
    item.style.pointerEvents = "auto";
  });
}

function handleOpenUploadRedeploymentsModal(e) {
  e.stopPropagation();
  uploadRedeploymentsModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseUploadRedeploymentsModal() {
  uploadRedeploymentsModal.classList.add("close-modal");
  document.body.style.overflow = "auto";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 1;
    item.style.pointerEvents = "auto";
  });
}

function handleOpenConfirmationModal(e) {
  e.stopPropagation();
  handleCloseUploadRedeploymentsModal();
  uploadRedeploymentsConfirmationModal.classList.remove("close-modal");
  document.body.style.overflow = "hidden";
  markedForDeHighlighting.forEach((item) => {
    item.style.opacity = 0.1;
    item.style.pointerEvents = "none";
  });
}

function handleCloseConfirmationModal() {
  uploadRedeploymentsConfirmationModal.classList.add("close-modal");
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

async function handleSetupRedeployment(e) {
  e.preventDefault();
  const form = document.getElementById("setup-redeployment-form");
  const transferDate = form.elements["transfer-date"].value;
  const resumptionDate = form.elements["resumption-date"].value;
  const managerUserName = form.elements["manager-username"].value;
  const companyId = form.elements["company-id"].value;
  const userId = form.elements["user-id"].value;
  const newDepartmentId = form.elements["new-department-id"].value;
  const jobPositionId = form.elements["job-position-id"].value;

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
      ...{ companyId: Number(companyId) },
      ...{ userId: Number(userId) },
      ...{ newDepartmentId: Number(newDepartmentId) },
      transferDate: transferDate,
      resumptionDate: resumptionDate,
      ...{ jobPositionId: Number(jobPositionId) },
      ...{
        newLineManagerUsername: managerUserName,
      },
    };

    const response = await setupRedeploymentService(TOKEN, payload);
    if (response.status === "Success") {
      handleCloseConfirmationModal();
      retrieveAllRedeploymentsService(TOKEN);
    } else {
      errorMessage.innerHTML = `Redeployment Upload failed. Please check your credentials and try again`;
      console.log("Failed to upload redeployment");
    }
  } catch (error) {
    errorMessage.innerHTML = `Redeployment Upload failed. Please check your credentials and try again`;
    console.error("redeployment Upload failed:", error);
  } finally {
    setupButton.innerHTML = originalText;
    setupButton.disabled = false;
  }
}

renderTable();
retrieveAllRedeploymentsService(TOKEN);
window.addEventListener("click", (e) => {
  // condition - if the modal is currently rendered && if the click is not within the modal
  if (
    !uploadRedeploymentsModal.classList.contains("close-modal") &&
    !uploadRedeploymentsModal.contains(e.target)
  ) {
    handleCloseUploadRedeploymentsModal();
  }
  if (
    !uploadRedeploymentsDetailModal.classList.contains("close-modal") &&
    !uploadRedeploymentsDetailModal.contains(e.target)
  ) {
    handleCloseDetailModal();
  }
});
