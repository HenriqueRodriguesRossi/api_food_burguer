const router = require("express").Router()
const upload = require("../utils/multer")
const checkRestauranteToken = require("../utils/checkRestauranteToken")

router.post("/dishes/new/:restaurante_id",checkRestauranteToken, upload.single("foto"))

router.get("/dishes/find/all")
router.get("/dishes/find/nome")
router.get("/dishes/find/numero_de_pedidos", checkRestauranteToken, )

router.put("/dishes/alter/foto", checkRestauranteToken, )
router.put("/dishes/alter/valor", checkRestauranteToken, )

router.delete("/dishes/delete/:dishe_id")

module.exports = router