const setupCompanyTable = document.querySelector(".module-table");
const setupCompanyModal = document.querySelector(".setup-360-degree-attribute-module-modal");
const setupCompanyForm = document.querySelector(".module-modal-form");
const setupCompanyConfirmationModal = document.querySelector(".setup-360-degree-attribute-confirmation-modal");
const setupCompanyDetailModal = document.querySelector(".module-detail-modal");
const setupCompanyDetailBox = document.querySelector(".module-modal-detail-box");
const markedForDeHighlighting = document.querySelectorAll(".module-title-box, .module-navigation, .module-table, .top-nav, .side-nav");
const headers = ["S/N", "Name", "Company", "Department", "Task Date", "Task Title", "Time Spent", "Manager's Remark", "Status", "View"];
const rows = [""];

setupCompanyTable.innerHTML = rows.length > 0 ? (
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
            <p>When Ofofon logs his setup 360 degree attribute, they will show up here</p>
        </div>
        <div class="cta-box">
            <button onclick="handleOpenSetup360DegreeAttributeModal(event)">
                <span>Add New Setup 360 Degree Attribute</span>
            </button>
        </div>
    </div>`
);

setupCompanyForm.innerHTML = (`
    <form>
        <div class="row form-field-set">
            <label>Email</label>
            <input placeholder="Enter Email"/>
        </div>
        <div class="row form-field-set">
            <label>Name</label>
            <input placeholder="Enter Name"/>
        </div>
        <div class="row form-field-set">
            <label>Job Position</label>
            <input placeholder="Enter Position"/>
        </div>
        <div class="row form-field-set">
            <label>Company</label>
            <input placeholder="Enter Company"/>
        </div>
        <div class="row form-field-set">
            <label>Department</label>
            <input placeholder="Enter Department"/>
        </div>
        <fieldset>
            <h3>Task Detail</h3>
            <p>Provide Task details</p>
            <div class="row form-field-set">
                <label>Task Date</label>
                <input placeholder="Enter Department"/>
            </div>
            <div class="row form-field-set">
                <label>Task Title</label>
                <input placeholder="Enter Task Title"/>
            </div>
            <div class="row form-field-set">
                <label>Activity</label>
                <input placeholder="Enter Activity"/>
            </div>
        </fieldset>
        <div class="row form-cta">
            <button type="reset" onclick="handleCloseSetup360DegreeAttributeModal()">
                <span>Cancel</span>
            </button>
            <button type="button" onclick="handleOpenConfirmationModal(event)">
                <span>Save Changes</span>
            </button>
        </div>
    </form>
`)

setupCompanyDetailBox.innerHTML = (`
        <div>
            // details would go in here
            
        </div>
    `)

function handleOpenDetailModal(e) {
    e.stopPropagation();
    setupCompanyDetailModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseDetailModal() {
    setupCompanyDetailModal.classList.add("close-modal");
    document.body.style.overflow = "auto";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 1;
        item.style.pointerEvents = "auto";
    });
}

function handleOpenSetup360DegreeAttributeModal(e) {
    e.stopPropagation();
    setupCompanyModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseSetup360DegreeAttributeModal() {
    setupCompanyModal.classList.add("close-modal");
    document.body.style.overflow = "auto";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 1;
        item.style.pointerEvents = "auto";
    });
}

function handleOpenConfirmationModal(e) {
    e.stopPropagation();
    handleCloseSetup360DegreeAttributeModal();
    setupCompanyConfirmationModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseConfirmationModal() {
    setupCompanyConfirmationModal.classList.add("close-modal");
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
window.addEventListener("click", (e) => {
    // condition - if the modal is currently rendered && if the click is not within the modal 
    if (!setupCompanyModal.classList.contains("close-modal") && !setupCompanyModal.contains(e.target)) {
        handleCloseSetup360DegreeAttributeModal();
    }
    if (!setupCompanyDetailModal.classList.contains("close-modal") && !setupCompanyDetailModal.contains(e.target)) {
        handleCloseDetailModal();
    }
});
