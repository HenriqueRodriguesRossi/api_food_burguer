const router = require("express").Router()

router.post("/restaurant/new")

router.get("/restaurant/find/all")
router.get("/restaurant/find/:restaurant_id")

router.delete("/restaurant/delete/:restaurant_id")

module.exports = router