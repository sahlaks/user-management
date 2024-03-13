const express = require('express')
const app = express();
const bodyParser = require("body-parser")
const hbs = require("express-handlebars").engine
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin');
const Connection = require('./config');
const bcrypt = require('bcrypt')
const session = require("express-session");
const noche = require('nocache')

app.use(noche())
app.use(session({secret:'SEcret',cookie:{maxAge:10000000}}))
app.set("view engine","hbs")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.engine('hbs',hbs({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layout/',partialsDir:__dirname+'/views/partials'}))

Connection();

app.use('/',userRouter)
app.use('/admin',adminRouter)

app.listen(3000,console.log("server created.."))