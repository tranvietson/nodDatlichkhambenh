import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web.js";
import connectDB from "./config/connectDB";
import cors from 'cors';
require('dotenv').config();


let app = express();
//app.use(cors({credentials: true, origin: 'http://localhost:3000'}));


app.use(function (req, res, next) {
    var allowedOrigins = [
        "http://localhost:3000"
    ];
    var origin = req.headers.origin;
    console.log('>>>>>>>>>>>>>>>>>:origin:', origin)
    console.log(allowedOrigins.indexOf(origin) > -1)
    // Website you wish to allow to
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }

    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type,Authorization"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});



//config app
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// can replec express for bodyParser

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb' }));

viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 6969;
app.listen(port, () => {
    //calback
    console.log("Backend Nodejs is running on the port:" + port);
});
