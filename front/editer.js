function editPost(lespost) {
  let texte = "<h3>Les Posts</h3>";
  for (post of lespost) {
    let txtcomment = "";

    texte += `<article class='users' >(id : ${post.Post_id} postée le ${post.Date_post} ) <h2 id ='titre_${post.Post_id}'>${post.Titre}</h2>
        </div><p  id ='contenu_${post.Post_id}'>${post.Contenu}</p>
          <p>${txtcomment}</p>
          <button type="submit" onclick="deletePost( ${post.Post_id})">delete</button> 
        <button type="submit" onclick="modifPost( ${post.Post_id},${post.Post_user})">Modifier</button><div id="MessageModif_${post.Post_id}"></div>
         
    </article>`;
  }

  return texte;
}
function modifPost(Post_id, Post_user) {
  Titre = document.getElementById("titre_" + Post_id).innerHTML;
  Contenu = document.getElementById("contenu_" + Post_id).innerHTML;

  document.getElementById("MessageModif_" + Post_id).innerHTML = `toto
    Titre : <textarea id='theTitle_${Post_id}' rows="5" cols="40">${Titre}</textarea><br>
     Contenu <textarea id='theText_${Post_id}' rows="5" cols="40">${Contenu}</textarea><br>
    <button type="submit" onclick="modifPosValid( ${Post_id},${Post_user})">valider Modif</button>
    `;
  // "toto" + Titre + "<br>" + Contenu;
}
function editComments(res) {
  let texte = "<h3>Les Commentaires</h3>";
  for (comment of res) {
    let txtcomment = "";

    texte += `<article class='users'>(Commentaires :  ${comment.Text_com}<br>à propos du post:<h2>${comment.posts.Titre}</h2> 
          <p>${comment.posts.Contenu}</p>
     </article>`;
  }
  return texte;
}
function editUsers(res) {
  let texte = "";
  for (user of res) {
    texte += `<article class='users'>id : ${user.Id_user}<h2>${user.Pseudo}</h2>mails ${user.Email}
       </article>`;
  }
  return texte;
}

function editAllPost(res, IdUser) {
  let texte = "";

  for (const post of res) {
    if (post.likes.length !== 0) {
      console.log("likes ", post.likes.length);
      console.log("likes : ", post.likes);
    }
    let txtcomment = "";

    if (post.comments.length !== 0) {
      txtcomment = `<h3>${post.comments.length} commentaire(s)  </h3>`;
      for (const comm of post.comments) {
        txtcomment += `<h4>...  ${comm.persons.Pseudo} a écrit : </h4><p>...  ${comm.Text_com} le </p>
          `;
      }
    }
    let unVisuel = "";
    if (post.Post_visuel) {
      //console.log("100" + post.Post_visuel);
      unVisuel = ` <img src="http://localhost:3100/images/${post.Post_visuel} " alt="Grapefruits...">`;
    }

    texte += `<article class='users'>(id : ${post.Post_id} postée par ${post.persons.Pseudo}, son mail( ${post.persons.Email}) , le ${post.Date_post} ) <h2>${post.Titre}</h2>
    ${unVisuel} <button type="submit" onclick="showPostByUser(${post.persons.Id_user},'${post.persons.Pseudo}')">${post.persons.Pseudo}</button> <div id="22"></div><p>${post.Contenu}</p>
        <p>${txtcomment}</p> 
        <button type="submit" onclick="ajoutComment(${IdUser}, ${post.Post_id})">ajouter comment</button> <div id="22"></div> 
        <textarea name="commentaire" id ="commentaire_${post.Post_id}">votr ..</textarea>
  </article>`;
  }
  return texte;
}
function instorage() {
  const unGus = {
    Id_user: 11,
    Pseudo: "Sophie",
    Email: "sophie@mannia.fr",
    PassWord: "123",
  };

  localStorage.setItem("TheUser", JSON.stringify(unGus));
}

function preLog() {
  //event.preventDefault();
  const leMail = document.getElementById("pseudo").value;
  const lePsw = document.getElementById("psw").value;
  if (leMail !== "" && lePsw !== "") {
    myLog(leMail, lePsw);
  } else {
    alert("remplir les cases");
  }
}

async function myLog(nom, psw) {
  //console.log("hello :" + nom);
  const envoiPost = { Pseudo: nom, password: psw };
  let url = "http://localhost:3100/api/users/login";
  //url = "http://localhost:3100/loginTest";
  const method2 = "POST";
  const headers2 = { "Content-Type": "application/json" };
  const res = await DialogApiBody(url, method2, headers2, envoiPost);
  if (res) {
    document.getElementById("lesUsers").innerHTML = afficheRes(res);
  }
}
function afficheRes(res) {
  let tt = "";
  console.log("afficheRes: ", res);

  if (res.message) {
    tt = "message (erreur) " + res.message;
  }
  if (res.error) {
    tt = "message (erreur) " + res.error;
  }
  if (res.messagePsw) {
    tt = "le mot de passe pas au format correct ! ";

    for (const erreur of res.messagePsw) {
      tt += "<p>" + erreur.message + "</p>";
    }
  }
  if (res.person) {
    tt = `${res.person.Id_user}user connecte  ${res.person.Pseudo}`;
    console.log(res.person);
  }
  return tt;
}

async function mySign() {
  const lePseudo = document.getElementById("pseudo").value;
  const lePsw = document.getElementById("psw").value;
  if (lePseudo !== "" && lePsw !== "") {
    const envoiPost = { Pseudo: lePseudo, password: lePsw };
    let url = "http://localhost:3100/api/users/signUp";
    //url = "http://localhost:3100/signTest";
    const method2 = "POST";
    const headers2 = { "Content-Type": "application/json" };

    const res = await DialogApiBody(url, method2, headers2, envoiPost);

    //const res = { message: "Mot de passe : 'zzzz' incorrect !" };
    let tt = "";
    if (res) {
      console.log(res);

      if (res.message) {
        tt = "message (erreur) " + res.message;
      }
      if (res.error) {
        tt = "message (erreur) " + res.error;
      }
      if (res.messagePsw) {
        tt = "le mot de passe pas au format correct ! ";

        for (const erreur of res.messagePsw) {
          tt += "<p>" + erreur.message + "</p>";
        }
      }
      if (res.person) {
        tt = `${res.person.Id_user}user connecte  ${res.person.Pseudo}`;
        console.log(res.person);
      }
    }

    document.getElementById("lesUsers").innerHTML = tt;
  } else {
    alert("remplir les cases");
  }

  //console.log("hello :" + nom);
}

async function test254() {
  const url = "https://jsonplaceholder.typicode.com/todos";
  //const url = "http://vuesdoptiques.free.fr/data/todo.json";
  fetch(url)
    .then((res) => console.log(res.json()))

    .catch(function (error) {
      error;
    });
}

//  .then((res) => console.log(res.json())) promise..

function editTest22(lespost) {
  let texte = "<h3>Les Posts</h3>";
  for (const item of lespost) {
    texte += `<article class='users' >${item.title})</h3> </article>`;
  }

  alert(texte);
}

/*
// Fetch all posts in an Express route
app.get('/posts', async (req, res) => {
  const prisma = new PrismaClient()
  const posts = await prisma.post.findMany()
  res.json(posts)
})

 
  //console.log(`hello :  ${user[0]} , pass _:   ${user[1]} `);
  //localStorage.setItem("email", mail);
  const envoiPost = { Pseudo: nom, password: psw };
  let url = "http://localhost:3100/api/users/login";
  const method2= "POST";
  headers2= {"Content-Type": "application/json" }
const res = await DialogApiBody(url, method2, headers2, envoiPost)

} */
/**
   * Bearer toto_1002
   * §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
   *
   *
   * headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer toto_1002`,
    },
   *
   *
  

  fetch(url, {
    method: "POST",
    body: JSON.stringify(envoiPost),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())

    .then((res) => {
      console.log(res);

      editSauce(res);
    })
    .catch(function (error) {
      // alert(error);
      //console.log(error);
      document.getElementById("logInfo").innerHTML = "error";
      //console.log(error);
    });
     */
