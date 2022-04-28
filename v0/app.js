/*
http://localhost:3100/users

*/
const express = require("express");

const path = require("path");

console.log("start : ", new Date().toLocaleTimeString());

const folderPict = "../folderPict2"; // "imagesFolder";

const { PrismaClient } = require("@prisma/client");

//const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const app = express();

//const helmet = require("helmet");
//app.use(helmet({ crossOriginResourcePolicy: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

const userRoutes = require("./routes/roadUser");

const postRoutes = require("./routes/roadPost");

app.use("/api/posts", postRoutes);

app.use("/api/users", userRoutes);

app.use("/images", express.static(path.join(__dirname, folderPict)));

//comments/userId
app.get(`/api/comments/userId/:id`, async (req, res) => {
  try {
    const idUser = Number(req.params.id);

    const allcomments = await prisma.comments.findMany({
      where: { User_com: idUser },
      include: { posts: true },
    });
    res.json(allcomments);
  } catch (error) {
    res.json({ error });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await prisma.persons.findMany();

    res.json(users);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

app.get(`/users/:id`, async (req, res) => {
  try {
    const idUser = Number(req.params.id);

    const unUser = await prisma.persons.findUnique({
      where: { Id_user: idUser },
    });
    console.log("idUser qui  ", unUser);

    res.json(unUser);
  } catch (error) {
    res.json({ error });
  }
});
/**------debug1----- */

app.post("/debug3", async (req, res) => {
  try {
    const Id_user = req.body.Id_user;
    let pass = req.body.PassWord;

    const hash = "hello" + pass;
    //bcrypt.hashSync(pass, 10);

    const datas = { PassWord: hash };
    console.log(datas);

    const modifPosts = await prisma.persons.update({
      where: {
        Id_user: Id_user,
      },
      data: datas,
    });
    res.json(modifPosts);
  } catch (error) {
    res.json({ error });
  }
});

module.exports = app;
