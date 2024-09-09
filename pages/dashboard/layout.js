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
  {
    headItem: "My Employees",
    subDetails: [
      {
        name: "HrWorkPlace User Manual",
      },
      {
        name: "Employee Handbook",
      },
      {
        name: "My Profile",
        url:"../myprofile/index.html", 
      },
      {
        name:"My Assigned's Asset",
        url:"../myassigned'sasset/index.html",
      },
      {
        name: "My Attendance",
        url:"../myattendance/index.html",
      },
      {
        name: "Change Password",
        url:"../changepassword/index.html",
      },
    ]
  },
  {
    headItem: "My Careers",
    subDetails: [
      {
        name:"View Competencies Catalog",
        url: "../viewcompetenciescatalog/index.html",
      },
      {
        name:"My Job Description",
        url: "../myjobdescription/index.html",
      },
      {
        name:"Business Academy",
        url:"../businessacademy/index.html",
      },
      {
        name:"My Redeployment",
        url:"../myredeployment/index.html",
      },
      {
        name:"My Promotion",
        url:"../mypromotion/index.html",
      },
      {
        name:"My Training Request",
        url:"../mytrainingrequest/index.html",
      },
      {
        name:"My Training",
        url:"../mytraining/index.html",
      },
    ]
  },
  {
    headItem: "My Leave",
    subDetails: [
      {
        name: "My Leave Request",
        url:"../myleaverequest/index.html",
      },
    ]
  },
  {
    headItem: "My Travels",
    subDetails: [
      {
        name: "My Travel Request",
        url: "../mytravelrequest/index.html",
      },
    ]
  },
  {
    headItem: "My Performance",
    subDetails: [
      {
        name: "My 360 Degree Appraisal",
        url: "../my360degreeappraisal/index.html"
      },
      {
        name: "My 360 Degree Task",
        url: "../my360degreetask/index.html"
      },
      {
        name: "My Balance Score Card KPI",
        url: "../mybalancescorecardkpi/index.html"
      },
      {
        name: "My Balance Score Card",
        url: "../mybalancescorecard/index.html"
      },
      {
        name: "My Corporate Balance Score Card",
        url: "../mycorporatebalancescorecard/index.html"
      },
      {
        name: "My Check-In Review",
        url: "../mycheckinreview/index.html"
      },
      {
        name: "My Confirmation",
        url: "../myconfirmation/index.html"
      },
      {
        name: "My Result & Behaviour KPI",
        url: "../myresult&behaviourkpi/index.html"
      },
      {
        name: "My Result & Behaviour Appraisal Mgt.",
        url: "../myresult&behaviourappraisalmgt/index.html"
      },
      {
        name: "My Time Sheet",
        url: "../mytimesheet/index.html"
      },
      {
        name: "My Task",
        url: "../mytask/index.html"
      },
    ]
  },
  {
    headItem: "My Discipline",
    subDetails: [
      {
        name:  "My Sanction",
        url: "../mysanction/index.html",
      },
      {
        name: "My Query",
        url: "../myquery/index.html",
      },
    ]
  },
  {
    headItem: "My Benefit",
    subDetails: [
      {
        name:  "My Benefit",
        url: "../mybenefit/index.html",
      },
    ]
  },
  {
    headItem: "My Loan",
    subDetails: [
      {
        name: "My Loan Request",
        url:"../myloanrequest/index.html",
      },
      {
        name: "My Loan Repayment",
        url: "../myloanrepayment/index.html", 
      },
    ]
  },
  {
    headItem: "My Payroll ",
    subDetails: [
      {
        name: "My Overtime",
        url: "../myovertime/index.html",
      },
      {
        name: "My Payroll",
        url: "../mypayroll/index.html",
      },
    ]
  },
  {
    headItem: "My Expense",
    subDetails: [
      {
        name: "My Expense Claims",
        url: "../expenseclaims/index.html"
      },
      {
        name: "My Cash Advance",
        url: "../mycashadvance/index.html"
      },
      {
        name: "My Cash Retirement",
        url: "../mycashretirement/index.html"
      },
    ]
  },
  {
    headItem: "My Succession Plan",
    subDetails: [
      {
        name: "My Skill Set",
        url: "../myskillset/index.html",
      },
      {
        name: "My Succession Plan",
        url: "../mysuccessionplan/index.html",
      },
    ]
  },
  {
    headItem: "My Medical Service",
    subDetails: [
      {
        name: "My Medical Service",
        url: "../mymedicalservice/index.html", 
      },
    ]
  },
  {
    headItem: "My Feedback",
    subDetails: [
      {
        name:"My Feedback",
        url:"../myfeedback/index.html",
      },
    ]
  },
  {
    headItem: "My Exit",
    subDetails: [
      {
        name:"Exit Request",
        url:"../exitrequest/index.html",
      },
      {
        name:"Exit Interview",
        url:"../exitinterview/index.html",
      },
    ]
  },
];


if (selfServiceItemsColumn) {
  selfServiceItemsColumn.innerHTML = selfServiceItems.map((selfServiceItem, index) => `
    <div class="self-service-item" key="${index}"> 
      <div class="row self-service-link">
        <i class="${selfServiceItem.icon} self-service-link-item-icon"></i>
        <span class="self-service-link-item">${selfServiceItem.headItem}</span>
        ${selfServiceItem.subDetails ? `<i class="fa-solid fa-greater-than self-service-link-item-dropdown"></i>` : ''}
      </div> 
      ${selfServiceItem.subDetails ? `
        <div class="side-nav-link-item sub-items hide">
            ${selfServiceItem.subDetails.map(subDetail => `
                <div class="sub-detail">
                  <a href=${subDetail.url || "#"}>${subDetail.name || subDetail}</a>
                </div>
            `).join('')}
        </div>
      ` : ''}
    </div>
  `).join("");
}

document.querySelectorAll('.self-service-link').forEach(headItem => {
  headItem.addEventListener('click', () => {
    const subDetails = headItem.nextElementSibling;
    const dropdownIcon = headItem.querySelector('.self-service-link-item-dropdown');

    if (subDetails) {
      subDetails.classList.toggle('hide');
      if (subDetails.classList.contains('hide')) {
        dropdownIcon.classList.remove('fa-chevron-down');
        dropdownIcon.classList.add('fa-greater-than');
      } else {
        dropdownIcon.classList.remove('fa-greater-than');
        dropdownIcon.classList.add('fa-chevron-down');
      }
    }
  });
});

const userDetailItemsColumn = document.querySelector(".user-detail-items");
const dropdownToggle = document.querySelector(".side-nav-link-item-dropdown");
const userCredentialRow = document.querySelector(".user-credential");

const userDetailItems = [
  { detailItem: "Logout", icon: "fa-solid fa-arrow-right-from-bracket" },
  { detailItem: "Sleep", icon: "fa-regular fa-moon" },
  { detailItem: "Switch User", icon: "fa-regular fa-user" },
];

if (userDetailItemsColumn) {
  userDetailItemsColumn.innerHTML = userDetailItems.map((userDetailItem, index) => `
        <div class="user-detail-item" key="${index}">
            <div class="row user-detail-link">
                ${userDetailItem.icon ? `<i class="${userDetailItem.icon} user-detail-link-item-icon"></i>` : ''}
                <span class="user-detail-link-item">${userDetailItem.detailItem}</span>
            </div>
        </div>
    `).join("");
}

document.querySelectorAll('.user-credential').forEach(headItem => {
  headItem.addEventListener('click', () => {
    const subDetails = headItem.nextElementSibling;
    const dropdownIcon = headItem.querySelector('.side-nav-link-item-dropdown');

    if (subDetails) {
      subDetails.classList.toggle('hide');
      if (subDetails.classList.contains('hide')) {
        dropdownIcon.classList.remove('fa-chevron-down');
        dropdownIcon.classList.add('fa-greater-than');
      } else {
        dropdownIcon.classList.remove('fa-greater-than');
        dropdownIcon.classList.add('fa-chevron-down');
      }
    }
  });
});

if (searchChips) {
  searchChips.innerHTML = sideNavItems.slice(1).map((item, index) => `
        <div class="row search-chip" key=${index}>
            <i class="${item.icon} "></i>
            <span class="">${item.navItem}</span>
        </div>
    `).join("")
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
