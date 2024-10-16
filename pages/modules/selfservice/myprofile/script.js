const profileBody = document.querySelector(".module-body");
const profileModal = document.querySelector(".profile-module-modal");
const profileForm = document.querySelector(".module-modal-form");
const profileConfirmationModal = document.querySelector(".profile-confirmation-modal");
const profileDetailModal = document.querySelector(".module-detail-modal");
const profileDetailBox = document.querySelector(".module-modal-detail-box");
const profileCategoriesBox = document.querySelector(".profile-categories");
const profileCategories = ["Overview", "Education", "Professional", "Experience", "Reference", "Next of KIN", "Documents"];
const markedForDeHighlighting = document.querySelectorAll(".module-title-box, .module-navigation, .module-table, .top-nav, .side-nav");
const rows = [];
let activeProfileCategory = "Overview";

profileForm.innerHTML = (`
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
            <button type="reset" onclick="handleCloseProfileModal()">
                <span>Cancel</span>
            </button>
            <button type="button" onclick="handleOpenConfirmationModal(event)">
                <span>Save Changes</span>
            </button>
        </div>
    </form>
`)

profileDetailBox.innerHTML = (`
        <div>
            // details would go in here
            
        </div>
    `)

profileCategoriesBox.innerHTML = profileCategories.map((category, index) => {
    return (`
        <button
            key="${index}"
            onclick="handleProfileCategorySelection(event, '${category}')"
        >
            <span>
                ${category}
            </span>
        </button>
    `);
}).join('');

function handleProfileCategorySelection(e, category) {
    e.preventDefault();
    activeProfileCategory = category;
    profileBody.innerHTML = rows ? (
        `<div>
            <p>${activeProfileCategory}</p>
        </div>`
    ) : (
        `<div class="call-to-action">
            <div>
                <img src=${"../../../../assets/search.svg"} alt="search-icon"/>
            </div>
            <div>
                <h3>Nothing to see here...yet</h3>
                <p>When Ofofon logs his profile, they will show up here</p>
            </div>
            <div class="cta-box">
                <button onclick="handleOpenProfileModal(event)">
                    <span>Add New Profile</span>
                </button>
            </div>
        </div>`
    );
}

function handleOpenDetailModal(e) {
    e.stopPropagation();
    profileDetailModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseDetailModal() {
    profileDetailModal.classList.add("close-modal");
    document.body.style.overflow = "auto";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 1;
        item.style.pointerEvents = "auto";
    });
}

function handleOpenProfileModal(e) {
    e.stopPropagation();
    profileModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseProfileModal() {
    profileModal.classList.add("close-modal");
    document.body.style.overflow = "auto";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 1;
        item.style.pointerEvents = "auto";
    });
}

function handleOpenConfirmationModal(e) {
    e.stopPropagation();
    handleCloseProfileModal();
    profileConfirmationModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseConfirmationModal() {
    profileConfirmationModal.classList.add("close-modal");
    document.body.style.overflow = "auto";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 1;
        item.style.pointerEvents = "auto";
    });
}

window.addEventListener("click", (e) => {
    // condition - if the modal is currently rendered && if the click is not within the modal 
    if (!profileModal.classList.contains("close-modal") && !profileModal.contains(e.target)) {
        handleCloseProfileModal();
    }
    if (!profileDetailModal.classList.contains("close-modal") && !profileDetailModal.contains(e.target)) {
        handleCloseDetailModal();
    }
});
