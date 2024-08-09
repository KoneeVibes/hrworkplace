const sideNavItemsColumn = document.querySelector(".side-nav-items");
const sideNavItems = [
    { navItem: "Home", icon: "fa-solid fa-house" },
    { navItem: "Employee", icon: "fa-solid fa-user-group" },
    { navItem: "Career", icon: "fa-solid fa-briefcase" },
    { navItem: "Leave & Travel", icon: "fa-solid fa-book-open-reader" },
    { navItem: "Performance", icon: "fa-solid fa-chart-simple" },
    { navItem: "Discipline", icon: "fa-solid fa-house-laptop" },
    { navItem: "Loan", icon: "fa-solid fa-money-check-dollar" },
    { navItem: "Payroll", icon: "fa-solid fa-coins" },
    { navItem: "Expense", icon: "fa-solid fa-money-bills" },
    { navItem: "Admin", icon: "fa-solid fa-money-check" },
    { navItem: "Succession Plan", icon: "fa-solid fa-clipboard" },
    { navItem: "Health and Safety", icon: "fa-solid fa-laptop-medical" },
    { navItem: "Strategic Plan Warehousing", icon: "fa-solid fa-warehouse" },
    { navItem: "Reports", icon: "fa-solid fa-chart-line" },
    { navItem: "Exit", icon: "fa-solid fa-circle-xmark" },
];

sideNavItemsColumn.innerHTML = sideNavItems.map((sideNavItem, key) => {
    return `
        <div class="row side-nav-item" key="${key}">
            <i class="${sideNavItem.icon} nav-link-item-icon"></i>
            <span class="nav-link-item">${sideNavItem.navItem}</span>
            <i class="fa-solid fa-greater-than drop-down nav-link-item-dropdown"></i>
        </div>
    `;
}).join("");

const minSideNavWidth = "4.25rem";
const maxSideNavWidth = "16rem";
const sideNav = document.querySelector(".side-nav");
const mainArea = document.querySelector(".main-area");
const collapsibleNavItems = document.querySelectorAll(".nav-link-item, .nav-link-item-dropdown");

const handleMouseEnter = () => {
    const screenSize = window.innerWidth;
    collapsibleNavItems.forEach((collapseNavItem) => collapseNavItem.classList.remove("hide-element"));
    if (screenSize <= 768) {
        mainArea.style.display = "none";
        document.documentElement.style.setProperty('--side-nav-width', `-webkit-fill-available`);
    } else if (screenSize <= 1024) {
        document.documentElement.style.setProperty('--side-nav-width', maxSideNavWidth);
    }
};

const handleMouseLeave = () => {
    mainArea.style.display = "block";
    document.documentElement.style.setProperty('--side-nav-width', minSideNavWidth);
    collapsibleNavItems.forEach((collapseNavItem) => collapseNavItem.classList.add("hide-element"));
};

const collapseNavItems = () => {
    const screenSize = window.innerWidth;
    //BELOW: Remove existing event listeners to prevent stacking
    sideNav.removeEventListener("mouseover", handleMouseEnter);
    sideNav.removeEventListener("mouseleave", handleMouseLeave);
    if (screenSize <= 1024) {
        document.documentElement.style.setProperty('--side-nav-width', minSideNavWidth);
        collapsibleNavItems.forEach((collapseNavItem) => collapseNavItem.classList.add("hide-element"));
        // BELOW: Attach event listeners for smaller screens
        sideNav.addEventListener("mouseover", handleMouseEnter);
        sideNav.addEventListener("mouseleave", handleMouseLeave);
    } else {
        document.documentElement.style.setProperty('--side-nav-width', maxSideNavWidth);
        collapsibleNavItems.forEach((collapseNavItem) => collapseNavItem.classList.remove("hide-element"));
        // BELOW: Ensure event listeners are not attached if not needed
        sideNav.removeEventListener("mouseover", handleMouseEnter);
        sideNav.removeEventListener("mouseleave", handleMouseLeave);
    }
};

//BELOW: Initialize state on page load and window resize
window.addEventListener("load", collapseNavItems);
window.addEventListener("resize", collapseNavItems);
