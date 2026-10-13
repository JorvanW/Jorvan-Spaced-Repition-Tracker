import { getUserIds, getData, addData } from "./storage.js";

const userSelect = document.querySelector("#users");
//Selects dropdown from .html
const revisionForm = document.querySelector("#revision-form");
const topicInput = document.querySelector("#topic");
const revisionDateInput = document.querySelector("#revision-date");

const agendaMessage = document.querySelector("#agenda-message");
const agendaList = document.querySelector("#agenda-list");
const clearAgenda = document.querySelector("#clear-agenda");

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

revisionForm.addEventListener("submit", (event) => {
  event.preventDefault();
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

  clearAgenda.addEventListener("click", () => {
    const confirmed = confirm("Are you sure you want to clear your agenda?");

    if (confirmed) {
      const userId = userSelect.value;
      clearData(userId);
      displayAgenda();
    }
  });

  const startDate = new Date(revisionDate);
  const userId = userSelect.value;

  const oneWeekLater = new Date(startDate);
  oneWeekLater.setDate(startDate.getDate() + 7);

  const oneMonthLater = new Date(startDate);
  oneMonthLater.setMonth(startDate.getMonth() + 1);

  const threeMonthsLater = new Date(startDate);
  threeMonthsLater.setMonth(startDate.getMonth() + 3);

  const sixMonthsLater = new Date(startDate);
  sixMonthsLater.setMonth(startDate.getMonth() + 6);

  const oneYearLater = new Date(startDate);
  oneYearLater.setFullYear(startDate.getFullYear() + 1);

  const revisionItems = [
    { topic: topic, date: formatDate(oneWeekLater), interval: "1 week" },
    { topic: topic, date: formatDate(oneMonthLater), interval: "1 month" },
    { topic: topic, date: formatDate(threeMonthsLater), interval: "3 months" },
    { topic: topic, date: formatDate(sixMonthsLater), interval: "6 months" },
    { topic: topic, date: formatDate(oneYearLater), interval: "1 year" },
  ];

  addData(userId, revisionItems);
  displayAgenda();

  revisionForm.reset();
  revisionDateInput.value = formatDate(new Date());
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
    listItem.textContent = `${item.topic} — ${item.interval} — ${item.date}`;

    agendaList.appendChild(listItem);
  });
}

displayAgenda();

userSelect.addEventListener("change", displayAgenda);
