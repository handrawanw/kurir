const router=require("express").Router();

const controller=require("../../controller/users/controller.js");

const v_request=require("../../schemas/users/users.validate.js");
const validate=require("../../middleware/validate_joi.js");

const auth = require("../../middleware/auth.js");

const { upload_avatar } = require("../../helper/upload_file.js");

router.post("/login",controller.login);

router.put("/update",auth.authjwt,upload_avatar.single("avatar"),controller.updateAccount);

router.post("/change_password",auth.authjwt,controller.changePassword);

module.exports=router;
