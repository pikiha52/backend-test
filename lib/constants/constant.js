const appName = process.env.APP_NAME
const appPort = process.env.PORT
const versionApp = process.env.VERSION
const apiKey = process.env.API_KEY

const createdData = 201
const successOk = 200
const notFound = 404
const badRequest = 400
const notMatch = 403
const notAuthorized = 401
const internalServerError = 500

const messageCreatedData = "Success created data"
const messageSuccessOk = "Success" 
const messageNotFound = "Failed, not found"
const messageBadRequest = "Failed, bad request!, please check payload!"
const messageInternalServError = "Something went wrong. Please try again later."

export {
    appName, appPort, versionApp, internalServerError, 
    createdData, successOk, notFound, badRequest, notAuthorized, 
    messageCreatedData, messageSuccessOk, messageNotFound,
    messageBadRequest, messageInternalServError, apiKey, notMatch
}