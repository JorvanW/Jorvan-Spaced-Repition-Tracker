import { getUserIds, getData, addData, clearData } from "./storage.js";

clearData("1");

const userSelect = document.querySelector("#users");
//Selects dropdown from .html
const revisionForm = document.querySelector("#revision-form");
const topicInput = document.querySelector("#topic");
const revisionDateInput = document.querySelector("#revision-date");

const agendaMessage = document.querySelector("#agenda-message");
const agendaList = document.querySelector("#agenda-list");

revisionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const topic = topicInput.value;
  const revisionDate = revisionDateInput.value;
  const startDate = new Date(revisionDate);
});

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
  agendaList.innerHTML = "";
  const userId = userSelect.value;
  const agenda = getData(userId);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!agenda || agenda.length === 0) {
    agendaMessage.textContent = "There are no topics scheduled for revision.";
    return;
  }

  const filteredAgenda = agenda.filter((item) => {
    return new Date(item.date) >= today;
  });

  filteredAgenda.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  if (filteredAgenda.length === 0) {
    agendaMessage.textContent = "There are no upcoming revisions scheduled.";
    return;
  }
  agendaMessage.textContent = "";

  filteredAgenda.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.topic} — ${item.date}`;

    agendaList.appendChild(listItem);
  });
}

displayAgenda();

userSelect.addEventListener("change", displayAgenda);
