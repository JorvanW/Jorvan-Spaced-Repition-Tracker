import { getUserIds } from "./storage.js";

const userSelect = document.querySelector("#users");
//Selects dropdown from .html

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
