const setupJobPositionTable = document.querySelector(".module-table");
const setupJobPositionModal = document.querySelector(".setup-jobposition-module-modal");
const setupJobPositionForm = document.querySelector(".module-modal-form");
const setupJobPositionConfirmationModal = document.querySelector(".setup-jobposition-confirmation-modal");
const setupJobPositionDetailModal = document.querySelector(".module-detail-modal");
const setupJobPositionDetailBox = document.querySelector(".module-modal-detail-box");
const markedForDeHighlighting = document.querySelectorAll(".module-title-box, .module-navigation, .module-table, .top-nav, .side-nav");
const headers = ["S/N", "Name", "Company", "Department", "Task Date", "Task Title", "Time Spent", "Manager's Remark", "Status", "View"];
const rows = [""];

const TOKEN = sessionStorage.getItem('access_token');
const BASE_ENDPOINT = 'http://52.150.234.195:7268/api';

const setupJobPositionService = async (TOKEN, jobPositionDetails) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/JobPositions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jobPositionDetails)
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

setupJobPositionTable.innerHTML = rows.length > 0 ? (
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
            <button onclick="handleOpenSetupJobPositionModal(event)">
                <span>Add New Setup Staff Level Step</span>
            </button>
        </div>
    </div>`
);

setupJobPositionForm.innerHTML = (`
       <form id="setup-job-position-form">
        <div class="row form-field-set">
            <label>Job Position Name</label>
            <input name="jobPositionName" placeholder="Enter Job Position Name"/>
        </div>
        <div class="row form-field-set">
            <label>Job Postion Code</label>
            <input name="jobPositionCode" placeholder="Enter Job Position Code"/>
        </div>
         <div class="row form-field-set">
            <label>Job Postion Required Units</label>
            <input name="jobPositionRequiredUnits" placeholder="Enter Job Position Required Units"/>
        </div>
        <div class="row form-cta">
            <button type="reset" onclick="handleCloseSetupJobPositionModal()">
                <span>Cancel</span>
            </button>
            <button type="button" onclick="handleOpenConfirmationModal(event)">
                <span>Save Changes</span>
            </button>
        </div>
    </form>
`)

setupJobPositionDetailBox.innerHTML = (`
        <div>
            // details would go in here
            
        </div>
    `)

function handleOpenDetailModal(e) {
    e.stopPropagation();
    setupJobPositionDetailModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseDetailModal() {
    setupJobPositionDetailModal.classList.add("close-modal");
    document.body.style.overflow = "auto";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 1;
        item.style.pointerEvents = "auto";
    });
}

function handleOpenSetupJobPositionModal(e) {
    e.stopPropagation();
    setupJobPositionModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseSetupJobPositionModal() {
    setupJobPositionModal.classList.add("close-modal");
    document.body.style.overflow = "auto";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 1;
        item.style.pointerEvents = "auto";
    });
}

function handleOpenConfirmationModal(e) {
    e.stopPropagation();
    handleCloseSetupJobPositionModal();
    setupJobPositionConfirmationModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseConfirmationModal() {
    setupJobPositionConfirmationModal.classList.add("close-modal");
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

async function handleSetupJobPosition(e) {
    e.preventDefault();
    const form = document.getElementById("setup-job-position-form");
    const jobPositionName = form.elements["jobPositionName"].value;
    const jobPositionCode = form.elements["jobPositionCode"].value;
    const jobPositionRequiredUnits = form.elements["jobPositionRequiredUnits"].value;


    const setupButton = document.querySelector('.confirmation-cta button[type="submit"]');
    const errorMessage = document.querySelector('.error-message');

    errorMessage.innerHTML = "";

    const originalText = setupButton.innerHTML;
    setupButton.innerHTML = '<span class="spinner"></span>';
    setupButton.disabled = true;

    try {
        const payload = {
            name: jobPositionName,
            code: jobPositionCode, 
            requiredUnits: jobPositionRequiredUnits
            
        };
        console.log(payload);
        const response = await setupJobPositionService(TOKEN, payload);
        if (response.status === "Success") {
            handleCloseConfirmationModal();
        } else {
            errorMessage.innerHTML = (`Setup job position failed. Please check your credentials and try again`);
            console.log("Failed to setup job position");
        }
    } catch (error) {
        errorMessage.innerHTML = (`Setup job position failed. Please check your credentials and try again`);
        console.error('Setup job position failed:', error);
    } finally {
        setupButton.innerHTML = originalText;
        setupButton.disabled = false;
    }
};

window.addEventListener("click", (e) => {
    // condition - if the modal is currently rendered && if the click is not within the modal 
    if (!setupJobPositionModal.classList.contains("close-modal") && !setupJobPositionModal.contains(e.target)) {
        handleCloseSetupJobPositionModal();
    }
    if (!setupJobPositionDetailModal.classList.contains("close-modal") && !setupJobPositionDetailModal.contains(e.target)) {
        handleCloseDetailModal();
    }
});
