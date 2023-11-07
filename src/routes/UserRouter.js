const router = require("express").Router()

router.post("/users/new")
router.post("/users/login")

router.put("/alter/pass/:user_id")

router.delete("/users/delete/account")

module.exports = router