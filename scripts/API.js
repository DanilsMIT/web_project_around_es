//cargando página...
const loader = document.querySelector("#loading");
function loading() {
  loader.classList.remove("loader_hidden");
}

function loaded() {
  loader.classList.add("loader_hidden");
}
//usuario
//get
function userAPIGET() {
  loading();
  return fetch("https://around-api.es.tripleten-services.com/v1/users/me", {
    headers: {
      authorization: "6e8faee7-cb36-424e-8723-26d1925bd141",
    },
  }).then((response) => response.json());
}
//patch
function userAPIPATCH(data) {
  loading();
  return fetch("https://around-api.es.tripleten-services.com/v1/users/me", {
    method: "PATCH",
    headers: {
      authorization: "6e8faee7-cb36-424e-8723-26d1925bd141",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.profileName,
      about: data.profileAbout,
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loaded();
    });
}

//cartas
//get
function cardsAPIGET() {
  loading();
  return fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
    headers: {
      authorization: "6e8faee7-cb36-424e-8723-26d1925bd141",
    },
  }).then((response) => response.json());
}
//post
function cardsAPIPOST(data) {
  loading();
  return fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
    method: "POST",
    headers: {
      authorization: "6e8faee7-cb36-424e-8723-26d1925bd141",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.cardName,
      link: data.cardLink,
    }),
  }).then((response) => response.json());
}

export { loaded, userAPIGET, userAPIPATCH, cardsAPIGET, cardsAPIPOST };
