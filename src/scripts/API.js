//cargando página...
const paginaloader = document.querySelector("#api-loading");
function loading() {
  paginaloader.classList.remove("loader_hidden");
}

function loaded() {
  paginaloader.classList.add("loader_hidden");
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
//patch Info
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

//patch Avatar
function userAPIPATCHAvatar(data) {
  loading();
  return fetch(
    "https://around-api.es.tripleten-services.com/v1/users/me/avatar",
    {
      method: "PATCH",
      headers: {
        authorization: "6e8faee7-cb36-424e-8723-26d1925bd141",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatarLink,
      }),
    },
  )
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loaded();
    });
}

//cartas
//get cartas
function cardsAPIGET() {
  loading();
  return fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
    headers: {
      authorization: "6e8faee7-cb36-424e-8723-26d1925bd141",
    },
  }).then((response) => response.json());
}
//post carta
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

//put-delete like
function cardsAPIToggleLike(id, isLiked) {
  const metodo = isLiked ? "DELETE" : "PUT";
  return fetch(
    `https://around-api.es.tripleten-services.com/v1/cards/${id}/likes`,
    {
      method: metodo,
      headers: {
        authorization: "6e8faee7-cb36-424e-8723-26d1925bd141",
        "Content-Type": "application/json",
      },
    },
  ).then((response) => response.json());
}

//Delete carta
function cardsAPIDelete(id) {
  fetch(`https://around-api.es.tripleten-services.com/v1/cards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: "6e8faee7-cb36-424e-8723-26d1925bd141",
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

export {
  loaded,
  userAPIGET,
  userAPIPATCH,
  userAPIPATCHAvatar,
  cardsAPIGET,
  cardsAPIPOST,
  cardsAPIToggleLike,
  cardsAPIDelete,
};
