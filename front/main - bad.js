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
function showPosts() {
  const IdUser = theUser.Id_user;

  let url = "http://localhost:3100/api/posts";
  let texte = "";
  fetch(url, { method: "GET" })
    .then((res) => res.json())

    .then((res) => {
      // afficher
      //localStorage.removeItem("sauceId");

      for (post of res) {
        if (post.likes.length !== 0) {
          console.log("likes ", post.likes.length);
          console.log("likes : ", post.likes);
        }
        let txtcomment = "";

        if (post.comments.length !== 0) {
          txtcomment = `<h3>${post.comments.length} commentaire(s)  </h3>`;
          for (comm of post.comments) {
            txtcomment += `<h4>...  ${comm.persons.Pseudo} a écrit : </h4><p>...  ${comm.Text_com} le </p>
            `;
          }
        }

        texte += `<article class='users'>(id : ${post.Post_id} postée par ${post.persons.Pseudo}, son mail( ${post.persons.Email}) , le ${post.Date_post} ) <h2>${post.Titre}</h2>
        <button type="submit" onclick="showPostByUser(${post.persons.Id_user},'${post.persons.Pseudo}')">${post.persons.Pseudo}</button> <div id="22"></div><p>${post.Contenu}</p>
          <p>${txtcomment}</p>
          <button type="submit" onclick="ajoutComment(${IdUser}, ${post.Post_id})">ajouter comment</button> <div id="22"></div> 
          <textarea name="commentaire" id ="commentaire_${post.Post_id}">votr ..</textarea>
 </article>`;
      }

      document.getElementById("lesUsers").innerHTML = texte;
      //return texte;
    })
    .catch(function (error) {
      document.getElementById("lesUsers").innerHTML = error;
      ///return error;
    });

/* 
function showPosts_____pourri() {
  const IdUser = theUser.Id_user;

  let url = "http://localhost:3100/api/posts";
  let texte = "";
  fetch(url, { method: "GET" })
    .then((res) => res.json())

    .then((res) => {
      const texte = await editAllPost(res);

      document.getElementById("lesUsers").innerHTML = texte;
    })
    .catch(function (error) {
      document.getElementById("lesUsers").innerHTML = error;
    });
} */

async function showOneUser(oneUser) {
  console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVVV OOOOOO ");
  let url = "http://localhost:3100/users/" + oneUser;
  let texte = "";
  const user = await getWhat(url);
  if (user) {
    texte += `<article class='users'>id : ${user.Id_user}<h2>${user.Pseudo}</h2>mails ${user.Email}
    psw : ${user.PassWord}
       </article>`;
  }
  document.getElementById("lesUsers").innerHTML = texte;
}
function createPost(IdUser) {
  const title = document.getElementById("theTitle").value;
  const texte = document.getElementById("theText").value;
  console.log(IdUser, title, texte);
  const envoiPost = { Post_user: IdUser, Titre: title, Contenu: texte };
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
  let texte1 = "TTT";
  let texte2 = "TTT";
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

function modifPosValid(Post_id, Post_user) {
  Titre = document.getElementById("theTitle_" + Post_id).value;
  Contenu = document.getElementById("theText_" + Post_id).value;
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
    });
}

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

//function debug0() {}


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

