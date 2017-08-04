import path from "path"

import express from "express"
import bodyParser from "body-parser"

import React from "react"
import ReactDOMServer from "react-dom/server"

const app = express()
app.use(bodyParser.json())

// browser interface
app.get("/", (request, response) => {
  response.send("hey")
})

// email rendering
app.post("/email/:email", (request, response) => {

  console.log("Rendering email: " + request.params.email)

  const EmailComponent = require(path.join(__dirname, "emails", request.params.email + ".jsx")).default

  response.send(ReactDOMServer.renderToStaticMarkup(<EmailComponent {...request.body} />))

})

app.listen(4000, () => {
  console.log("Server listening on port 4000...")
})
