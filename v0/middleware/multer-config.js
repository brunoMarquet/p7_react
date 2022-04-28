const multer = require("multer");
const folderPict = "imagesFolder";

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/GIF": "gif",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, folderPict);
  },

  filename: (req, file, callback) => {
    let name = file.originalname.split(" ").join("_");
    name = name.split(".").slice(0, -1).join("_") + "_" + Date.now();
    /**
     * alternatives ou test
    
      Math.floor(Math.random() * 100000);
    
      de meme ajouter mais l'absence de webp provoque un bug 
      const MIME_TYPES = {"image/webp": "webp",
      et on ne peut pas etre exhaustif ?
 */
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");
