const timeSheetTable = document.querySelector(".time-sheet-table");
const headers = ["S/N", "Name", "Company", "Department", "Task Date", "Task Title", "Time Spent", "Manager's Remark", "Status", "View"];
const rows = [];

const handleShowModal = () => {

}

timeSheetTable.innerHTML = rows.length > 0 ? (
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
            <p>When Ofofon logs his timesheet, they will show up here</p>
        </div>
        <div class="cta-box">
            <button onclick="handleShowModal()">
                <span>Add New Time Sheet</span>
            </button>
        </div>
    </div>`
)