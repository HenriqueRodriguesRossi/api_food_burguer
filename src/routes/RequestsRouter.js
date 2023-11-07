const router = require("express").Router()

router.post("/request/new/:user_id")

router.get("/request/find/all/:restaurant_id")
router.get("/request/find/all/:user_id")

router.put("/request/alter/quantity/:request_id")
router.put("/request/alter/adress/:request_id")

router.delete("/request/delete/:request_id")

module.exports = router