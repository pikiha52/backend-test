import response from "../../../utils/responses.js"
import {
    successOk, createdData, badRequest,
    internalServerError, messageSuccessOk,
    messageNotFound, messageBadRequest,
    messageCreatedData, messageInternalServError, notFound
} from "../../../constants/constant.js"

import { queryAllUsers, insertUsers, queryById, updateUsersService, deleteOneUsers } from "../services/usersService.js"

const users = async (req, res) => {
    try {
        let data = await queryAllUsers()

        if (data.length < 1) {
            return response(res, notFound, false, messageNotFound, [])
        }

        return response(res, successOk, true, messageSuccessOk, data)
    } catch (error) {
        return response(res, internalServerError, false, messageInternalServError)
    }
}

const userStore = async (req, res) => {
    try {
        let formBody = req.body
        let name = formBody.hasOwnProperty('name') ? formBody.name : null
        let email = formBody.hasOwnProperty('email') ? formBody.email : null
        let phone_number = formBody.hasOwnProperty('phone_number') ? formBody.phone_number : null
        let role_id = formBody.hasOwnProperty('role_id') ? formBody.role_id : null

        if ((name == null) || (email == null) || (phone_number == null) || (role_id == null)) {
            return response(res, badRequest, false, messageBadRequest)
        }

        let insertData = await insertUsers(formBody)
        return response(res, createdData, true, messageCreatedData, insertData)
    } catch (error) {
        return response(res, internalServerError, false, messageInternalServError)
    }
}

const findUsers = async (req, res) => {
    try {
        let data = await queryById(req)
        if (data == null) {
            return response(res, notFound, false, messageNotFound)
        }

        return response(res, successOk, true, messageSuccessOk, data)
    } catch (error) {
        return response(res, internalServerError, false, messageInternalServError)
    }
}

const updateUsers = async (req, res) => {
    try {
        let data = await updateUsersService(req)

        if (data == false) {
             return response(res, badRequest, false, messageBadRequest)
        }

        return response(res, successOk, true, successOk, data)
    } catch (error) {
        return response(res, internalServerError, false, messageInternalServError)
    }
}

const deleteUser = async (req, res) => {
    try {
        let data = await deleteOneUsers(req)
        return response(res, successOk, true, messageSuccessOk)
    } catch (error) {
        return response(res, internalServerError, false, messageInternalServError)
    }
}


export {
    users, userStore, findUsers, updateUsers, deleteUser
}