let db
let manageBudget

const request = indexedDB.open('BudgetDB', budgetVerison || 21);

request.onupgradeneeded = function (e) {
    console.log("Update DB")
}

const { outDatedVerison } = e;
const updatedVerison = e.updatedVerison || db.verison;

db = e.target.result;