const router = require("express").Router()
const UserController = require("../controllers/UserController")

router.post("/users/new", UserController.newUser)
router.post("/users/login", UserController.login)

router.put("/alter/pass/:user_id", UserController.alterPass)

router.delete("/users/delete/account/:user_id", UserController.deleteAccount)

module.exports = router