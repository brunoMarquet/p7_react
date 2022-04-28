const Sauce = require("../models/Sauce");
const fs = require("fs");
const xss = require("xss");
const folderPict = "imagesFolder/";

function editProp(sauceObject) {
  for (let key in sauceObject) {
    if (sauceObject.hasOwnProperty(key)) {
      console.log(key + " : " + sauceObject[key]);
    }
  }
}

function findSauce(idSauce) {
  return Sauce.findOne({ _id: idSauce });
}

exports.createSauce = (req, res) => {
  if (res.locals.userId) {
    const sauceObject = JSON.parse(req.body.sauce);

    editProp(sauceObject);

    editProp(req.file);
    console.log("______param_________");
    editProp(req.params);

    console.log("path " + req.file.filename);

    const sauce = new Sauce({
      ...sauceObject,
      description: `crée par user : ${res.locals.mail} , ${
        sauceObject.description
      } _date_ ${new Date()} !`,

      name: xss(sauceObject.name),
      /* si l'on veut verifier les entrées 

    
    manufacturer: xss(sauceObject.manufacturer),
    description: xss(sauceObject.description),
    mainPepper: xss(sauceObject.mainPepper), 
    */

      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
      //imageUrl: "toto.gif",
      likes: "0",
      dislikes: "0",
    });

    console.log(
      ` liens : ${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`
    );
    sauce
      .save()
      .then(() =>
        res
          .status(201)
          .json({ message: "Objet enregistré  par " + res.locals.mail })
      )
      .catch((error) => res.status(400).json({ error }));
  }
};

exports.getAllSauce = (req, res) => {
  if (res.locals.userId) {
    Sauce.find()
      .then((sauces) => {
        res.status(200).json(sauces);
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  }
};

exports.getOneSauce = (req, res) => {
  if (res.locals.userId) {
    const idSauce = req.params.id;
    findSauce(idSauce)
      .then((sauce) => {
        res.status(200).json(sauce);
      })
      .catch((error) => {
        res.status(404).json({
          error: error,
        });
      });
  }
};

exports.modifySauce = (req, res) => {
  if (res.locals.userId) {
    let sauceObject = "";
    if (req.file) {
      sauceObject = {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      };
    } else {
      sauceObject = { ...req.body }; //clone le body
    }

    if (req.file) {
      console.log(req.file);
    }

    const idSauce = req.params.id;
    findSauce(idSauce)
      .then((sauce) => {
        if (res.locals.userId === sauce.userId) {
          if (req.file) {
            const filename = sauce.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
              // Sauce.updateOne({ _id: idSauce }, { ...sauceObject, _id: idSauce })
              saveSauce(idSauce, sauceObject)
                .then(() =>
                  res
                    .status(200)
                    .json({ message: "Objet modifié par " + res.locals.mail })
                )
                .catch((error) => res.status(400).json({ error }));
            });
          } else {
            //Sauce.updateOne({ _id: idSauce }, { ...sauceObject, _id: idSauce })
            saveSauce(idSauce, sauceObject)
              .then(() =>
                res
                  .status(200)
                  .json({ message: "Objet modifié  par " + res.locals.mail })
              )
              .catch((error) => res.status(400).json({ error }));
          }
        } else {
          res.status(400).json({ message: "usersId n'a pas les droits !" });
          console.error("usersId pas ok");
        }
      })
      .catch((error) => res.status(500).json({ error }));
  }
};

exports.deleteSauce = (req, res) => {
  if (res.locals.userId) {
    const idSauce = req.params.id;

    findSauce(idSauce)
      .then((sauce) => {
        if (res.locals.userId === sauce.userId) {
          console.log("delete verif", idSauce);
          //console.log("usersId ok");
          const filename = folderPict + sauce.imageUrl.split("/images/")[1];
          if (fs.existsSync(filename)) {
            fs.unlinkSync(filename);
          } else {
            console.log("image non trouvée", filename);
          }

          Sauce.deleteOne({ _id: idSauce })
            .then(() =>
              res
                .status(200)
                .json({ message: "Objet supprimé par " + res.locals.mail })
            )
            .catch((error) => res.status(400).json({ error }));
        } else {
          res.status(403).json({ message: "usersId n'a pas les droits !" });
          console.log("usersId pas ok");
        }
      })
      .catch((error) => res.status(500).json({ error }));
  }
};

exports.voteSauce = (req, res) => {
  if (res.locals.userId) {
    let laNote = req.body.like; // 0,+1 ou -1
    let userId = req.body.userId;
    const idSauce = req.params.id;
    let leMessage = "";
    //saucePipo();

    findSauce(idSauce)
      .then((sauce) => {
        //const usersLiked = sauce.usersLiked;
        // const usersDisliked = sauce.usersDisliked;
        let usersAime = sauce.usersLiked;
        let usersAimePas = sauce.usersDisliked;
        let votePlus = sauce.likes;
        let voteMoins = sauce.dislikes;

        const jaime = usersAime.indexOf(userId);
        const jaimePas = usersAimePas.indexOf(userId);
        /**
         *  userVote: [0, -1],
         * logque inverse et "debile" ou en confusion du indexOf/-1 dislike
         * donc -1 on active le "bouton"
         * 
         * Par ailleurs le res en retour est surchargé avec :
         *  score: [votePlus, voteMoins],
                userVote: [0, -1],
         *pour avoir en front simple de "l'ajax"
         sinon 2 techniq possible
         on delegue à mongo db...
           // const jaime = usersAime.find((usersId) => usersId == userId);
         
           en js dans l' api 
          //const jaime = usersAime.indexOf(userId);
          donc  - dépendant



         */

        //const retour = gererNote(laNote, userId, usersAime, usersAimePas);
        if (laNote === 1 && jaime === -1) {
          //ajout dans Usersliked et +1 dans likes
          votePlus++;
          usersAime.push(userId);
          leMessage = res.locals.mail + "  aime";
          likeActu(idSauce, votePlus, usersAime)
            .then(() =>
              res.status(200).json({
                message: leMessage,
                score: [votePlus, voteMoins],
                userVote: [0, -1],
              })
            )
            .catch((error) => res.status(400).json({ error }));
        }
        if (laNote === -1 && jaimePas === -1) {
          //ajout dans Usersdisliked et +1 dans dislikes
          voteMoins++;
          usersAimePas.push(userId);
          leMessage = res.locals.mail + "  n'aime pas";

          disLikeActu(idSauce, voteMoins, usersAimePas)
            .then(() =>
              res.status(200).json({
                message: leMessage,
                score: [votePlus, voteMoins],
                userVote: [-1, 0],
              })
            )
            .catch((error) => res.status(400).json({ error }));
        }

        if (laNote === 0) {
          //si dans liked
          // if (jaime) {
          if (jaime !== -1) {
            //suppression dans Usersliked et -1 dans likes
            votePlus--;
            usersAime.splice(parseInt(jaime), 1);
            leMessage = res.locals.mail + "  n'aime plus";
            likeActu(idSauce, votePlus, usersAime)
              .then(() =>
                res.status(200).json({
                  message: leMessage,
                  score: [votePlus, voteMoins],
                  userVote: [-1, -1],
                })
              )
              .catch((error) => res.status(400).json({ error }));

            //si dans disliked
          } else if (jaimePas !== -1) {
            //suppression dans Usersdisliked et -1 dans dislikes
            voteMoins--;
            usersAimePas.splice(parseInt(jaimePas), 1);
            leMessage = res.locals.mail + " ne déteste plus";
            disLikeActu(idSauce, voteMoins, usersAimePas)
              .then(() =>
                res.status(200).json({
                  message: leMessage,
                  score: [votePlus, voteMoins],
                  userVote: [-1, -1],
                })
              )
              .catch((error) => res.status(400).json({ error }));
          }
        }
      })
      .catch((error) => {
        res.status(404).json({ error: error });
      });
  }
};

function likeActu(idSauce, votePlus, usersAime) {
  /*  console.log("votePlus: ", votePlus, " mess " );
  console.log("usersAime : ", usersAime); */
  return Sauce.updateOne(
    { _id: idSauce },
    {
      $set: {
        likes: votePlus,
        usersLiked: usersAime,
      },
    }
  );
}

function disLikeActu(idSauce, voteMoins, usersAimePas) {
  /*  console.log("voteMoins: ", voteMoins, " mess ");
  console.log("usersAimePas : ", usersAimePas); */
  return Sauce.updateOne(
    { _id: idSauce },
    {
      $set: {
        dislikes: voteMoins,
        usersDisliked: usersAimePas,
      },
    }
  );
}
function saveSauce(idSauce, sauce) {
  return Sauce.updateOne({ _id: idSauce }, { ...sauce, _id: idSauce });
}
/**----------------------------
 * 
ci dessous fonctions complémentaires 
 */

exports.getAllSauceByUser = (req, res) => {
  /**por editer les produits selon :
   * action === "creer", liker ou disliker ..
   */
  if (res.locals.userId) {
    const action = req.params.id.split("_")[0];
    const idUser = req.params.id.split("_")[1];
    //console.log(action, "...+...", idUser);

    Sauce.find()
      .then((sauces) => {
        if (action === "creer") {
          const lesSauces = findByUserCreate(idUser, sauces);
          res.status(200).json(lesSauces);
        }
        if (action === "liker") {
          const lesSauces = findByUserLiker(idUser, sauces);
          res.status(200).json(lesSauces);
        }
        if (action === "disliker") {
          const lesSauces = findByUserDisliker(idUser, sauces);
          res.status(200).json(lesSauces);
        }
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  }
};
/** 3 fonctions très simples de selection */

function findByUserCreate(idUser, sauces) {
  let lesSauces = [];
  for (sauce of sauces) {
    if (sauce.userId === idUser) {
      lesSauces.push(sauce);
    }
  }
  return lesSauces;
}
function findByUserLiker(idUser, sauces) {
  let lesSauces = [];
  for (sauce of sauces) {
    if (sauce.usersLiked.indexOf(idUser) !== -1) {
      lesSauces.push(sauce);
    }
  }
  return lesSauces;
}

function findByUserDisliker(idUser, sauces) {
  console.log("usersDisliked-----");
  let lesSauces = [];
  for (sauce of sauces) {
    if (sauce.usersDisliked.indexOf(idUser) !== -1) {
      lesSauces.push(sauce);
    }
  }
  return lesSauces;
}

/**fonction modifySauceLight altérée : sans prise en compte de l'image  */
exports.modifySauceLight = (req, res) => {
  if (res.locals.userId) {
    let sauceObject = "";
    // console.log(" testtt", req.body);
    sauceObject = { ...req.body };

    const idSauce = req.params.id;
    findSauce(idSauce)
      .then((sauce) => {
        if (res.locals.userId === sauce.userId) {
          //Sauce.updateOne({ _id: idSauce }, { ...sauceObject, _id: idSauce })
          saveSauce(idSauce, sauceObject)
            .then(() =>
              res.status(200).json({
                message: `${sauce.name} modifié  par ${res.locals.mail}`,
              })
            )
            .catch((error) => res.status(400).json({ error }));
        } else {
          res
            .status(400)
            .json({ message: `${res.locals.mail} n'a pas les droits !` });
          console.error(`${res.locals.mail} n'a pas les droits !`);
        }
      })
      .catch((error) => res.status(500).json({ error }));
  }
};
/* essai de file convertion jpeg...etc mais probablement pas adapté à une api */

exports.convertSaucePict = (req, res) => {
  console.log("sauces.imageUrl ", req.body);

  if (res.locals.userId) {
    Sauce.find()
      .then((sauces) => {
        for (sauce of sauces) {
          let name1 = sauce.imageUrl.split("/");
          name1 = name1[name1.length - 1];

          console.log("nom :", name1);
          //savePict(sauce.imageUrl);
        }
        res.status(200).json(message, "conversion ok");
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  }
};

async function savePict(thePict) {
  const tailleMax = 100;
  var Jimp = require("jimp");
  const image = await Jimp.read(thePict);
  const pictW = image.bitmap.width;
  const pictH = image.bitmap.height;
  //let PictScale = 1;
  let leMax = pictW >= pictH ? pictW : pictH;
  if (leMax > tailleMax) {
    PictScale = tailleMax / leMax;
    console.log("scale  ", PictScale);
    image.scale(PictScale);
  }
  //image.invert();
  image.sepia();
  filename = Math.floor(Math.random() * 10000) + "_" + Date.now();

  image.write("./imagesFolderNew/i_" + filename + ".jpeg");
}

/**midddleware pour tester les routes... */
exports.infodate = (req, res, next) => {
  //console.log(" en lecture rs  infodate-- (getAllSauce) : ", res.locals);
  next();
};
