require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

// middlewares
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
        credentials: true
    })
)

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded());


const PORT = process.env.PORT || 4008;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log('listening on port', PORT);
        })
    })
    .catch((error) => {
        console.log(error)
    })