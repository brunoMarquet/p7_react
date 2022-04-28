const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");
const clefToken = "RANDOM_TOKEN_SECRET_101";
//const maskData = require("maskdata");
const passwordValidator = require("password-validator");
//const reglemail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const schemaPassValid = new passwordValidator();
/**schemaPassValid
 * parametre "légers pour la version test"
 */
schemaPassValid
  .is()
  .min(3, "minimum 3 characteres ") // Minimum length 3
  .not()
  .spaces(0, "Should not have spaces") //
  .has()
  .digits(1, "minimum 1 chiffre ")
  .is()
  .not()
  .oneOf(["000", "aaa"], '! "000", "aaa" sont Blacklistées :'); // Blacklist these values

const login = async (req, res) => {
  let unPsw = req.body["password"];
  let unPseudo = req.body["Pseudo"];
  console.dir(req.body);

  try {
    const Users = await prisma.persons.findMany({
      where: { Pseudo: unPseudo },
    });
    // if many ????
    console.log("trouve ", Users);

    if (Users.length === 1) {
      const unUser = Users[0];
      console.log(unPsw, unUser.PassWord);

      bcrypt
        .compare(unPsw, unUser.PassWord)
        .then((valid) => {
          console.log("Pwd valide  ", valid);
          if (!valid) {
            console.log("user+ Mot de passe " + unPsw + " incorrect NON ok!");
            return res
              .status(401)
              .json({ message: "Mot de passe : '" + unPsw + "' incorrect !" });
          } else {
            //valide
            console.log("user login  ok!");
            let jsonToken = {};
            if (unUser.isAdmin === 1) {
              const tokenAdmin =
                "$2b$10$YTlU3z2dUYomR788prmdWHZM.231WKOZNwbUL6dWN7Yr5iXZqzBLs1ca";
              jsonToken = {
                userPseudo: unPseudo,
                userId: unUser.Id_user,
                isAdmin: tokenAdmin,
              };
            } else
              jsonToken == { userPseudo: unPseudo, userId: unUser.Id_user };

            res.status(200).json({
              userId: unUser.Id_user,
              userPseudo: unPseudo,
              token: jwt.sign(
                { userPseudo: unPseudo, userId: unUser.Id_user },
                clefToken,
                {
                  expiresIn: "24h",
                }
              ),
            });
          }
        })

        .catch((error) => res.status(500).json({ error }));
    } else {
      res.json({ message: "Utilisateur '" + unPseudo + "' non trouvé !" });
    }
  } catch (error) {
    res.json({ message: "Utilisateur non trouvé Quoi 3333!" });
  }
};

const signUp = async (req, res) => {
  let unPsw = req.body["password"];
  let unPseudo = req.body["Pseudo"];
  let answer = "";

  console.dir(req.body);

  //console.log("test21 ", schemaPassValid.validate(unPsw, { details: true }));

  const testValid = schemaPassValid.validate(unPsw, { details: true });

  if (testValid.length !== 0) {
    console.log("erreurs ", testValid);

    //bloq = 1;
    res.status(401).json({
      messagePsw: testValid,
    });
  } else {
    try {
      const Users = await prisma.persons.findMany({
        where: { Pseudo: unPseudo },
      });
      if (Users.length !== 0) {
        // pseudo deja pris..
        answer = `pseudo ${unPseudo}deja pris !`;
        console.log(answer);

        res.status(401).json({
          message: answer,
        });
      } else {
        const id_user = Math.floor(Math.random() * 1000000);
        const hash = bcrypt.hashSync(unPsw, 10);
        const newUser = {
          Id_user: id_user,
          Pseudo: unPseudo,
          PassWord: hash,
        };
        console.log("a creer", newUser);

        try {
          const newPost = await prisma.persons.create({
            data: newUser,
          });
          newPost.PassWord = "";
          delete newPost["PassWord"];

          res.json({ person: newPost });
        } catch (error) {
          res.json({ error });
        }
      }
    } catch (error) {
      console.log("---uuu-- ", error);
      res.json({ error });
    }
  }
};

module.exports = { login, signUp };

/**verifReq
 *
 *
 *
 *pour verifier que le req.body contient..
 */

/**estValide
 *pour verifier en regex le mail ..
 
function isValid(value, regle) {
  return regle.test(value);
}


function verifReq(req) {
  if (req.body["password"] && req.body["email"]) {
    return true;
  }
}
*/

/* signup = (req, res) => {
  let answer = "";

  if (verifReq(req)) {
    const psw = req.body["password"];
    const mail = req.body["email"];
    console.log(`hello_sign_up! ${mail} pass ${psw}`);

    if (!schemaPassValid.validate(psw)) {
      answer = "mot de passe pas adapté !";
      console.log(answer);
      res.status(401).json({
        message: answer,
      });
    }
    if (!isValid(mail, reglemail)) {
      answer = "votre mail parait mauvais !";
      console.log(answer);
      res.status(401).json({
        message: answer,
      });
    }

    const d = new Date();
    let laDate = `${d.getDate()}_${d.getHours()}_${d.getMinutes()}_${d.getSeconds()}`;

    res.locals.mail = mail;

    bcrypt
      .hash(psw, 10)
      .then((hash) => {
        const user = new User({
          email: mail,
          password: hash,
          age: Math.floor(Math.random() * 40) + 18,
          date: laDate,
        });
        console.log("user à creer ???_ " + mail);
        user
          .save()
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    console.log("les paramètres ne collent pas !(req.body problème !)");
  }
}; */

//http://localhost:3100/api/users/login
