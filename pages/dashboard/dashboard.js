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

if (sideNavItemsColumn) {
    sideNavItemsColumn.innerHTML = sideNavItems.map((sideNavItem, index) => `
        <div class="row side-nav-item" key="${index}">
            <i class="${sideNavItem.icon} nav-link-item-icon"></i>
            <span class="nav-link-item">${sideNavItem.navItem}</span>
            <i class="fa-solid fa-greater-than drop-down nav-link-item-dropdown"></i>
        </div>
    `).join("");
}

const sideNav = document.querySelector(".side-nav");
const mainArea = document.querySelector(".main-area");
const collapsibleNavItems = document.querySelectorAll(".nav-link-item, .nav-link-item-dropdown");
const hamburgerIcon = document.querySelector('.hamburger-icon');
const closeIcon = document.querySelector('.close-icon');

function handleHamburgerClick() {
    if (sideNav && mainArea) {
        const isHidden = sideNav.classList.toggle("hide-element");
        mainArea.style.display = isHidden ? "block" : "none";
        if (hamburgerIcon && closeIcon) {
            hamburgerIcon.classList.toggle('show');
            closeIcon.classList.toggle('show');
        }
    }
}

function handleMouseOver(maxSideNavWidth) {
    if (collapsibleNavItems && mainArea) {
        const screenSize = window.innerWidth;
        collapsibleNavItems.forEach(item => item.classList.remove("hide-element"));
        if (screenSize < 768) {
            mainArea.style.opacity = 0.1;
            document.documentElement.style.setProperty('--side-nav-width', maxSideNavWidth);
        } else if (screenSize <= 1024) {
            document.documentElement.style.setProperty('--side-nav-width', maxSideNavWidth);
        }
    }
}

function handleMouseLeave(minSideNavWidth) {
    if (mainArea && collapsibleNavItems) {
        mainArea.style.opacity = 1;
        document.documentElement.style.setProperty('--side-nav-width', minSideNavWidth);
        collapsibleNavItems.forEach(item => item.classList.add("hide-element"));
    }
}

function collapseNavItems() {
    const screenSize = window.innerWidth;
    const minSideNavWidth = "4.25rem";
    const maxSideNavWidth = screenSize < 425 ? "-webkit-fill-available" : "16rem";
    if (sideNav && collapsibleNavItems) {
        sideNav.removeEventListener("mouseover", handleMouseOver);
        sideNav.removeEventListener("mouseleave", handleMouseLeave);

        if (425 < screenSize && screenSize <= 1024) {
            document.documentElement.style.setProperty('--side-nav-width', minSideNavWidth);
            collapsibleNavItems.forEach(item => item.classList.add("hide-element"));
            sideNav.addEventListener("mouseover", () => handleMouseOver(maxSideNavWidth));
            sideNav.addEventListener("mouseleave", () => handleMouseLeave(minSideNavWidth));
        } else {
            document.documentElement.style.setProperty('--side-nav-width', maxSideNavWidth);
            collapsibleNavItems.forEach(item => item.classList.remove("hide-element"));
        }
    }
}

window.addEventListener("load", collapseNavItems);
window.addEventListener("resize", collapseNavItems);
