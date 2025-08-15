const setupStaffLevelGroupTable = document.querySelector(".module-table");
const setupStaffLevelGroupModal = document.querySelector(".setup-stafflevelgroup-module-modal");
const setupStaffLevelGroupForm = document.querySelector(".module-modal-form");
const setupStaffLevelGroupConfirmationModal = document.querySelector(".setup-stafflevelgroup-confirmation-modal");
const setupStaffLevelGroupDetailModal = document.querySelector(".module-detail-modal");
const setupStaffLevelGroupDetailBox = document.querySelector(".module-modal-detail-box");
const markedForDeHighlighting = document.querySelectorAll(".module-title-box, .module-navigation, .module-table, .top-nav, .side-nav");
const headers = ["S/N", "Name", "Company", "Department", "Task Date", "Task Title", "Time Spent", "Manager's Remark", "Status", "View"];
const rows = [""];

const TOKEN = sessionStorage.getItem('access_token');
const BASE_ENDPOINT = 'http://52.150.234.195:7268/api';

const setupStaffLevelGroupService = async (TOKEN, stafflevelgroupDetails) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/staff-level-groups`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(stafflevelgroupDetails)
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

setupStaffLevelGroupTable.innerHTML = rows.length > 0 ? (
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
            <p>When Ofofon logs his setup staff level group, they will show up here</p>
        </div>
        <div class="cta-box">
            <button onclick="handleOpenSetupStaffLevelGroupModal(event)">
                <span>Add New Setup Staff Level Group</span>
            </button>
        </div>
    </div>`
);

setupStaffLevelGroupForm.innerHTML = (`
    <form id="setup-staff-level-group-form">
        <div class="row form-field-set">
            <label>Staff Level Group Name</label>
            <input name="name" placeholder="Enter Name"/>
        </div>
        <div class="row form-cta">
            <button type="reset" onclick="handleCloseSetupStaffLevelGroupModal()">
                <span>Cancel</span>
            </button>
            <button type="button" onclick="handleOpenConfirmationModal(event)">
                <span>Save Changes</span>
            </button>
        </div>
    </form>
`)

setupStaffLevelGroupDetailBox.innerHTML = (`
        <div>
            // details would go in here
            
        </div>
    `)

function handleOpenDetailModal(e) {
    e.stopPropagation();
    setupStaffLevelGroupDetailModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseDetailModal() {
    setupStaffLevelGroupDetailModal.classList.add("close-modal");
    document.body.style.overflow = "auto";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 1;
        item.style.pointerEvents = "auto";
    });
}

function handleOpenSetupStaffLevelGroupModal(e) {
    e.stopPropagation();
    setupStaffLevelGroupModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseSetupStaffLevelGroupModal() {
    setupStaffLevelGroupModal.classList.add("close-modal");
    document.body.style.overflow = "auto";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 1;
        item.style.pointerEvents = "auto";
    });
}

function handleOpenConfirmationModal(e) {
    e.stopPropagation();
    handleCloseSetupStaffLevelGroupModal();
    setupStaffLevelGroupConfirmationModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseConfirmationModal() {
    setupStaffLevelGroupConfirmationModal.classList.add("close-modal");
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

async function handleSetupStaffLevelGroup(e) {
    e.preventDefault();
    const form = document.getElementById("setup-staff-level-group-form");
    const stafflevelgroupName = form.elements["name"].value;

    const setupButton = document.querySelector('.confirmation-cta button[type="submit"]');
    const errorMessage = document.querySelector('.error-message');

    errorMessage.innerHTML = "";

    const originalText = setupButton.innerHTML;
    setupButton.innerHTML = '<span class="spinner"></span>';
    setupButton.disabled = true;

    try {
        const response = await setupStaffLevelGroupService(TOKEN, {name:stafflevelgroupName});
        if (response.status === "Success") {
            handleCloseConfirmationModal();
        } else {
            errorMessage.innerHTML = (`Setup staff level group failed. Please check your credentials and try again`);
            console.log("Failed to setup staff level group");
        }
    } catch (error) {
        errorMessage.innerHTML = (`Setup staff level group failed. Please check your credentials and try again`);
        console.error('Setup staff level group failed:', error);
    } finally {
        setupButton.innerHTML = originalText;
        setupButton.disabled = false;
    }
};

window.addEventListener("click", (e) => {
    // condition - if the modal is currently rendered && if the click is not within the modal 
    if (!setupStaffLevelGroupModal.classList.contains("close-modal") && !setupStaffLevelGroupModal.contains(e.target)) {
        handleCloseSetupStaffLevelGroupModal();
    }
    if (!setupStaffLevelGroupDetailModal.classList.contains("close-modal") && !setupStaffLevelGroupDetailModal.contains(e.target)) {
        handleCloseDetailModal();
    }
});
