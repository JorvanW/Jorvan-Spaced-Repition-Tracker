import { getUserIds, getData } from "./storage.js";

const userSelect = document.querySelector("#users");
//Selects dropdown from .html

const agendaMessage = document.querySelector("#agenda-message");
const agendaList = document.querySelector("#agenda-list");

function populateUserDropdown() {
  const users = getUserIds();
  //retrieves user

  users.forEach((userId) => {
    const option = document.createElement("option");

    option.value = userId;
    option.textContent = `User ${userId}`;

    userSelect.appendChild(option);
  });
}

populateUserDropdown();

userSelect.addEventListener("change", () => {
  console.log(getData(userSelect.value));
});

function displayAgenda() {
  const userId = userSelect.value;
  const agenda = getData(userId);

  if (!agenda || agenda.length === 0) {
    agendaMessage.textContent = "There are no topics scheduled for revision.";
    return;
  }
}

displayAgenda();

userSelect.addEventListener("change", displayAgenda);
