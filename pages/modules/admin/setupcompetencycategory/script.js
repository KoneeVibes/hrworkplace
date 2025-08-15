const setupCompetencyCategoryTable = document.querySelector(".module-table");
const setupCompetencyCategoryModal = document.querySelector(".setup-competency-category-module-modal");
const setupCompetencyCategoryForm = document.querySelector(".module-modal-form");
const setupCompetencyCategoryConfirmationModal = document.querySelector(".setup-competency-category-confirmation-modal");
const setupCompetencyCategoryDetailModal = document.querySelector(".module-detail-modal");
const setupCompetencyCategoryDetailBox = document.querySelector(".module-modal-detail-box");
const markedForDeHighlighting = document.querySelectorAll(".module-title-box, .module-navigation, .module-table, .top-nav, .side-nav");
const headers = ["S/N", "Name", "Company", "Department", "Task Date", "Task Title", "Time Spent", "Manager's Remark", "Status", "View"];
const rows = [""];

const TOKEN = sessionStorage.getItem('access_token');
const BASE_ENDPOINT = 'http://52.150.234.195:7268/api';

const setupCompetencyCategoryService = async (TOKEN, competencyCategoryDetails) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/competency-categories`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(competencyCategoryDetails)
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

setupCompetencyCategoryTable.innerHTML = rows.length > 0 ? (
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
            <p>When Ofofon logs his setup competency category, they will show up here</p>
        </div>
        <div class="cta-box">
            <button onclick="handleOpenSetupCompetencyCategory(event)">
                <span>Add New Setup Competency Category</span>
            </button>
        </div>
    </div>`
);

setupCompetencyCategoryForm.innerHTML = (`
    <form  id="setup-competency-category-form">
        <div class="row form-field-set">
            <label>Competency Category Name</label>
            <input name="competency-category-name" placeholder="Enter Competency Category Name"/>
        </div>
        <div class="row form-field-set">
            <label>Competency Group</label>
            <select name= "competency-group-id">
                <option value="" disabled selected>Select Competency Group</option>
                <option value="1">Technical</option>
                <option value="2">Management</option>
                <option value="3">Leadership</option>
            </select>
        </div>
        <div class="row form-cta">
            <button type="reset" onclick="handleCloseSetupCompetencyCategoryModal()">
                <span>Cancel</span>
            </button>
            <button type="button" onclick="handleOpenConfirmationModal(event)">
                <span>Save Changes</span>
            </button>
        </div>
    </form>
`)

setupCompetencyCategoryDetailBox.innerHTML = (`
        <div>
            // details would go in here
            
        </div>
    `)

function handleOpenDetailModal(e) {
    e.stopPropagation();
    setupCompetencyCategoryDetailModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseDetailModal() {
    setupCompetencyCategoryDetailModal.classList.add("close-modal");
    document.body.style.overflow = "auto";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 1;
        item.style.pointerEvents = "auto";
    });
}

function handleOpenSetupCompetencyCategory(e) {
    e.stopPropagation();
    setupCompetencyCategoryModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseSetupCompetencyCategoryModal() {
    setupCompetencyCategoryModal.classList.add("close-modal");
    document.body.style.overflow = "auto";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 1;
        item.style.pointerEvents = "auto";
    });
}

function handleOpenConfirmationModal(e) {
    e.stopPropagation();
    handleCloseSetupCompetencyCategoryModal();
    setupCompetencyCategoryConfirmationModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseConfirmationModal() {
    setupCompetencyCategoryConfirmationModal.classList.add("close-modal");
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

async function handleSetupCompetencyCategory(e) {
    e.preventDefault();
    const form = document.getElementById("setup-competency-category-form");
    const competencyCategoryName = form.elements["competency-category-name"].value;
    const competencyGroup = form.elements["competency-group-id"].value;

    const setupButton = document.querySelector('.confirmation-cta button[type="submit"]');
    const errorMessage = document.querySelector('.error-message');

    errorMessage.innerHTML = "";

    const originalText = setupButton.innerHTML;
    setupButton.innerHTML = '<span class="spinner"></span>';
    setupButton.disabled = true;

    try {
        const payload = {
            name: competencyCategoryName,
            ...( {id: Number(competencyGroup)  })
        };
        const response = await setupCompetencyCategoryService(TOKEN, payload);
        if (response.status === "Success") {
            handleCloseConfirmationModal();
        } else {
            errorMessage.innerHTML = (`Setup competency category failed. Please check your credentials and try again`);
            console.log("Failed to setup comptency category");
        }
    } catch (error) {
        errorMessage.innerHTML = (`Setup competency category failed. Please check your credentials and try again`);
        console.error('Setup competency category failed:', error);
    } finally {
        setupButton.innerHTML = originalText;
        setupButton.disabled = false;
    }
};

window.addEventListener("click", (e) => {
    // condition - if the modal is currently rendered && if the click is not within the modal 
    if (!setupCompetencyCategoryModal.classList.contains("close-modal") && !setupCompetencyCategoryModal.contains(e.target)) {
        handleCloseSetupCompetencyCategoryModal();
    }
    if (!setupCompetencyCategoryDetailModal.classList.contains("close-modal") && !setupCompetencyCategoryDetailModal.contains(e.target)) {
        handleCloseDetailModal();
    }
});
