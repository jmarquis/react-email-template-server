import path from "path"

import express from "express"
import bodyParser from "body-parser"

import React from "react"
import ReactDOMServer from "react-dom/server"

import { log, logError } from "./etc/logger"
import handleError from "./etc/handleError"

const app = express()
app.use(bodyParser.json())

// browser interface
app.get("/", (request, response) => {
  response.send("hey")
})

// email template rendering
app.post("/render/:template", (request, response) => {

  log(`Rendering template: ${request.params.template}`)

  try {

    const HtmlEmailComponent = require(path.join(__dirname, "templates", request.params.template, `${request.params.template}.html.jsx`)).default
    const generatePlainTextEmail = require(path.join(__dirname, "templates", request.params.template, `${request.params.template}.text.js`)).default

    try {
      response.send({
        html: ReactDOMServer.renderToStaticMarkup(<HtmlEmailComponent {...request.body.data} />),
        text: generatePlainTextEmail(request.body.data).trim()
      })
    } catch (error) {
      const message = `Error rendering template: ${request.params.template}`
      logError(message, error.stack)
      return response.status(500).send({
        error: message,
        stack: error.stack
      })
    }

  } catch (error) {
    if (error.message.indexOf("Cannot find module") > -1) {
      const message = `Template not found: ${request.params.template}`
      logError(message, error.stack)
      return response.status(404).send({
        error: message,
        stack: error.stack
      })
    } else {
      const message = `Error rendering template: ${request.params.template}`
      logError(message, error.stack)
      return response.status(500).send({
        error: message,
        stack: error.stack
      })
    }
  }

})

app.listen(4000, () => {
  log("Server listening on port 4000...")
})
