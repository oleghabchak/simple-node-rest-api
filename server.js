const express = require('express')
const app = express()
const port = process.env.PORT || 3500
const bodyParser = require('body-parser')
// const cors = require('cors')
const passport = require('passport')

// app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
require('./middleware/passport')(passport)

const routes = require('./settings/routes')
routes(app)

app.listen(port, () => {
    console.log(`App listen on port ${port}`);
})