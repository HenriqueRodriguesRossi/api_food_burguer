const router = require("express").Router()


router.post("/dishes/new/:restaurante_id")

router.get("/dishes/find/all")
router.get("/dishes/find/name")
router.get("/dishes/find/numero_de_pedidos")

router.put("/dishes/alter/foto")
router.put("/dishes/alter/valor")

router.delete("/dishes/delete/:dishe_id")

module.exports = router