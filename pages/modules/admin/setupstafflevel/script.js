const setupStaffLevelTable = document.querySelector(".module-table");
const setupStaffLevelModal = document.querySelector(".setup-stafflevel-module-modal");
const setupStaffLevelForm = document.querySelector(".module-modal-form");
const setupStaffLevelConfirmationModal = document.querySelector(".setup-stafflevel-confirmation-modal");
const setupStaffLevelDetailModal = document.querySelector(".module-detail-modal");
const setupStaffLevelDetailBox = document.querySelector(".module-modal-detail-box");
const markedForDeHighlighting = document.querySelectorAll(".module-title-box, .module-navigation, .module-table, .top-nav, .side-nav");
const headers = ["S/N", "Name", "Company", "Department", "Task Date", "Task Title", "Time Spent", "Manager's Remark", "Status", "View"];
const rows = [""];

const TOKEN = sessionStorage.getItem('access_token');
const BASE_ENDPOINT = 'http://52.150.234.195:7268/api';

const setupStaffLevelService = async (TOKEN, stafflevelDetails) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/StaffLevels`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(stafflevelDetails)
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

setupStaffLevelTable.innerHTML = rows.length > 0 ? (
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
            <p>When Ofofon logs his setup staff level, they will show up here</p>
        </div>
        <div class="cta-box">
            <button onclick="handleOpenSetupStaffLevelModal(event)">
                <span>Add New Setup Staff Level</span>
            </button>
        </div>
    </div>`
);

setupStaffLevelForm.innerHTML = (`
    <form id="setup-staff-level-form">
        <div class="row form-field-set">
            <label>Staff Level Name</label>
            <input name="name" placeholder="Enter Name"/>
        </div>
        <div class="row form-field-set">
            <label>Staff Level Group Id</label>
            <input name="staffLevelGroupId" placeholder="Enter Staff Level Group Id"/>
        </div>
        <div class="row form-cta">
            <button type="reset" onclick="handleCloseSetupStaffLevelModal()">
                <span>Cancel</span>
            </button>
            <button type="button" onclick="handleOpenConfirmationModal(event)">
                <span>Save Changes</span>
            </button>
        </div>
    </form>
`)

setupStaffLevelDetailBox.innerHTML = (`
        <div>
            // details would go in here
            
        </div>
    `)

function handleOpenDetailModal(e) {
    e.stopPropagation();
    setupStaffLevelDetailModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseDetailModal() {
    setupStaffLevelDetailModal.classList.add("close-modal");
    document.body.style.overflow = "auto";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 1;
        item.style.pointerEvents = "auto";
    });
}

function handleOpenSetupStaffLevelModal(e) {
    e.stopPropagation();
    setupStaffLevelModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseSetupStaffLevelModal() {
    setupStaffLevelModal.classList.add("close-modal");
    document.body.style.overflow = "auto";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 1;
        item.style.pointerEvents = "auto";
    });
}

function handleOpenConfirmationModal(e) {
    e.stopPropagation();
    handleCloseSetupStaffLevelModal();
    setupStaffLevelConfirmationModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseConfirmationModal() {
    setupStaffLevelConfirmationModal.classList.add("close-modal");
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

async function handleSetupStaffLevel(e) {
    e.preventDefault();
    const form = document.getElementById("setup-setup-level-form");
    const stafflevelName = form.elements["name"].value;
    const staffLevelGroupId = form.elements["staffLevelGroupId"].value;

    const setupButton = document.querySelector('.confirmation-cta button[type="submit"]');
    const errorMessage = document.querySelector('.error-message');

    errorMessage.innerHTML = "";

    const originalText = setupButton.innerHTML;
    setupButton.innerHTML = '<span class="spinner"></span>';
    setupButton.disabled = true;

    try {
        const payload = {
            name: stafflevelName,
            ...(staffLevelGroupId.trim() && { staffLevelGroupId })
        };
        const response = await setupStaffLevelService(TOKEN, payload);
        if (response.status === "Success") {
            handleCloseConfirmationModal();
        } else {
            errorMessage.innerHTML = (`Setup staff level failed. Please check your credentials and try again`);
            console.log("Failed to setup staff level");
        }
    } catch (error) {
        errorMessage.innerHTML = (`Setup staff level failed. Please check your credentials and try again`);
        console.error('Setup staff level failed:', error);
    } finally {
        setupButton.innerHTML = originalText;
        setupButton.disabled = false;
    }
};

window.addEventListener("click", (e) => {
    // condition - if the modal is currently rendered && if the click is not within the modal 
    if (!setupStaffLevelModal.classList.contains("close-modal") && !setupStaffLevelModal.contains(e.target)) {
        handleCloseSetupStaffLevelModal();
    }
    if (!setupStaffLevelDetailModal.classList.contains("close-modal") && !setupStaffLevelDetailModal.contains(e.target)) {
        handleCloseDetailModal();
    }
});
