const express = require('express');
const app = express();
const cors = require('cors');
const errorMiddleware = require('./middleware/error');

app.use(express.json());
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
    optionSuccessStatus:200
}));

const product = require('./routes/productRoute');

app.use('/api/v1',product);
app.use(errorMiddleware);



module.exports = app;