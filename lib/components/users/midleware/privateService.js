import { apiKey, notMatch, notAuthorized } from "../../../constants/constant.js"
import response from "../../../utils/responses.js"

const privateService = async (req, res, next) => {
    if (!req.headers.hasOwnProperty('api_key')) {
        return response(res, notMatch, false, "API key is missing.")
    }

    if (req.headers.api_key != apiKey) {
        return response(res, notAuthorized, false, "Invalid API key.")
    }

    next()
}


export {
    privateService
}