const setupStaffLevelStepTable = document.querySelector(".module-table");
const setupStaffLevelStepModal = document.querySelector(".setup-stafflevelstep-module-modal");
const setupStaffLevelStepForm = document.querySelector(".module-modal-form");
const setupStaffLevelStepConfirmationModal = document.querySelector(".setup-stafflevelstep-confirmation-modal");
const setupStaffLevelStepDetailModal = document.querySelector(".module-detail-modal");
const setupStaffLevelStepDetailBox = document.querySelector(".module-modal-detail-box");
const markedForDeHighlighting = document.querySelectorAll(".module-title-box, .module-navigation, .module-table, .top-nav, .side-nav");
const headers = ["S/N", "Name", "Company", "Department", "Task Date", "Task Title", "Time Spent", "Manager's Remark", "Status", "View"];
const rows = [""];

const TOKEN = sessionStorage.getItem('access_token');
const BASE_ENDPOINT = 'http://52.150.234.195:7268/api';

const setupStaffLevelStepService = async (TOKEN, stafflevelstepDetails) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/StaffLevelSteps`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(stafflevelstepDetails)
        });
        const res = await response.json();
        if (!response.ok) {
            console.error('Error:', res);
            throw new Error(res.message);
        }
        return res;
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
};

setupStaffLevelStepTable.innerHTML = rows.length > 0 ? (
    `<table>
        <thead>
            <tr>
                ${headers?.map((header, index) => `
                    <th key=${index}>
                        ${header}
                    </th>
                `).join('')}
            </tr>
        </thead>
        <tbody>
        ${rows?.map((row, index) => `
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
            `).join('')}
        </tbody>
    </table>`
) : (
    `<div class="call-to-action">
        <div>
            <img src=${"../../assets/search.svg"} alt="search-icon"/>
        </div>
        <div>
            <h3>Nothing to see here...yet</h3>
            <p>When Ofofon logs his setup staff level step, they will show up here</p>
        </div>
        <div class="cta-box">
            <button onclick="handleOpenSetupStaffLevelStepModal(event)">
                <span>Add New Setup Staff Level Step</span>
            </button>
        </div>
    </div>`
);

setupStaffLevelStepForm.innerHTML = (`
    <form id="setup-staff-level-step-form">
        <div class="row form-field-set">
            <label>Staff Level Step Name</label>
            <input name="staffLevelStepName" placeholder="Enter Staff Level Step Name"/>
        </div>
        <div class="row form-field-set">
            <label>Staff Level Group</label>
            <select name="staffLevelGroupId">
              <option value="">Select Staff Level Group</option>
              <option value="1">Group 1</option>
              <option value="2">Group 2</option>
            </select>
        </div>
        <div class="row form-field-set">
            <label>Staff Level</label>
            <select name="staffLevelId">
              <option value="">Select Staff Level</option>
              <option value="1">Level 1</option>
              <option value="2">Level 2</option>
              <option value="3">Level 3</option>
            </select>
        </div>
        <div class="row form-cta">
            <button type="reset" onclick="handleCloseSetupStaffLevelStepModal()">
                <span>Cancel</span>
            </button>
            <button type="button" onclick="handleOpenConfirmationModal(event)">
                <span>Save Changes</span>
            </button>
        </div>
    </form>
`)

setupStaffLevelStepDetailBox.innerHTML = (`
        <div>
            // details would go in here
            
        </div>
    `)

function handleOpenDetailModal(e) {
    e.stopPropagation();
    setupStaffLevelStepDetailModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseDetailModal() {
    setupStaffLevelStepDetailModal.classList.add("close-modal");
    document.body.style.overflow = "auto";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 1;
        item.style.pointerEvents = "auto";
    });
}

function handleOpenSetupStaffLevelStepModal(e) {
    e.stopPropagation();
    setupStaffLevelStepModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseSetupStaffLevelStepModal() {
    setupStaffLevelStepModal.classList.add("close-modal");
    document.body.style.overflow = "auto";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 1;
        item.style.pointerEvents = "auto";
    });
}

function handleOpenConfirmationModal(e) {
    e.stopPropagation();
    handleCloseSetupStaffLevelStepModal();
    setupStaffLevelStepConfirmationModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseConfirmationModal() {
    setupStaffLevelStepConfirmationModal.classList.add("close-modal");
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
};

function handleCloseSetupManagementModal() {
    setupManagementModal.classList.add("close-modal");
    document.body.style.overflow = "auto";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 1;
        item.style.pointerEvents = "auto";
    });
}; 

async function handleSetupStaffLevelStep(e) {
    e.preventDefault();
    const form = document.getElementById("setup-staff-level-step-form");
    const staffLevelStepName = form.elements["staffLevelStepName"].value;
    const staffLevelGroupId = form.elements["staffLevelGroupId"].value;
    const staffLevelId = form.elements["staffLevelId"].value;

    const setupButton = document.querySelector('.confirmation-cta button[type="submit"]');
    const errorMessage = document.querySelector('.error-message');

    errorMessage.innerHTML = "";

    const originalText = setupButton.innerHTML;
    setupButton.innerHTML = '<span class="spinner"></span>';
    setupButton.disabled = true;

    try {
        const payload = {
            name: staffLevelStepName,
            ...({staffLevelGroupId: Number(staffLevelGroupId) }),
            
            ...({staffLevelId: Number(staffLevelId) }),
        };
        const response = await setupStaffLevelStepService(TOKEN, payload);
        if (response.status === "Success") {
            handleCloseConfirmationModal();
        } else {
            errorMessage.innerHTML = (`Setup staff level step failed. Please check your credentials and try again`);
            console.log("Failed to setup staff level step");
        }
    } catch (error) {
        errorMessage.innerHTML = (`Setup staff level step failed. Please check your credentials and try again`);
        console.error('Setup staff level step failed:', error);
    } finally {
        setupButton.innerHTML = originalText;
        setupButton.disabled = false;
    }
};

window.addEventListener("click", (e) => {
    // condition - if the modal is currently rendered && if the click is not within the modal 
    if (!setupStaffLevelStepModal.classList.contains("close-modal") && !setupStaffLevelStepModal.contains(e.target)) {
        handleCloseSetupStaffLevelStepModal();
    }
    if (!setupStaffLevelStepDetailModal.classList.contains("close-modal") && !setupStaffLevelStepDetailModal.contains(e.target)) {
        handleCloseDetailModal();
    }
});
