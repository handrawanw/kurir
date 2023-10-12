const router=require("express").Router();

const controller=require("../../controller/barang/controller.js");

const auth=require("../../middleware/auth.js");

const v_request=require("../../schemas/barang/barang.validate.js");
const validate=require("../../middleware/validate_joi.js");

const upload=require("../../helper/upload_barang.js");

router.get("/",auth.authjwt,controller.listBarang);
router.post("/create",auth.authjwt,upload.single("pictures"),controller.createBarang);
router.put("/update/:id_barang",auth.authjwt,upload.single("pictures"),controller.updateBarang);
router.delete("/delete/:id_barang",auth.authjwt,controller.deleteBarang);

module.exports=router;
