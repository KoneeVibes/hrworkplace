const attendanceTable = document.querySelector(".module-table");
const attendanceModal = document.querySelector(".attendance-module-modal");
const attendanceForm = document.querySelector(".module-modal-form");
const attendanceConfirmationModal = document.querySelector(".attendance-confirmation-modal");
const markedForDeHighlighting = document.querySelectorAll(".module-title-box, .module-navigation, .module-table, .top-nav, .side-nav");
const headers = ["S/N", "Name", "Company", "Department", "Task Date", "Task Title", "Time Spent", "Manager's Remark", "Status", "View"];
const rows = [""];

attendanceTable.innerHTML = rows.length > 0 ? (
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
                <tr key=${index}>
                    <td>
                        <input 
                            type="checkbox"
                        />
                    </td>
                    <td>${row}</td>
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
            <p>When Ofofon logs his attendance, they will show up here</p>
        </div>
        <div class="cta-box">
            <button onclick="handleOpenAttendanceModal(event)">
                <span>Add New Attendance</span>
            </button>
        </div>
    </div>`
);

attendanceForm.innerHTML = (`
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
            <button type="reset" onclick="handleCloseAttendanceModal()">
                <span>Cancel</span>
            </button>
            <button type="button" onclick="handleOpenConfirmationModal(event)">
                <span>Save Changes</span>
            </button>
        </div>
    </form>
`)

function handleOpenAttendanceModal(e) {
    e.stopPropagation();
    attendanceModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseAttendanceModal() {
    attendanceModal.classList.add("close-modal");
    document.body.style.overflow = "auto";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 1;
        item.style.pointerEvents = "auto";
    });
}

function handleOpenConfirmationModal(e) {
    e.stopPropagation();
    handleCloseAttendanceModal();
    attendanceConfirmationModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 0.1;
        item.style.pointerEvents = "none";
    });
}

function handleCloseConfirmationModal() {
    attendanceConfirmationModal.classList.add("close-modal");
    document.body.style.overflow = "auto";
    markedForDeHighlighting.forEach((item) => {
        item.style.opacity = 1;
        item.style.pointerEvents = "auto";
    });
}

window.addEventListener("click", (e) => {
    // condition - if the modal is currently rendered && if the click is not within the modal 
    if (!attendanceModal.classList.contains("close-modal") && !attendanceModal.contains(e.target)) {
        handleCloseAttendanceModal();
    }
});
