const sideNavItemsColumn = document.querySelector(".side-nav-items");
const sideNavItems = ["Home", "Employee", "Career", "Leave & Travel", "Performance", "Discipline", "Loan", "Payroll", "Expense", "Admin", "Succession Plan", "Health and Safety", "Strategic Plan Warehousing", "Reports", "Exit"];

sideNavItemsColumn.innerHTML = sideNavItems.map((sideNavItem, key) => {
    return (
        `<div class="row" key=${key}>
            <span>${sideNavItem}</span>
        </div>`
    )
}).join("");