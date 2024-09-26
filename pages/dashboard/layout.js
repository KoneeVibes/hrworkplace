const sideNavItemsColumn = document.querySelector(".side-nav-items");
const sideNavItems = [
  { navItem: "Home", icon: "fa-solid fa-house" },
  {
    navItem: "Employee",
    icon: "fa-solid fa-user-group",
    subItems: [
      {
        name: "Employee Management",
        url: "/admin/employeemanagement/index.html",
      },
      {
        name: "Assigned's Asset",
        url: "/admin/assigned'sasset/index.html",
      },
      {
        name: "Resource Management",
        url: "/admin/resourcemanagement/index.html",
      },
      {
        name: "Benefit Management",
        url: "/admin/benefitmanagement/index.html",
      },
      {
        name: "Contract Management",
        url: "/admin/contractmanagement/index.html",
      },
      {
        name: "WorkForce Budget Mgt",
        url: "/admin/workforcebudgetmgt/index.html",
      },
      {
        name: "Attendance Management",
        url: "/admin/attendancemanagement/index.html",
      },
      {
        name: "List of Competencies",
        url: "/admin/listofcompetencies/index.html",
      },
    ]
  },
  {
    navItem: "Career",
    icon: "fa-solid fa-briefcase",
    subItems: [
      {
        name: "Business Academic Management",
        url: "/admin/businessacademicmanagement"
      },
      {
        name: "Job Description Management",
        url: "/admin/jobdescriptionmanagement/index.html",
      },
      {
        name: "Redeployment Management",
        url: "/admin/redeploymentmanagement/index.html",
      },
      {
        name: "Rehire Management",
        url: "/admin/rehiremanagement/index.html",
      },
      {
        name: "Promotion Management",
        url: "/admin/promotionmanagement/index.html",
      },
      {
        name: "Training Request Management",
        url: "/admin/trainingrequestmanagement/index.html",
      },
      {
        name: "Employee Training Management",
        url: "/admin/employeetrainingmanagement/index.html",
      },
      {
        name: "Training Cost Management",
        url: "/admin/trainingcostmanagement/index.html",
      },
      {
        name: "New Hire Management",
        url: "/admin/newhiremanagement/index.html",
      },
    ]
  },
  {
    navItem: "Leave & Travel",
    icon: "fa-solid fa-book-open-reader",
    subItems: [
      {
        name: "Leave Planner Management",
        url: "/admin/leaveplannermanagement/index.html",
      },
      {
        name: "Leave Request Management",
        url: "/admin/leaverequestmanagement/index.html",
      },
      {
        name: "Travel Request Management",
        url: "/admin/travelrequestmanagement/index.html",
      },
    ]
  },
  {
    navItem: "Performance",
    icon: "fa-solid fa-chart-simple",
    subItems: [
      {
        name: "Employee BSC Management",
        url: "/admin/employeebscmanagement/index.html",
      },
      {
        name: "Corporate BSC Management",
        url: "/admin/corporatebscmanagement/index.html",
      },
      {
        name: "Check-In Review Management",
        url: "/admin/checkinreviewmanagement/index.html",
      },
      {
        name: "360 Degree Management",
        url: "/admin/360degreemanagement/index.html",
      },
      {
        name: "Result & Behaviour KPI",
        url: "/admin/result&behaviourkpi/index.html",
      },
      {
        name: "Result & Behaviour Appraisal Mgt.",
        url: "/admin/result&behaviourappraisalmgt/index.html",
      },
      {
        name: "Time Sheet Management",
        url: "/admin/timesheetmanagement/index.html",
      },
      {
        name: "Task Management",
        url: "/admin/taskmanagement/index.html",
      },
      {
        name: "Confirmation Management",
        url: "/admin/confirmationmanagement/index.html",
      },
    ]
  },
  {
    navItem: "Discipline",
    icon: "fa-solid fa-house-laptop",
    subItems: [
      {
        name: "Query Management",
        url: "/admin/querymanagement/index.html",
      },
      {
        name: "Sanction Management",
        url: "/admin/sanctionmanagement/index.html",
      },
    ]
  },
  {
    navItem: "Loan",
    icon: "fa-solid fa-money-check-dollar",
    subItems: [
      {
        name: "Loan Request Management",
        url: "/admin/loanrequestmanagement/index.html"
      },
      {
        name: "Loan Repay Management",
        url: "/admin/loanrepaymanagement/index.html"
      },
      {
        name: "Loan Migration Management",
        url: "/admin/loanmigrationmanagement/index.html",
      },
    ]
  },
  {
    navItem: "Payroll",
    icon: "fa-solid fa-coins",
    subItems: [
      {
        name: "Overtime Tracking By HR",
        url: "/admin/overtimetrackingbyhr/index.html",
      },
      {
        name: "Overtime Management",
        url: "/admin/overtimemanagement/index.html",
      },
      {
        name: "Payroll Managent",
        url: "/admin/payrollmanagement/index.html",
      },
      {
        name: "Payroll Extra Upload",
        url: "/admin/payrollextraupload/index.html",
      },
      {
        name: "Payroll Approval Management",
        url: "/admin/payrollapprovalmanagement/index.html",
      },
      {
        name: "Remove Payroll",
        url: "/admin/removepayroll/index.html",
      },
    ]
  },
  {
    navItem: "Expense",
    icon: "fa-solid fa-money-bills",
    subItems: [
      {
        name: "Expense Claims Management",
        url: "/admin/expenseclaimsmanagement/index.html",
      },
      {
        name: "Cash Advance Management",
        url: "/admin/cashadvancemanagement/index.html",
      },
      {
        name: "Cash Retirement Management",
        url: "/admin/cashretirementmanagement/index.html",
      },
    ]
  },

  {
    navItem: "Succession Plan",
    icon: "fa-solid fa-clipboard",
    subItems: [
      {
        name: "Skill Set Management",
        url: "/admin/skillsetmanagement/index.html",
      },
      {
        name: "Succession Management",
        url: "/admin/successionmanagement/index.html",
      },
      {
        name: "Reporting Hierarchy",
        url: "/admin/reportinghierarchy/index.html",
      },
    ]
  },
  {
    navItem: "Health and Safety",
    icon: "fa-solid fa-laptop-medical",
    subItems: [
      {
        name: "Illness Management",
        url: "/admin/illnessmanagement/index.html",
      },
      {
        name: "Injury Management",
        url: "/admin/injurymanagement/index.html",
      },
      {
        name: "Medical Service Management",
        url: "/admin/medicalservicemanagement/index.html",
      },
    ]
  },
  {
    navItem: "Strategic Plan Warehousing",
    icon: "fa-solid fa-warehouse",
    subItems: [
      {
        name: "Strategic Intent Management",
        url: "/admin/strategicintentmanagement/index.html"
      },
      {
        name: "Long Term Objectives Management",
        url: "/admin/longtermobjectivesmanagement/index.html",
      },
      {
        name: "Yearly Objectives Management",
        url: "/admin/yearlyobjectivesmanagement/index.html",
      },
      {
        name: "Action Plans Management",
        url: "/admin/actionplansmanagement/index.html",
      },
    ]
  },
  {
    navItem: "Reports",
    icon: "fa-solid fa-chart-line",
    subItems: [
      {
        name: "Employee Dashboard",
        url: "/admin/employeedashboard/index.html",
      },
      {
        name: "Leave Request",
        url: "/admin/leaverequest/index.html",
      },
      {
        name: "Cash Advance",
        url: "/admin/cashadvance/index.html",
      },
      {
        name: "Cash Retirement",
        url: "/admin/cashretirement/index.html",
      },
      {
        name: "Expense Claims Dashboard",
        url: "/admin/expenseclaimsdashboard",
      },
      {
        name: "Payroll",
        url: "/admin/payroll/index.html",
      },
    ]
  },
  {
    navItem: "Exit",
    icon: "fa-solid fa-circle-xmark",
    subItems: [
      {
        name: "Exit Management",
        url: "/admin/exitmanagement/index.html",
      },
      {
        nmae: "Exit By HR",
        url: "/admin/exitbyhr/index.html",
      },
      {
        name: "Exit Bulk Employees",
        url: "/admin/exitbulkemployees/index.html",
      },
      {
        name: "Exit Clearance Management",
        url: "/admin/exitclearancemanagement/index.html",
      },
      {
        name: "Exit Interview Management",
        url: "/admin/exitinterviewmanagement/index.html",
      },
    ]
  },

  {
    navItem: "Admin",
    icon: "fa-solid fa-money-check",
    subItems: [
      {
        name: "Setup Management",
        url: "/admin/setupmanagement/index.html"
      },
      {
        name: "Change Setup Value",
        url: "/admin/changesetupvalue/index.html",
      },
      {
        name: "Change Employee Username",
        url: "/admin/changeemployeeusername/index.html",
      },
      {
        name: "Access Right Management",
        url: "/admin/accessrightmanagement/index.html",
      },
      {
        name: "Notice Management",
        url: "/admin/noticemanagement/index.html",
      },
      {
        name: "Short Message Service[SMS]",
        url: "/admin/shortmessageservice/index.html",
      },
      {
        name: "MD's Desk Management",
        url: "/admin/md'sdeskmanagement/index.html",
      },
      {
        name: "News Managemet",
        url: "/admin/newsmanagement/index.html",
      },
      {
        name: "Feedback Management",
        url: "/admin/feedbackmanagement/index.html",
      },
      {
        name: "Audit Trail Management",
        url: "/admin/audittrailmanagement/index.html",
      },
      {
        name: "Task Monitoring Management",
        url: "/admin/taskmonitoringmanagement/index.html",
      },
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
                      <div class="sub-item">
                        <a href="/pages/modules${subItem.url || "#"}">${subItem.name || subItem}</a>
                      </div>
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
        url: "/selfservice/myprofile/index.html",
      },
      {
        name: "My Assigned's Asset",
        url: "/selfservice/myassigned'sasset/index.html",
      },
      {
        name: "My Attendance",
        url: "/selfservice/myattendance/index.html",
      },
      {
        name: "Change Password",
        url: "/selfservice/changepassword/index.html",
      },
    ]
  },
  {
    headItem: "My Careers",
    subDetails: [
      {
        name: "View Competencies Catalog",
        url: "/selfservice/viewcompetenciescatalog/index.html",
      },
      {
        name: "My Job Description",
        url: "/selfservice/myjobdescription/index.html",
      },
      {
        name: "Business Academy",
        url: "/selfservice/businessacademy/index.html",
      },
      {
        name: "My Redeployment",
        url: "/selfservice/myredeployment/index.html",
      },
      {
        name: "My Promotion",
        url: "/selfservice/mypromotion/index.html",
      },
      {
        name: "My Training Request",
        url: "/selfservice/mytrainingrequest/index.html",
      },
      {
        name: "My Training",
        url: "/selfservice/mytraining/index.html",
      },
    ]
  },
  {
    headItem: "My Leave",
    subDetails: [
      {
        name: "My Leave Request",
        url: "/selfservice/myleaverequest/index.html",
      },
    ]
  },
  {
    headItem: "My Travels",
    subDetails: [
      {
        name: "My Travel Request",
        url: "/selfservice/mytravelrequest/index.html",
      },
    ]
  },
  {
    headItem: "My Performance",
    subDetails: [
      {
        name: "My 360 Degree Appraisal",
        url: "/selfservice/my360degreeappraisal/index.html"
      },
      {
        name: "My 360 Degree Task",
        url: "/selfservice/my360degreetask/index.html"
      },
      {
        name: "My Balance Score Card KPI",
        url: "/selfservice/mybalancescorecardkpi/index.html"
      },
      {
        name: "My Balance Score Card",
        url: "/selfservice/mybalancescorecard/index.html"
      },
      {
        name: "My Corporate Balance Score Card",
        url: "/selfservice/mycorporatebalancescorecard/index.html"
      },
      {
        name: "My Check-In Review",
        url: "/selfservice/mycheckinreview/index.html"
      },
      {
        name: "My Confirmation",
        url: "/selfservice/myconfirmation/index.html"
      },
      {
        name: "My Result & Behaviour KPI",
        url: "/selfservice/myresult&behaviourkpi/index.html"
      },
      {
        name: "My Result & Behaviour Appraisal Mgt.",
        url: "/selfservice/myresult&behaviourappraisalmgt/index.html"
      },
      {
        name: "My Time Sheet",
        url: "/selfservice/mytimesheet/index.html"
      },
      {
        name: "My Task",
        url: "/selfservice/mytask/index.html"
      },
    ]
  },
  {
    headItem: "My Discipline",
    subDetails: [
      {
        name: "My Sanction",
        url: "/selfservice/mysanction/index.html",
      },
      {
        name: "My Query",
        url: "/selfservice/myquery/index.html",
      },
    ]
  },
  {
    headItem: "My Benefit",
    subDetails: [
      {
        name: "My Benefit",
        url: "/selfservice/mybenefit/index.html",
      },
    ]
  },
  {
    headItem: "My Loan",
    subDetails: [
      {
        name: "My Loan Request",
        url: "/selfservice/myloanrequest/index.html",
      },
      {
        name: "My Loan Repayment",
        url: "/selfservice/myloanrepayment/index.html",
      },
    ]
  },
  {
    headItem: "My Payroll ",
    subDetails: [
      {
        name: "My Overtime",
        url: "/selfservice/myovertime/index.html",
      },
      {
        name: "My Payroll",
        url: "/selfservice/mypayroll/index.html",
      },
    ]
  },
  {
    headItem: "My Expense",
    subDetails: [
      {
        name: "My Expense Claims",
        url: "/selfservice/expenseclaims/index.html"
      },
      {
        name: "My Cash Advance",
        url: "/selfservice/mycashadvance/index.html"
      },
      {
        name: "My Cash Retirement",
        url: "/selfservice/mycashretirement/index.html"
      },
    ]
  },
  {
    headItem: "My Succession Plan",
    subDetails: [
      {
        name: "My Skill Set",
        url: "/selfservice/myskillset/index.html",
      },
      {
        name: "My Succession Plan",
        url: "/selfservice/mysuccessionplan/index.html",
      },
    ]
  },
  {
    headItem: "My Medical Service",
    subDetails: [
      {
        name: "My Medical Service",
        url: "/selfservice/mymedicalservice/index.html",
      },
    ]
  },
  {
    headItem: "My Feedback",
    subDetails: [
      {
        name: "My Feedback",
        url: "/selfservice/myfeedback/index.html",
      },
    ]
  },
  {
    headItem: "My Exit",
    subDetails: [
      {
        name: "Exit Request",
        url: "/selfservice/exitrequest/index.html",
      },
      {
        name: "Exit Interview",
        url: "/selfservice/exitinterview/index.html",
      },
    ]
  },
];

if (selfServiceItemsColumn) {
  selfServiceItemsColumn.innerHTML = selfServiceItems.map((selfServiceItem, index) => `
    <div class="self-service-item" key="${index}"> 
      <div class="row self-service-link">
        <span class="self-service-link-item">${selfServiceItem.headItem}</span>
        ${selfServiceItem.subDetails ? `<i class="fa-solid fa-greater-than self-service-link-item-dropdown"></i>` : ''}
      </div> 
      ${selfServiceItem.subDetails ? `
        <div class="side-nav-link-item sub-items hide">
            ${selfServiceItem.subDetails.map(subDetail => `
                <div class="sub-detail">
                  <a href="/pages/modules${subDetail.url || "#"}">${subDetail.name || subDetail}</a>
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
