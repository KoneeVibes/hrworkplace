const setupDepartmentTable = document.querySelector(".module-table");
const setupDepartmentModal = document.querySelector(".setup-department-module-modal");
const setupDepartmentForm = document.querySelector(".module-modal-form");
const setupDepartmentConfirmationModal = document.querySelector(".setup-department-confirmation-modal");
const setupDepartmentDetailModal = document.querySelector(".module-detail-modal");
const setupDepartmentDetailBox = document.querySelector(".module-modal-detail-box");
const markedForDeHighlighting = document.querySelectorAll(".module-title-box, .module-navigation, .module-table, .top-nav, .side-nav");
const headers = ["S/N", "Name", "Company", "Department", "Task Date", "Task Title", "Time Spent", "Manager's Remark", "Status", "View"];
const rows = [""];

const TOKEN = sessionStorage.getItem('access_token');
const BASE_ENDPOINT = 'http://52.150.234.195:7268/api';

const setupDepartmentService = async (TOKEN, departmentDetails) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/Departments`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(departmentDetails)
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

setupDepartmentTable.innerHTML = rows.length > 0 ? (
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
            <p>When Ofofon logs his setup department, they will show up here</p>
        </div>
        <div class="cta-box">
            <button onclick="handleOpenSetupDepartmentModal(event)">
                <span>Add New Setup Department</span>
            </button>
        </div>
    </div>`
);

setupDepartmentForm.innerHTML = (`
    <form id="setup-department-form">
        <div class="row form-field-set">
            <label>Department Name</label>
            <input name="departmentName" placeholder="Enter Department Name"/>
        </div>
        <div class="row form-field-set">
            <label>Department Head Username</label>
            <input name="departmentHeadUsername" placeholder="Enter Department Head Username"/>
        </div>
        <div class="row form-cta">
            <button type="reset" onclick="handleCloseSetupDepartmentModal()">
                <span>Cancel</span>
            </button>
            <button type="button" onclick="handleOpenConfirmationModal(event)">
                <span>Save Changes</span>
            </button>
        </div>
    </form>
`)

setupDepartmentDetailBox.innerHTML = (`
        <div>
            // details would go in here
            
        </div>
    `)

function handleOpenDetailModal(e) {
    e.stopPropagation();
    setupDepartmentDetailModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseDetailModal() {
    setupDepartmentDetailModal.classList.add("close-modal");
    document.body.style.overflow = "auto";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 1;
        item.style.pointerEvents = "auto";
    });
}

function handleOpenSetupDepartmentModal(e) {
    e.stopPropagation();
    setupDepartmentModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseSetupDepartmentModal() {
    setupDepartmentModal.classList.add("close-modal");
    document.body.style.overflow = "auto";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 1;
        item.style.pointerEvents = "auto";
    });
}

function handleOpenConfirmationModal(e) {
    e.stopPropagation();
    handleCloseSetupDepartmentModal();
    setupDepartmentConfirmationModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseConfirmationModal() {
    setupDepartmentConfirmationModal.classList.add("close-modal");
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

async function handleSetupDepartment(e) {
    e.preventDefault();
    const form = document.getElementById("setup-department-form");
    const departmentName = form.elements["departmentName"].value;
    const departmentHeadName = form.elements["departmentHeadUsername"].value;

    const setupButton = document.querySelector('.confirmation-cta button[type="submit"]');
    const errorMessage = document.querySelector('.error-message');

    errorMessage.innerHTML = "";

    const originalText = setupButton.innerHTML;
    setupButton.innerHTML = '<span class="spinner"></span>';
    setupButton.disabled = true;

    try {
        const payload = {
            name: departmentName,
            departmentHeadUsername: departmentHeadName 
        };
        console.log(payload);
        const response = await setupDepartmentService(TOKEN, payload);
        if (response.status === "Success") {
            handleCloseConfirmationModal();
        } else {
            errorMessage.innerHTML = (`Setup department failed. Please check your credentials and try again`);
            console.log("Failed to setup department");
        }
    } catch (error) {
        errorMessage.innerHTML = (`Setup department failed. Please check your credentials and try again`);
        console.error('Setup department failed:', error);
    } finally {
        setupButton.innerHTML = originalText;
        setupButton.disabled = false;
    }
};

window.addEventListener("click", (e) => {
    // condition - if the modal is currently rendered && if the click is not within the modal 
    if (!setupDepartmentModal.classList.contains("close-modal") && !setupDepartmentModal.contains(e.target)) {
        handleCloseSetupDepartmentModal();
    }
    if (!setupDepartmentDetailModal.classList.contains("close-modal") && !setupDepartmentDetailModal.contains(e.target)) {
        handleCloseDetailModal();
    }
});
