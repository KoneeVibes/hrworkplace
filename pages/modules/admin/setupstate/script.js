const setupStateTable = document.querySelector(".module-table");
const setupStateModal = document.querySelector(".setup-state-module-modal");
const setupStateForm = document.querySelector(".module-modal-form");
const setupStateConfirmationModal = document.querySelector(".setup-state-confirmation-modal");
const setupStateDetailModal = document.querySelector(".module-detail-modal");
const setupStateDetailBox = document.querySelector(".module-modal-detail-box");
const markedForDeHighlighting = document.querySelectorAll(".module-title-box, .module-navigation, .module-table, .top-nav, .side-nav");
const headers = ["S/N", "Name", "Company", "Department", "Task Date", "Task Title", "Time Spent", "Manager's Remark", "Status", "View"];
const rows = [""];

const TOKEN = sessionStorage.getItem('access_token');
const BASE_ENDPOINT = 'http://52.150.234.195:7268/api';

const setupStateService = async (TOKEN, stateDetails) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/States`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(stateDetails)
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

setupStateTable.innerHTML = rows.length > 0 ? (
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
            <p>When Ofofon logs his setup state, they will show up here</p>
        </div>
        <div class="cta-box">
            <button onclick="handleOpenSetupState(event)">
                <span>Add New Setup State</span>
            </button>
        </div>
    </div>`
);

setupStateForm.innerHTML = (`
    <form id="setup-state-form">
        <div class="row form-field-set">
            <label>State Name</label>
            <input name="stateName" placeholder="Enter State Name"/>
        </div>
        <div class="row form-field-set">
            <label>Nationality Id</label>
            <select name="nationalityId">
              <option value="">Select Nationality</option>
              <option value="1">Group 1</option>
              <option value="2">Group 2</option>
            </select>
        </div>
        <div class="row form-cta">
            <button type="reset" onclick="handleCloseSetupStateModal()">
                <span>Cancel</span>
            </button>
            <button type="button" onclick="handleOpenConfirmationModal(event)">
                <span>Save Changes</span>
            </button>
        </div>
    </form>
`)

setupStateDetailBox.innerHTML = (`
        <div>
            // details would go in here
            
        </div>
    `)

function handleOpenDetailModal(e) {
    e.stopPropagation();
    setupStateDetailModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseDetailModal() {
    setupStateDetailModal.classList.add("close-modal");
    document.body.style.overflow = "auto";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 1;
        item.style.pointerEvents = "auto";
    });
}

function handleOpenSetupState(e) {
    e.stopPropagation();
    setupStateModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseSetupStateModal() {
    setupStateModal.classList.add("close-modal");
    document.body.style.overflow = "auto";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 1;
        item.style.pointerEvents = "auto";
    });
}

function handleOpenConfirmationModal(e) {
    e.stopPropagation();
    handleCloseSetupStateModal();
    setupStateConfirmationModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseConfirmationModal() {
    setupStateConfirmationModal.classList.add("close-modal");
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

async function handleSetupState(e) {
    e.preventDefault();
    const form = document.getElementById("setup-state-form");
    const stateName = form.elements["stateName"].value;
    const nationalityId = form.elements["nationalityId"].value;

    const setupButton = document.querySelector('.confirmation-cta button[type="submit"]');
    const errorMessage = document.querySelector('.error-message');

    errorMessage.innerHTML = "";

    const originalText = setupButton.innerHTML;
    setupButton.innerHTML = '<span class="spinner"></span>';
    setupButton.disabled = true;

    try {
        const payload = {
            name: stateName,
            ...({nationalityId: Number(nationalityId) }),
        };
        const response = await setupStateService(TOKEN, payload);
        if (response.status === "Success") {
            handleCloseConfirmationModal();
        } else {
            errorMessage.innerHTML = (`Setup state failed. Please check your credentials and try again`);
            console.log("Failed to setup state");
        }
    } catch (error) {
        errorMessage.innerHTML = (`Setup state failed. Please check your credentials and try again`);
        console.error('Setup state failed:', error);
    } finally {
        setupButton.innerHTML = originalText;
        setupButton.disabled = false;
    }
};

window.addEventListener("click", (e) => {
    // condition - if the modal is currently rendered && if the click is not within the modal 
    if (!setupStateModal.classList.contains("close-modal") && !setupStateModal.contains(e.target)) {
        handleCloseSetupStateModal();
    }
    if (!setupStateDetailModal.classList.contains("close-modal") && !setupStateDetailModal.contains(e.target)) {
        handleCloseDetailModal();
    }
});
