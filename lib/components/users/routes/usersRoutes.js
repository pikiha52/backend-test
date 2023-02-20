import express from 'express'
import { userStore, userList, findUsersId, updateUser } from "../controllers/userController.js"
import { privateService } from '../midleware/privateService.js'
import { uploadFile } from '../midleware/uploadImage.js'
var router = express.Router()


router.get("/user/list", privateService, userList)
router.post("/user/register", privateService, userStore)
router.get("/user/:id", privateService, findUsersId)
router.patch("/user/:id", privateService, updateUser)

export { router }