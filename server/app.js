const express = require('express');
const app = express();
const cors = require('cors');
const errorMiddleware = require('./middleware/error');
const cookieParser = require('cookie-parser')
const bodyParser =require('body-parser');
const fileUpload = require('express-fileupload');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
    optionSuccessStatus:200,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');

app.use('/api/v1',product);
app.use('/api/v1',user);
app.use('/api/v1',order);


app.use(errorMiddleware);


module.exports = app;