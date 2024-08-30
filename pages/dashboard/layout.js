const sideNavItemsColumn = document.querySelector(".side-nav-items");
const sideNavItems = [
    { navItem: "Home", icon: "fa-solid fa-house" },
    {
        navItem: "Employee",
        icon: "fa-solid fa-user-group",
        subItems: [
            "Employee Management",
            "Assigned's Asset",
            "Resource Management",
            "Benefit Management",
            "Contract Management",
            "WorkForce Budget Mgt",
            "Attendance Management",
            "List of Competencies",
        ]
    },
    {
        navItem: "Career",
        icon: "fa-solid fa-briefcase",
        subItems: [
            "Business Academic Management",
            "Job Description Management",
            "Redeployment Management",
            "Rehire Management",
            "Promotion Management",
            "Training Request Management",
            "Employee Training Management",
            "Training Cost Management",
            "New Hire Management",
        ]
    },
    {
        navItem: "Leave & Travel",
        icon: "fa-solid fa-book-open-reader",
        subItems: [
            "Leave Planner Management",
            "Leave Request Management",
            "Travel Request Management",
        ]
    },
    {
        navItem: "Performance",
        icon: "fa-solid fa-chart-simple",
        subItems: [
            "Employee BSC Management",
            "Corporate BSC Management",
            "Check-In Review Management",
            "360 Degree Management",
            "Result & Behaviour KPI",
            "Result & Behaviour Appraisal Mgt.",
            "Time Sheet Management",
            "Task Management",
            "Confirmation Management",
        ]
    },
    {
        navItem: "Discipline",
        icon: "fa-solid fa-house-laptop",
        subItems: [
            "Query Management",
            "Sanction Management",
        ]
    },
    {
        navItem: "Loan",
        icon: "fa-solid fa-money-check-dollar",
        subItems: [
            "Loan Request Management",
            "Loan Repay Management",
            "Loan Migration Management",
        ]
    },
    {
        navItem: "Payroll",
        icon: "fa-solid fa-coins",
        subItems: [
            "Overtime Tracking By HR",
            "Overtime Management",
            "Payroll Managent",
            "Payroll Extra Upload",
            "Payroll Approval Management",
            "Remove Payroll",
        ]
    },
    {
        navItem: "Expense",
        icon: "fa-solid fa-money-bills",
        subItems: [
            "Expense Claims Management",
            "Cash Advance Management",
            "Cash Retirement Management",
        ]
    },
    {
        navItem: "Admin",
        icon: "fa-solid fa-money-check",
        subItems: [
            "Setup Management",
            "Change Setup Value",
            "Change Employee Username",
            "Access Right Management",
            "Notice Management",
            "Short Message Service[SMS]",
            "MD's Desk Management",
            "News Managemet",
            "Feedback Management",
            "Audit Trail Management",
            "Task Monitoring Management",
        ]
    },
    {
        navItem: "Succession Plan",
        icon: "fa-solid fa-clipboard",
        subItems: [
            "Skill Set Management",
            "Succession Management",
            "Reporting Hierarchy",
        ]
    },
    {
        navItem: "Health and Safety",
        icon: "fa-solid fa-laptop-medical",
        subItems: [
            "Illness Management",
            "Injury Management",
            "Medical Service Management",
        ]
    },
    {
        navItem: "Strategic Plan Warehousing",
        icon: "fa-solid fa-warehouse",
        subItems: [
            "Strategic Intent Management",
            "Long Term Objectives Management",
            "Yearly Objectives Management",
            "Action Plans Management"
        ]
    },
    {
        navItem: "Reports",
        icon: "fa-solid fa-chart-line",
        subItems: [
            "Employee Dashboard",
            "Leave Request",
            "Cash Advance",
            "Cash Retirement",
            "Expense Claims Dashboard",
            "Payroll"
        ]
    },
    {
        navItem: "Exit",
        icon: "fa-solid fa-circle-xmark",
        subItems: [
            "Exit Management",
            "Exit By HR",
            "Exit Bulk Employees",
            "Exit Clearance Management",
            "Exit Interview Management",
        ]
    },
];

if (sideNavItemsColumn) {
    sideNavItemsColumn.innerHTML = sideNavItems.map((sideNavItem, index) => `
      <div class="side-nav-item" key="${index}">
          <div class="row side-nav-link">
              <i class="${sideNavItem.icon} side-nav-link-item-icon"></i>
              <span class="side-nav-link-item">${sideNavItem.navItem}</span>
              ${sideNavItem.subItems ? `<i class="fa-solid fa-greater-than side-nav-link-item-dropdown"></i>` : ''}
          </div>
          ${sideNavItem.subItems ? `
              <div class="side-nav-link-item sub-items hide">
                  ${sideNavItem.subItems.map(subItem => `
                      <div class="sub-item">${subItem}</div>
                  `).join('')}
              </div>
          ` : ''}
      </div>
  `).join("");
}

document.querySelectorAll('.side-nav-link').forEach(item => {
    item.addEventListener('click', () => {
        const subItems = item.nextElementSibling;
        const dropdownIcon = item.querySelector('.side-nav-link-item-dropdown');

        if (subItems) {
            subItems.classList.toggle('hide');
            if (subItems.classList.contains('hide')) {
                dropdownIcon.classList.remove('fa-chevron-down');
                dropdownIcon.classList.add('fa-greater-than');
            } else {
                dropdownIcon.classList.remove('fa-greater-than');
                dropdownIcon.classList.add('fa-chevron-down');
            }
        }
    });
});

const sideNav = document.querySelector(".side-nav");
const mainArea = document.querySelector(".main-area");
const collapsibleNavItems = document.querySelectorAll(".side-nav-link-item, .side-nav-link-item-dropdown");
const hamburgerIcon = document.querySelector('.hamburger-icon');
const closeIcon = document.querySelector('.close-icon');
const appLogo = document.querySelector(".logo-img");
const searchModal = document.querySelector(".search-modal");
const searchField = document.querySelector(".search-anything");
const searchChips = document.querySelector(".search-chips");
const pendingTaskModal = document.querySelector(".pending-task-modal");
const selfServiceModal = document.querySelector(".self-service-modal");
const selfServiceItemsColumn = document.querySelector(".self-service-modal-items")
const selfServiceItems = [
    { item: "My Employees" },
    { item: "My Careers" },
    { item: "My Travels" },
    { item: "My Performance" },
    { item: "My Discipline" },
    { item: "My Benefit" },
    { item: "My Loan" },
    { item: "My Payroll" },
    { item: "My Expenses " },
    { item: "My Success Plan" },
    { item: "My Medical Service" },
    { item: "My Feedback" },
    { item: "My Exit" },
];

if (searchChips) {
    searchChips.innerHTML = sideNavItems.slice(1).map((item, index) => `
        <div class="row search-chip" key=${index}>
            <i class="${item.icon} "></i>
            <span class="">${item.navItem}</span>
        </div>
    `).join("")
}

if (selfServiceItemsColumn) {
    selfServiceItemsColumn.innerHTML = selfServiceItems.map((selfServiceItem, index) => `
        <div class="row self-service-item" key="${index}">
            <span class="self-service-link-item">${selfServiceItem.item}</span>
            <i class="fa-solid fa-greater-than self-service-link-item-dropdown"></i>
        </div>
    `).join("");
}

function handleHamburgerClick() {
    if (sideNav && mainArea) {
        const screenSize = window.innerWidth;
        const isHidden = sideNav.classList.toggle("hide-element");
        const maxSideNavWidth = screenSize < 425 ? "-webkit-fill-available" : "16rem";
        if (hamburgerIcon && closeIcon) {
            hamburgerIcon.classList.toggle('show');
            closeIcon.classList.toggle('show');
        }
        mainArea.style.display = isHidden ? "block" : "none";
        document.documentElement.style.setProperty('--side-nav-width', maxSideNavWidth);
        collapsibleNavItems.forEach(item => item.classList.remove("hide-element"));
    }
}

function handleMouseOver() {
    const screenSize = window.innerWidth;
    const maxSideNavWidth = screenSize < 425 ? "-webkit-fill-available" : "16rem";
    if (mainArea) {
        appLogo.style.width = "auto";
        collapsibleNavItems.forEach(item => item.classList.remove("hide-element"));
        if (screenSize < 768) {
            mainArea.style.opacity = 0.1;
            mainArea.style.pointerEvents = "none";
        } else if (screenSize <= 1024) {
            mainArea.style.opacity = 1;
            mainArea.style.pointerEvents = "auto";
        }
        document.documentElement.style.setProperty('--side-nav-width', maxSideNavWidth);
    }
}

function handleMouseLeave() {
    const minSideNavWidth = "4.25rem";
    if (mainArea) {
        appLogo.style.width = "100%";
        mainArea.style.opacity = 1;
        mainArea.style.pointerEvents = "auto";
        document.documentElement.style.setProperty('--side-nav-width', minSideNavWidth);
        collapsibleNavItems.forEach(item => item.classList.add("hide-element"));
    }
}

function collapseNavItems() {
    const screenSize = window.innerWidth;
    const minSideNavWidth = "4.25rem";
    const maxSideNavWidth = screenSize < 425 ? "-webkit-fill-available" : "16rem";

    if (sideNav) {
        sideNav.removeEventListener("mouseover", handleMouseOver);
        sideNav.removeEventListener("mouseleave", handleMouseLeave);

        if (425 < screenSize && screenSize <= 1024) {
            appLogo.style.width = "100%";
            mainArea.style.display = "block";
            document.documentElement.style.setProperty('--side-nav-width', minSideNavWidth);
            collapsibleNavItems.forEach(item => item.classList.add("hide-element"));
            sideNav.addEventListener("mouseover", handleMouseOver);
            sideNav.addEventListener("mouseleave", handleMouseLeave);
        } else {
            appLogo.style.width = "auto";
            mainArea.style.display = screenSize < 425 && closeIcon?.classList.contains("show") ? "none" : "block";
            mainArea.style.opacity = 1;
            mainArea.style.pointerEvents = "auto";
            document.documentElement.style.setProperty('--side-nav-width', maxSideNavWidth);
            collapsibleNavItems.forEach(item => item.classList.remove("hide-element"));
        }
    }
}

function handleOpenSearchModal(e) {
    e.stopPropagation();
    searchModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
}

function handleCloseSearchModal(e) {
    if (!searchField.contains(e.target)) {
        searchModal.classList.add("close-modal");
        document.body.style.overflow = "auto";
    }
}

function handleOpenSelfServiceModal(e) {
    e.stopPropagation();
    selfServiceModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
}

function handleCloseSelfServiceModal() {
    selfServiceModal.classList.add("close-modal");
    document.body.style.overflow = "auto";
}

function handleOpenPendingTaskModal(e) {
    e.stopPropagation();
    pendingTaskModal.classList.remove("close-modal");
    document.body.style.overflow = "hidden";
}

function handleClosePendingTaskModal() {
    pendingTaskModal.classList.add("close-modal");
    document.body.style.overflow = "auto";
}

window.addEventListener("load", collapseNavItems);
window.addEventListener("resize", collapseNavItems);
// handle modal renders
window.addEventListener("click", (e) => {
    // condition - if the modal is currently rendered && if the click is not within the modal 
    if (!pendingTaskModal.classList.contains("close-modal") && !pendingTaskModal.contains(e.target)) {
        handleClosePendingTaskModal()
    }
    if (!selfServiceModal.classList.contains("close-modal") && !selfServiceModal.contains(e.target)) {
        handleCloseSelfServiceModal()
    }
    if (!searchModal.classList.contains("close-modal") && !searchModal.contains(e.target)) {
        handleCloseSearchModal(e)
    }
});
