const router=require("express").Router();

router.use("/users",require("./users/route"));
router.use("/users_account",require("./users_account/route"));
router.use("/roles",require("./roles/route"));
router.use("/permission",require("./permissions/route"));
router.use("/barang",require("./barang/route"));
router.use("/kurir",require("./kurir/route"));
router.use("/files",require("./upload_file/route"))

module.exports=router;