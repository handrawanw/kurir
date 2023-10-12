const router=require("express").Router();

const controller=require("../../controller/kurir/controller.js");

const v_request=require("../../schemas/kurir/kurir.validate.js");
const validate=require("../../middleware/validate_joi.js");

const auth=require("../../middleware/auth.js");

router.get("/",auth.authjwt,controller.listUsers);
router.post("/job/:id_users",auth.authjwt,controller.approvedJob);
router.put("/job_finished",auth.authjwt,controller.jobFinished);

module.exports=router;
