const setupCompetencyGroupTable = document.querySelector(".module-table");
const setupCompetencyGroupModal = document.querySelector(".setup-competency-group-module-modal");
const setupCompetencyGroupForm = document.querySelector(".module-modal-form");
const setupCompetencyGroupConfirmationModal = document.querySelector(".setup-competency-group-confirmation-modal");
const setupCompetencyGroupDetailModal = document.querySelector(".module-detail-modal");
const setupCompetencyGroupDetailBox = document.querySelector(".module-modal-detail-box");
const markedForDeHighlighting = document.querySelectorAll(".module-title-box, .module-navigation, .module-table, .top-nav, .side-nav");
const headers = ["S/N", "Name", "Company", "Department", "Task Date", "Task Title", "Time Spent", "Manager's Remark", "Status", "View"];
const rows = [""];

const TOKEN = sessionStorage.getItem('access_token');
const BASE_ENDPOINT = 'http://52.150.234.195:7268/api';

const setupCompetencyGroupService = async (TOKEN, competencyGroupDetails) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/competency-groups`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(competencyGroupDetails)
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

setupCompetencyGroupTable.innerHTML = rows.length > 0 ? (
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
            <p>When Ofofon logs his setup competency group, they will show up here</p>
        </div>
        <div class="cta-box">
            <button onclick="handleOpenSetupCompetencyGroup(event)">
                <span>Add New Setup Competency Group</span>
            </button>
        </div>
    </div>`
);

setupCompetencyGroupForm.innerHTML = (`
    <form
        id="setup-competency-group-form"
    >
        <div class="row form-field-set">
            <label>Name</label>
            <input name="name" placeholder="Enter Name"/>
        </div>
        <div class="row form-cta">
            <button type="reset" onclick="handleCloseSetupCompetencyGroupModal()">
                <span>Cancel</span>
            </button>
            <button type="button" onclick="handleOpenConfirmationModal(event)">
                <span>Save Changes</span>
            </button>
        </div>
    </form>
`)

setupCompetencyGroupDetailBox.innerHTML = (`
        <div>
            // details would go in here
            
        </div>
    `)

function handleOpenDetailModal(e) {
    e.stopPropagation();
    setupCompetencyGroupDetailModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseDetailModal() {
    setupCompetencyGroupDetailModal.classList.add("close-modal");
    document.body.style.overflow = "auto";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 1;
        item.style.pointerEvents = "auto";
    });
}

function handleOpenSetupCompetencyGroup(e) {
    e.stopPropagation();
    setupCompetencyGroupModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseSetupCompetencyGroupModal() {
    setupCompetencyGroupModal.classList.add("close-modal");
    document.body.style.overflow = "auto";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 1;
        item.style.pointerEvents = "auto";
    });
}

function handleOpenConfirmationModal(e) {
    e.stopPropagation();
    handleCloseSetupCompetencyGroupModal();
    setupCompetencyGroupConfirmationModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseConfirmationModal() {
    setupCompetencyGroupConfirmationModal.classList.add("close-modal");
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

async function handleSetupCompetencyGroup(e) {
    e.preventDefault();
    const form = document.getElementById("setup-competency-group-form");
    const competencyGroupName = form.elements["name"].value;

    const setupButton = document.querySelector('.confirmation-cta button[type="submit"]');
    const errorMessage = document.querySelector('.error-message');

    errorMessage.innerHTML = "";

    const originalText = setupButton.innerHTML;
    setupButton.innerHTML = '<span class="spinner"></span>';
    setupButton.disabled = true;

    try {
        const response = await setupCompetencyGroupService(TOKEN, { name: competencyGroupName });
        if (response.status === "Success") {
            handleCloseConfirmationModal();
        } else {
            errorMessage.innerHTML = (`Setup competency group failed. Please check your credentials and try again`);
            console.log("Fail to setup competency group");
        }
    } catch (error) {
        errorMessage.innerHTML = (`Setup competency group failed. Please check your credentials and try again`);
        console.error('Competency group setup failed:', error);
    } finally {
        setupButton.innerHTML = originalText;
        setupButton.disabled = false;
    }
};

window.addEventListener("click", (e) => {
    // condition - if the modal is currently rendered && if the click is not within the modal 
    if (!setupCompetencyGroupModal.classList.contains("close-modal") && !setupCompetencyGroupModal.contains(e.target)) {
        handleCloseSetupCompetencyGroupModal();
    }
    if (!setupCompetencyGroupDetailModal.classList.contains("close-modal") && !setupCompetencyGroupDetailModal.contains(e.target)) {
        handleCloseDetailModal();
    }
});
