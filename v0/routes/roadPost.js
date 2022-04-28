const express = require("express");
const router = express.Router();

//const verif = require("../middleware/verif");
//const multer = require("../middleware/multer-config");

const ctrPost = require("../controllers/ctrPost");
router.get("/", ctrPost.getAllPost);

router.post("/", ctrPost.createPost);

router.put("/:id", ctrPost.updatePost);

router.delete("/:id", ctrPost.deletePost);
router.get("/userId/:id", ctrPost.showPostByUser);
/*

http://localhost:3100/api/posts/userId/
router.get("/", verif, sauceCtrl.infodate, sauceCtrl.getAllSauce);
router.get("/:id", verif, sauceCtrl.getOneSauce);
router.post("/", verif, multer, sauceCtrl.createSauce);

router.put("/:id", verif, multer, sauceCtrl.modifySauce);
router.delete("/:id", verif, sauceCtrl.deleteSauce);
router.post("/:id/like", verif, sauceCtrl.voteSauce);

//ajouts de routes tests pour le front html

router.get("/byUser/:id", verif, sauceCtrl.getAllSauceByUser);
router.put("/test/:id", verif, sauceCtrl.modifySauceLight);
*/
module.exports = router;
