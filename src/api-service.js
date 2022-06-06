//Listes des méthodes permattant d'exploiter l'API
//import * as api from "./../../api-service"

//CRUD user

export const getUsers = async (url) => {
  fetch(url);
};

export const postUser = async (url, data) => {
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

//CRUD Tags


