const router=require("express").Router();

const controller=require("../../controller/upload_file/controller.js");

router.get("/pictures/:filename",controller.readImage);

module.exports=router;