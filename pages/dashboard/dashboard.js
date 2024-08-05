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
            <i class="fa-solid fa-greater-than drop-down"></i>
        </div>
    `;
}).join("");
