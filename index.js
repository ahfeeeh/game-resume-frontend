const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const basicAuth = require('express-basic-auth')

const app = express()
/*
app.use(basicAuth({
    authorizer: (username, password, cb) => {
        const userMatches = basicAuth.safeCompare(username, 'admin')
        const passwordMatches = basicAuth.safeCompare(password, 'supersecret')
        if (userMatches & passwordMatches)
            return cb(null, true)
        else
            return cb(null, false)
    },
    authorizeAsync: true,
    challenge: true,
}))*/

//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')))

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'))
})

const port = process.env.PORT || 8080
app.listen(port)
console.log(`app is listening on port: ${port}`)