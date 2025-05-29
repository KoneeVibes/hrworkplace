const profileBody = document.querySelector(".module-body");
const profileModal = document.querySelector(".profile-module-modal");
const profileForm = document.querySelector(".module-modal-form");
const profileConfirmationModal = document.querySelector(".profile-confirmation-modal");
const profileDetailModal = document.querySelector(".module-detail-modal");
const profileDetailBox = document.querySelector(".module-modal-detail-box");
const profileCategoriesBox = document.querySelector(".profile-categories");
const profileCategories = ["Overview", "Education", "Professional", "Experience", "Reference", "Next of KIN", "Documents"];
const markedForDeHighlighting = document.querySelectorAll(".module-title-box, .module-navigation, .module-table, .top-nav, .side-nav");
const rows = true;
let activeProfileCategory = "Overview";

// base profile profile body - overview
profileBody.innerHTML = (
    `
    <div class="information-card">
        <!-- IBK your code for personal information comes in here -->
        <h1>Personal Information</h1>
        <div class="personal-information personal">
            <div class="personalInfo">
                <label>First Name</label>
                <p>Ofofon</p>
            </div>
            <div class="personalInfo">
                <label>Last Name</label>
                <p>Umoren</p>
            </div>
        </div>
        <div class="personal-information">
            <div class="personalInfo">
                <label>Email</label>
                <p>ofofonumoren@smartfocus.com</p>
            </div>
            <div class="personalInfo">
                <label>Phone</label>
                <p>+234 8323 483 945</p>
            </div>
        </div>
    </div>
    <div class="address-card">
        <!-- IBK your code for address comes in here -->
        <h1>Address</h1>
        <div class="address-information address">
            <div class="addressInfo">
                <label>Country</label>
                <p>Nigeria</p>
            </div>
            <div class="addressInfo">
                <label>City/State</label>
                <p>Ikeja Lagos</p>
            </div>
        </div>
        <div class="address-information">
            <div class="addressInfo">
                <label>Postal Code</label>
                <p>0924358</p>
            </div>
            <div class="addressInfo">
                <label>Address</label>
                <p>---</p>
            </div>
        </div>
    </div>
    `
);


// base profile form case - overview
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

function getBodyCategoryContent(activeProfileCategory) {
    switch (activeProfileCategory) {
        case 'Overview':
            return (`
                <div class="information-card">
                    <h1>Personal Information</h1>
                    <div class="personal-information personal">
                        <div class="personalInfo">
                            <label>First Name</label>
                            <p>Ofofon</p>
                        </div>
                        <div class="personalInfo">
                            <label>Last Name</label>
                            <p>Umoren</p>
                        </div>
                    </div>
                    <div class="personal-information">
                        <div class="personalInfo">
                            <label>Email</label>
                            <p>ofofonumoren@smartfocus.com</p>
                        </div>
                        <div class="personalInfo">
                            <label>Phone</label>
                            <p>+234 8323 483 945</p>
                        </div>
                    </div>
                </div>
                <div class="address-card">
                    <h1>Address</h1>
                    <div class="address-information address">
                        <div class="addressInfo">
                            <label>Country</label>
                            <p>Nigeria</p>
                        </div>
                        <div class="addressInfo">
                            <label>City/State</label>
                            <p>Ikeja Lagos</p>
                        </div>
                    </div>
                    <div class="address-information">
                        <div class="addressInfo">
                            <label>Postal Code</label>
                            <p>0924358</p>
                        </div>
                        <div class="addressInfo">
                            <label>Address</label>
                            <p>---</p>
                        </div>
                    </div>
                </div>`
            )
        case 'Education':
        case 'Professional':
        case 'Experience':
        case 'Reference':
        case 'Next of KIN':
        case 'Documents':
        default:
            return (
                `<div>
                    <p>${activeProfileCategory}</p>
                </div>`
            );
    }
}

function getFormCategoryContent(activeProfileCategory) {
    switch (activeProfileCategory) {
        case 'Overview':
        case 'Education':
        case 'Professional':
        case 'Experience':
        case 'Reference':
        case 'Next of KIN':
        case 'Documents':
        default:
            return (
                `<div>
                    <p>${activeProfileCategory}</p>
                </div>`
            );
    }
}

function handleProfileCategorySelection(e, category) {
    e.preventDefault();
    activeProfileCategory = category;
    profileBody.innerHTML = rows ? getBodyCategoryContent(activeProfileCategory) : (
        `<div class="call-to-action">
            <div>
                <img src=${"../../../../assets/search.svg"} alt="search-icon"/>
            </div>
            <div>
                <h3>Nothing to see here...yet</h3>
                <p>When Ofofon logs his ${activeProfileCategory}, they will show up here</p>
            </div>
            <div class="cta-box">
                <button onclick="handleOpenProfileModal(event)">
                    <span>Add New ${activeProfileCategory}</span>
                </button>
            </div>
        </div>`
    );
    profileForm.innerHTML = rows ? getFormCategoryContent(activeProfileCategory) : (
        `<div class="call-to-action">
            <div>
                <img src=${"../../../../assets/search.svg"} alt="search-icon"/>
            </div>
            <div>
                <h3>Nothing to see here...yet</h3>
                <p>When Ofofon logs his ${activeProfileCategory}, they will show up here</p>
            </div>
            <div class="cta-box">
                <button onclick="handleOpenProfileModal(event)">
                    <span>Add New ${activeProfileCategory}</span>
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
