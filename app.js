import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import logger from "morgan"

import { appName, appPort, versionApp, notFound, messageNotFound } from "./lib/constants/constant.js"
import response from './lib/utils/responses.js'


import { router as usersRoutes } from './lib/components/users/routes/usersRoutes.js';
import axios from 'axios'

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(logger('dev'));

let baseUrl = `/api/${versionApp}/${appName}`

app.use(`${baseUrl}`, usersRoutes)

app.use(function (req, res, next) {
    return response(res, notFound, false, messageNotFound)
});

app.listen(appPort, () => {
    console.log(`${appName} started on port`, appPort);
})
