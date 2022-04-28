//const { init } = require("../v0/app");

//instorage();
let theUser = "";
init();

function init() {
  theUser = JSON.parse(localStorage.getItem("TheUser"));
}
function getWhat(url) {
  //let url = "http://localhost:3100/posts";
  leToken = "toto";
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${leToken}`,
    },
  })
    .then((res) => res.json())
    .catch(function (error) {
      error;
    });
}
function DialogApi(url, method2, headers2) {
  //let url = "http://localhost:3100/posts";
  //leToken = "toto";
  return fetch(url, {
    method: method2,

    headers: headers2,
  })
    .then((res) => res.json())
    .catch(function (error) {
      error;
    });
}
function DialogApiBody(url, method2, headers2, body2) {
  //let url = "http://localhost:3100/posts";
  //leToken = "toto";
  // const body2 = JSON.stringify(envoiPut);
  console.dir(JSON.stringify(body2));
  return fetch(url, {
    method: method2,
    body: JSON.stringify(body2),
    headers: headers2,
  })
    .then((res) => res.json())
    .catch(function (error) {
      error;
    });
}

async function showUsers() {
  let url = "http://localhost:3100/api/users";
  const method2 = "GET";
  const leToken = "tata";
  const headers2 = {
    Authorization: `Bearer ${leToken}`,
  };

  let texte = "";
  //const res = await getWhat(url);
  const res = await DialogApi(url, method2, headers2);
  if (res) {
    document.getElementById("lesUsers").innerHTML = editUsers(res);
  }
}

async function showPosts() {
  const IdUser = theUser.Id_user;

  let url = "http://localhost:3100/api/posts";
  const method2 = "GET";
  const leToken = "tata";
  const headers2 = {
    Authorization: `Bearer ${leToken}`,
  };

  const res = await DialogApi(url, method2, headers2);
  if (res) {
    console.log("7899999999");
    document.getElementById("lesUsers").innerHTML = editAllPost(res, IdUser);
  }
}

/* async function showOneUser(oneUser) {
  let url = "http://localhost:3100/users/" + oneUser;
  let texte = "";
  const user = await getWhat(url);
  if (user) {
    texte += `<article class='users'>id : ${user.Id_user}<h2>${user.Pseudo}</h2>mails ${user.Email}
    psw : ${user.PassWord}
       </article>`;
  }
  document.getElementById("lesUsers").innerHTML = texte;
} */
function createPost(IdUser) {
  const title = document.getElementById("theTitle").value;
  const texte = document.getElementById("theText").value;
  console.log(IdUser, title, texte);
  const envoiPost = {
    Post_user: IdUser,
    Titre: title,
    Contenu: texte,
    Date_post: new Date(),
  };
  let leToken = "toto";
  //localStorage.getItem("token");

  let url = `http://localhost:3100/api/posts/`;

  fetch(url, {
    method: "POST",
    body: JSON.stringify(envoiPost),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${leToken}`,
    },
  })
    .then((res) => res.json())

    .then((res) => {
      console.log(res);
    })
    .catch(function (error) {
      alert(error);
    });
}

async function showPostByUser(oneUser, userName) {
  let texte0 = ` <h2>${userName}</h2><div id="addPost">
  <p>Ajouter un post ?</p>
  Titre : <textarea id='theTitle'>votre titre.. </textarea><br>
   Contenu <textarea id='theText'>votre contenu...</textarea><br>
   <button type="submit" onclick="createPost(${oneUser})">Poster</button>


    ...</div>
  `;
  let texte1 = "";
  let texte2 = "";
  ///modif mot de pass

  ////
  let url = "http://localhost:3100/api/posts/userId/" + oneUser;
  const res = await getWhat(url);
  if (res) {
    texte1 = editPost(res);
  }
  url = "http://localhost:3100/api/comments/userId/" + oneUser;
  const res2 = await getWhat(url);
  if (res2) {
    texte2 = editComments(res2);
    console.log(res2);
  }

  document.getElementById(
    "lesUsers"
  ).innerHTML = `${texte0}${texte1} ${texte2}`;
}

async function modifPosValid(Post_id, Post_user) {
  Titre = document.getElementById("theTitle_" + Post_id).value;
  time1 = new Date().toLocaleTimeString();

  Contenu = `${
    document.getElementById("theText_" + Post_id).value
  } (modifié le ${time1} )`;

  //console.log(Titre, Contenu);

  const envoiPut = {
    Post_user: Post_user,
    Titre: Titre,
    Contenu: Contenu,
  };
  console.log(envoiPut);

  // return;
  let leToken = "toto";
  //localStorage.getItem("token");
  //api/postsDelete
  let url = `http://localhost:3100/api/posts/` + Post_id;
  method2 = "PUT";
  headers2 = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${leToken}`,
  };
  const res = await DialogApiBody(url, method2, headers2, envoiPut);
  /* 
  fetch(url, {
    method: "PUT",
    body: JSON.stringify(envoiPut),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${leToken}`,
    },
  })
    .then((res) => res.json())

    .then((res) => {
      console.log(res);
    })
    .catch(function (error) {
      alert(error);
    }); */
}
//********** */

async function modifUserValid(user_id, user_psw) {
  const envoiPut = { test: user_id, PassWord: user_psw };

  console.log(envoiPut);

  let leToken = "toto";

  let url = `http://localhost:3100/api/users/` + user_id;
  method2 = "PUT";
  headers2 = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${leToken}`,
  };
  const res = await DialogApiBody(url, method2, headers2, envoiPut);
}

/*** */

function deletePost(idpost, idUser) {
  console.log("deletePost ", idpost, idUser);
  //app.delete("/posts/:id"
  let url = "http://localhost:3100/api/posts/" + idpost;
  const method2 = "DELETE";
  const leToken = idUser;
  const headers2 = {
    Authorization: `Bearer ${leToken}`,
  };

  let texte = "";

  fetch(url, {
    method: "DELETE",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${leToken}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch(function (error) {
      alert(error);
    });

  //const res = await DialogApi(url, method2, headers2);
}

function ajoutComment(user, comment) {
  console.log("bof ", user, comment);
  let commentaire = document.getElementById("commentaire_" + comment).value;

  let url = "http://localhost:3100/comments/create";

  fetch(url, { method: "POST" })
    .then((res) => res.json())

    .then((res) => {
      // afficher
    })
    .catch(function (error) {
      document.getElementById("lesUsers").innerHTML = error;
      ///return error;
    });
}
function debugUserAll() {
  txt = "";
  for (user of users) {
    console.dir(user.Pseudo + ", " + user.PassWord);
    txt += `  <button type="submit" onclick="modifUserValid(${user.Id_user}, ${user.PassWord})">${user.Pseudo}</button> <hr>`;
    //"button type='submit' onclick='modifUserValid("+user.Pseudo "+,"+ a111")'>"+user.Pseudo "+</button> <hr>"
    //await modifUserValid(user.Pseudo, "a" + user.PassWord);

    //modifUserValid(user.Pseudo, "a" + user.PassWord);

    //debugUser0(user.Pseudo, user.PassWord);
  }
  document.getElementById("lesUsers").innerHTML = txt;
}

async function debugUser0(id, pwd) {
  let url = "http://localhost:3100/debug3";
  const method2 = "POST";
  const leToken = "tata";
  const envoiPut = {
    Id_user: id,
    PassWord: pwd,
  };
  console.log(envoiPut);

  const headers2 = {
    Authorization: `Bearer ${leToken}`,
  };
  const body2 = JSON.stringify(envoiPut);

  let texte = "";
  // debugUser();
  //return;
  const res = await DialogApiBody(url, method2, headers2, body2);
  if (res) {
    console.log(res);
  }
}

async function debug0() {
  let url = "http://localhost:3100/debug1";
  const method2 = "GET";
  const leToken = "tata";

  const headers2 = {
    Authorization: `Bearer ${leToken}`,
  };

  let texte = "";
  //debugUser();
  // return;
  const res = await DialogApi(url, method2, headers2);
  if (res) {
    //document.getElementById("lesUsers").innerHTML = editUsers(res);
    console.log(res);
    /* tt = "";
    for (user of res) {
      tt += user.Pseudo;
    }
    console.log(tt); */
  }
}
async function test66666_vide() {
  //a revoir
  let url = "http://localhost:3100/close";
  const method2 = "GET";
  const headers2 = {};
  const body2 = {};
  console.log(url);

  const res = await DialogApiBody(url, method2, headers2, body2);
  if (res) {
    console.log(res);
  }
}

async function debug2() {
  let url = "http://localhost:3100/debug3";
  const method2 = "POST";
  const leToken = "tata";
  const headers2 = {
    Authorization: `Bearer ${leToken}`,
  };
  const body2 = {
    Id_user: 30,
    PassWord: "titi",
  };
  console.log(url);

  const res = await DialogApiBody(url, method2, headers2, body2);
  if (res) {
    console.log(res);
  }
}

/**
BON 
 // a = new Date().toISOString().slice(0, 19).replace("T", " "); 


 * console.log("truc ", new Date().toISOString().slice(0, 19).replace("T", " "));
  console.log("truc22", new Date().toLocaleTimeString());
function showOneUsers(unId) {
  //return;
  // pas bon
  let url = "http://localhost:3100/oneUser/" + unId;
  let texte = "";
  fetch(url, { method: "GET" })
    .then((res) => res.json())

    .then((res) => {
      texte += `<article class='users'>id : ${user.Id_user}<h2>${user.Pseudo}</h2>mails ${user.Email}
       </article>`;

      document.getElementById("lesUsers").innerHTML = texte;
    })
    .catch(function (error) {
      document.getElementById("lesUsers").innerHTML = error;
      ///return error;
    });
}*/
