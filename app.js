let companyName = document.querySelector("#name");
let contactName = document.querySelector("#contact");
let contactTitle = document.querySelector("#title");
let head = document.querySelector("thead");
const button = document.querySelector("button");
const table = document.querySelector("tbody");
window.addEventListener("load", add);

function add() {
  table.innerHTML = "";
  axios.get("https://northwind.vercel.app/api/suppliers").then((res) => {
    const apiData = res.data;
    apiData.forEach((element) => {
      const newTr = document.createElement("tr");
      const apiId = element.id;

      let tdId = document.createElement("td");
      tdId.innerHTML = element.id;

      let tdCompanyName = document.createElement("td");
      tdCompanyName.innerHTML = element.companyName;

      let tdContactName = document.createElement("td");
      tdContactName.innerHTML = element.contactName;

      let tdContactTitle = document.createElement("td");
      tdContactTitle.innerHTML = element.contactTitle;

      let deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Delete";
      let editButton = document.createElement("button");
      editButton.innerHTML = "Edit";
      editButton.style.marginLeft = "10px";
      editButton.addEventListener("click", () => {
        companyName.value = element.companyName;
        contactName.value = element.contactName;
        contactTitle.value = element.contactTitle;
       
      });
      deleteButton.addEventListener("click", (e) => {
        removeEl(apiId);
      });
      newTr.appendChild(tdId);
      newTr.appendChild(tdCompanyName);
      newTr.appendChild(tdContactName);
      newTr.appendChild(tdContactTitle);
      newTr.appendChild(deleteButton);
      newTr.appendChild(editButton);
      table.prepend(newTr);
    });
  });
}
function removeEl(id) {
  axios
    .delete(`https://northwind.vercel.app/api/suppliers/${id}`)
    .then((res) => {
      if (res.status == 200) add();
    });
}

function postMethod() {
  let newCategory = {
    companyName: companyName.value,
    contactName: contactName.value,
    contactTitle: contactTitle.value,
  };
  axios
    .post("https://northwind.vercel.app/api/suppliers", newCategory)
    .then((res) => {
      add();
      clearInput();
    });
}
function clearInput() {
  companyName.value = "";
  contactName.value = "";
  contactTitle.value = "";
}
button.addEventListener("click", postMethod);
