const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");
//const xss = require("xss");
//if (res.locals.userId)

exports.getAllPost = async (req, res) => {
  try {
    const posts = await prisma.posts.findMany({
      include: {
        persons: { select: { Id_user: true, Pseudo: true, Email: true } },
        comments: {
          include: { persons: { select: { Id_user: true, Pseudo: true } } },
        },
        likes: { include: { persons: { select: { Id_user: true } } } },
      },
    });

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

exports.createPost = async (req, res, next) => {
  // res.json({ create: "??" });

  try {
    const newPost = await prisma.posts.create({
      data: req.body,
    });

    res.json(newPost);
  } catch (error) {
    res.json({ error });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const idPost = Number(req.params.id);
    const datas = req.body;
    console.log("put ", datas);

    const modifPosts = await prisma.posts.update({
      where: {
        Post_id: idPost,
      },
      data: datas,
    });
    res.json(modifPosts);
  } catch (error) {
    res.json({ error });
  }
};
exports.deletePost = async (req, res) => {
  try {
    const idPost = Number(req.params.id);

    const deletePosts = await prisma.posts.delete({
      where: {
        Post_id: idPost,
      },
    });
    res.json(deletePosts);
  } catch (error) {
    res.json({ error });
  }
};
exports.showPostByUser = async (req, res) => {
  try {
    const idUser = Number(req.params.id);

    const allPosts = await prisma.posts.findMany({
      where: { Post_user: idUser },
    });
    res.json(allPosts);
  } catch (error) {
    res.json({ error });
  }
};
