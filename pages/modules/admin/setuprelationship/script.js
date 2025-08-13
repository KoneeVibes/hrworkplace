const setupRelationshipTable = document.querySelector(".module-table");
const setupRelationshipModal = document.querySelector(".setup-relationship-module-modal");
const setupRelationshipForm = document.querySelector(".module-modal-form");
const setupRelationshipConfirmationModal = document.querySelector(".setup-relationship-confirmation-modal");
const setupRelationshipDetailModal = document.querySelector(".module-detail-modal");
const setupRelationshipDetailBox = document.querySelector(".module-modal-detail-box");
const markedForDeHighlighting = document.querySelectorAll(".module-title-box, .module-navigation, .module-table, .top-nav, .side-nav");
const headers = ["S/N", "Name", "Company", "Department", "Task Date", "Task Title", "Time Spent", "Manager's Remark", "Status", "View"];
const rows = [""];

const TOKEN = sessionStorage.getItem('access_token');
const BASE_ENDPOINT = 'http://52.150.234.195:7268/api';

const setupRelationshipService = async (TOKEN, relationshipDetails) => {
    try {
        const response = await fetch(`${BASE_ENDPOINT}/Relationships`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(relationshipDetails)
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
setupRelationshipTable.innerHTML = rows.length > 0 ? (
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
            <p>When Ofofon logs his setup relationship, they will show up here</p>
        </div>
        <div class="cta-box">
            <button onclick="handleOpenSetupRelationship(event)">
                <span>Add New Setup Relationship</span>
            </button>
        </div>
    </div>`
);

setupRelationshipForm.innerHTML = (`
    <form id="setup-relationship-form">
        <div class="row form-field-set">
            <label>Relationship Name</label>
            <input placeholder="Enter Name"/>
        </div>
        <div class="row form-cta">
            <button type="reset" onclick="handleCloseSetupRelationshipModal()">
                <span>Cancel</span>
            </button>
            <button type="button" onclick="handleOpenConfirmationModal(event)">
                <span>Save Changes</span>
            </button>
        </div>
    </form>
`)

setupRelationshipDetailBox.innerHTML = (`
        <div>
            // details would go in here
            
        </div>
    `)

function handleOpenDetailModal(e) {
    e.stopPropagation();
    setupRelationshipDetailModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseDetailModal() {
    setupRelationshipDetailModal.classList.add("close-modal");
    document.body.style.overflow = "auto";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 1;
        item.style.pointerEvents = "auto";
    });
}

function handleOpenSetupRelationship(e) {
    e.stopPropagation();
    setupRelationshipModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseSetupRelationshipModal() {
    setupRelationshipModal.classList.add("close-modal");
    document.body.style.overflow = "auto";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 1;
        item.style.pointerEvents = "auto";
    });
}

function handleOpenConfirmationModal(e) {
    e.stopPropagation();
    handleCloseSetupRelationshipModal();
    setupRelationshipConfirmationModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseConfirmationModal() {
    setupRelationshipConfirmationModal.classList.add("close-modal");
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

async function handleSetupRelationship(e) {
    e.preventDefault();
    const form = document.getElementById("setup-relationship-form");
    const companyName = form.elements["relationshipName"].value;
    const companyHeadUsername = form.elements["relationshipHeadUsername"].value;

    try {
        const response = await setupRelationshipService(TOKEN, { name: relationshipName});
        if (response.status === "Success") {
            //     // setIsLoading(false);
            //     // cookies.set("TOKEN", response.token, {
            //     //     path: "/",
            //     // });
            //     // setIsAuthenticated(true);
            // window.location.href = '../dashboard/index.html';
            console.log("I have been submitted")
        } else {
            //     // setIsLoading(false);
            //     // setError('Authentication failed. Please check your credentials and try again.');
            console.log("Fail to login");
        }
    } catch (error) {
        // setIsLoading(false);
        // setError(`Login failed. ${error.message}`);
        console.error('Login failed:', error);
    }
};

window.addEventListener("click", (e) => {
    // condition - if the modal is currently rendered && if the click is not within the modal 
    if (!setupRelationshipModal.classList.contains("close-modal") && !setupRelationshipModal.contains(e.target)) {
        handleCloseSetupRelationshipModal();
    }
    if (!setupRelationshipDetailModal.classList.contains("close-modal") && !setupRelationshipDetailModal.contains(e.target)) {
        handleCloseDetailModal();
    }
});
