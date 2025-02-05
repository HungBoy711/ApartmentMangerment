const express = require('express');
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const configViewEngine = require('./config/viewEngine');
const routes = require('./routes/web')
const connection = require('./config/database')
const { MongoClient, ServerApiVersion } = require('mongodb')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

const app = express()
const port = process.env.PORT || 4000
const hostname = process.env.HOST_NAME

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

app.use(cookieParser());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

configViewEngine(app)

app.use('/', routes);

// (async () => {
//     try {
//         const url = process.env.DB_HOST_WITH_DRIVER;
//         const client = new MongoClient(url);
//         const dbName = process.env.DB_NAME;
//         await client.connect();
//         console.log('Connected successfully to server');
//         app.listen(port, hostname, () => {
//             console.log(`Web running succeed on port ${port}`);
//         })
//     } catch (error) {
//         console.log('Failed');
//     }
// })();


connection()
const client = new MongoClient(process.env.DB_HOST_ATLAS, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const run = async () => {
    try {
        await client.connect();
        await client.db("Apartments").command({ ping: 1 });
        console.log("Success mongodb atlas atlas");
        app.listen(port, hostname, () => {
            console.log(`Web running succeed on port ${port}`);
        });
    } finally {
    }
};

run().catch(console.dir);






