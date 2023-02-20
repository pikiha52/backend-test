import { usersTable } from "../../../utils/prismaSchema.js"
import { findMany, insertOne, findUnique, updateOne, deleteOne } from "../../../utils/centralRepository.js"

const queryAllUsers = async (table, params) => {
    let data;
    if ((params.select != undefined) && (params.where != undefined)) {
        data = table.findMany({
            where: params.where,
            select: params.select,
        })

        return data
    }

    if ((params.select != undefined) && (params.pagination != undefined)) {
        const page = Number(params.pagination.page) || 1
        const perPage = Number(params.pagination.take) || 10
        const skip = page > 0 ? perPage * (page - 1) : 0

        let countData = await table.count();
        data = await table.findMany({
            select: params.select,
            take: perPage,
            skip
        })

        const lastPage = Math.ceil(countData / perPage)
        return {
            data,
            meta: {
                countData,
                lastPage,
                currentPage: page,
                perPage,
                prev: page > 1 ? page - 1 : null,
                next: page < lastPage ? page + 1 : null,
            },
        }
    }

    if (params.select) {
        data = table.findMany({
            select: params.select
        });

        return data;
    }

    if (params.pagination) {
        const page = Number(params.pagination.page) || 1
        const perPage = Number(params.pagination.take) || 10
        const skip = page > 0 ? perPage * (page - 1) : 0

        let countData = await table.count();

        let where = {}
        if (params.param.object == "name") {
            where = {
                name: {
                    contains: params.param.query
                }
            }
        } else if (params.param.object == "email") {
            where = {
                email: {
                    contains: params.param.query
                }
            }
        }

        data = await table.findMany({
            take: perPage,
            where,
            skip,
            orderBy: {
                id: params.param.sortBy,
            },
        })

        const lastPage = Math.ceil(countData / perPage)
        return {
            data,
            meta: {
                countData,
                lastPage,
                currentPage: page,
                perPage,
                prev: page > 1 ? page - 1 : null,
                next: page < lastPage ? page + 1 : null,
            },
        }
    }

    data = table.findMany();
    return data;
}

const insertUsers = async (payload) => {
    let params = {
        name: payload.name,
        address: payload.address,
        email: payload.email,
        password: payload.password,
        photos: payload.photos,
        creditcard_type: payload.creditcard_type,
        creditcard_number: payload.creditcard_number,
        creditcard_name: payload.creditcard_name,
        creditcard_expired: payload.creditcard_expired,
        creditcard_cvv: payload.creditcard_cvv,
    };

    const data = await insertOne(usersTable, params);
    return data
}

const queryById = async (req) => {
    let id = req.params.id
    let params = {
        id: Number(id)
    }

    const data = await findUnique(usersTable, params);
    return data
}

const updateUsersService = async (req) => {
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
        return false
    }

    let params = {
        id: Number(req.params.id),
        updateData: {
            name: name,
            address: address,
            email: email,
            password: password,
            photos: photos,
            creditcard_type: creditcard_type,
            creditcard_number: creditcard_number,
            creditcard_name: creditcard_name,
            creditcard_expired: creditcard_expired,
            creditcard_cvv: creditcard_cvv,
        }
    }

    const data = await updateOne(usersTable, params)
    return data
}

const deleteOneUsers = async (req) => {
    let params = {
        id: req.params.id
    }

    let data = await deleteOne(usersTable, params)
    return data
}

export {
    queryAllUsers, insertUsers, updateUsersService, queryById, deleteOneUsers
}