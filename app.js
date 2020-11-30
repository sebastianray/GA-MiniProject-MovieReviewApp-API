const express = require('express');
const app = express();
require('dotenv').config()

const PORT = process.env.PORT || 3000;

const router = require('./routes')
const cors = require('cors')

//Middlewares
// app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cors());

//Routes
app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running at port : ${PORT}`);
})