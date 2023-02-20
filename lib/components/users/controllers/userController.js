import response from "../../../utils/responses.js"
import {
    successOk, createdData, badRequest,
    internalServerError, messageSuccessOk,
    messageNotFound, messageBadRequest,
    messageCreatedData, messageInternalServError, notFound
} from "../../../constants/constant.js"

import { queryAllUsers, insertUsers, queryById, updateUsersService, deleteOneUsers } from "../services/usersService.js"
import { usersTable } from "../../../utils/prismaSchema.js"

const userStore = async (req, res) => {
    try {
        let formBody = req.body
        let name = formBody.hasOwnProperty('name') ? formBody.name : null
        let address = formBody.hasOwnProperty('address') ? formBody.address : null
        let email = formBody.hasOwnProperty('email') ? formBody.email : null
        let password = formBody.hasOwnProperty('password') ? formBody.password : null
        let photos = formBody.hasOwnProperty('photos') ? formBody.photos : null
        let creditcard_type = formBody.hasOwnProperty('creditcard_type') ? formBody.creditcard_type : null
        let creditcard_number = formBody.hasOwnProperty('creditcard_number') ? formBody.creditcard_number : null
        let creditcard_name = formBody.hasOwnProperty('creditcard_name') ? formBody.creditcard_name : null
        let creditcard_expired = formBody.hasOwnProperty('creditcard_expired') ? formBody.creditcard_expired : null
        let creditcard_cvv = formBody.hasOwnProperty('creditcard_cvv') ? formBody.creditcard_cvv : null

        if ((name == null) || (email == null) || (address == null) || (password == null) || (photos == null) || (creditcard_type == null) || (creditcard_expired == null)
            || (creditcard_cvv == null) || (creditcard_number == null) || (creditcard_name == null)
        ) {
            return response(res, badRequest, false, messageBadRequest)
        }

        let insertData = await insertUsers(formBody)
        return response(res, createdData, true, messageCreatedData, insertData)
    } catch (error) {
        return response(res, internalServerError, false, messageInternalServError)
    }
}

const userList = async (req, res) => {
    const { of, lt, q, ob, sb } = req.query;

    let params = {
        pagination: {
            take: of,
            page: lt
        },
        param: {
            sortBy: sb,
            query: q,
            object: ob
        }
    }

    const data = await queryAllUsers(usersTable, params);
    let datas = []
    let photos = {}
    data.data.forEach(item => {
        datas.push({
            user_id: item.id,
            name: item.name,
            email: item.email,
            address: item.address,
            photos,
            creditcard: {
                type: item.creditcard_type,
                number: item.creditcard_number,
                name: item.creditcard_name,
                expired: item.creditcard_expired
            }
        })
    });

    let payloads = {
        count: data.data.length,
        rows: datas
    }

    return response(res, successOk, true, "success", payloads)
}

const findUsersId = async (req, res) => {
    try {
        let data = await queryById(req)
        if (data == null) {
            return response(res, notFound, false, messageNotFound)
        }
        let photos = {}
        let datas = {
            user_id: data.id,
            name: data.name,
            email: data.email,
            address: data.address,
            photos,
            creditcard: {
                type: data.creditcard_type,
                number: data.creditcard_number,
                name: data.creditcard_name,
                expired: data.creditcard_expired
            }
        }

        let payloads = datas

        return response(res, successOk, true, messageSuccessOk, payloads)
    } catch (error) {
        console.log(error);
        return response(res, internalServerError, false, messageInternalServError)
    }
}

const updateUser = async (req, res) => {
    try {
        let data = await updateUsersService(req)

        if (data == false) {
             return response(res, badRequest, false, messageBadRequest)
        }

        return response(res, successOk, true, successOk)
    } catch (error) {
    console.log(error);
        return response(res, internalServerError, false, messageInternalServError)
    }
}


export {
    userStore, userList, findUsersId, updateUser
}