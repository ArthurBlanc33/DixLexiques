import config from "../config";
const apiKey = config.apiKey;

let token = localStorage.getItem('token') 

//A metre dans le API.JS ça
export const handleLogin = (myToken) => {
  console.log("Received token:", myToken);
  //setToken(myToken); 
  token = myToken;
  localStorage.setItem('token', token); // Store the token in localStorage
};

export const handleLogout = () => {
  token = "";
  localStorage.setItem('token', token); // Store the token in localStorage
};

// Fonction permettant de récupérer les info sur le parc
export const getMyParc = () => {
  return fetch("https://api.cogform.fr/parc", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Erreur");
    }
    return response.json();
  });
};





