import { getUserIds, formatDate, calculateRevisionDates } from "./common.js";
import { getData, addData, clearData } from "./storage.js";

const userSelect = document.querySelector("#users");
//Selects dropdown from .html
const revisionForm = document.querySelector("#revision-form");
const topicInput = document.querySelector("#topic");
const revisionDateInput = document.querySelector("#revision-date");

const agendaMessage = document.querySelector("#agenda-message");
const agendaList = document.querySelector("#agenda-list");
const clearAgenda = document.querySelector("#clear-agenda");

revisionForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!userSelect.value) {
    alert("Please select a user first.");
    return;
  }

  const topic = topicInput.value.trim();

  if (topic === "") {
    alert("Please enter a topic.");
    return;
  }

  const revisionDate = revisionDateInput.value;

  if (revisionDate === "") {
    alert("Please select a revision date.");
    return;
  }

  const userId = userSelect.value;

  const revisionItems = calculateRevisionDates(revisionDate).map(
    ({ date, interval }) => ({
      topic,
      date,
      interval,
    }),
  );

  addData(userId, revisionItems);
  displayAgenda();

  revisionForm.reset();
  revisionDateInput.value = formatDate(new Date());
});
clearAgenda.addEventListener("click", () => {
  if (!userSelect.value) {
    alert("Please select a user first.");
    return;
  }
  const confirmed = confirm("Are you sure you want to clear your agenda?");

  if (confirmed) {
    const userId = userSelect.value;
    clearData(userId);
    displayAgenda();
  }
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

function displayAgenda() {
  agendaList.innerHTML = "";
  const userId = userSelect.value;

  if (!userId) {
    agendaMessage.textContent = "Please select a user to view their agenda.";
    return;
  }
  const agenda = getData(userId);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!agenda || agenda.length === 0) {
    agendaMessage.textContent = "There are no topics scheduled for revision.";
    return;
  }

  const todayString = formatDate(today);

  const filteredAgenda = agenda.filter((item) => {
    return item.date >= todayString;
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
    listItem.textContent = `${item.topic} — ${item.interval} — ${item.date}`;

    agendaList.appendChild(listItem);
  });
}
revisionDateInput.value = formatDate(new Date());

displayAgenda();

userSelect.addEventListener("change", displayAgenda);
