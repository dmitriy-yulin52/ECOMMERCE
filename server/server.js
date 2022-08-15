const app = require('./app');

const dotenv = require('dotenv');
const connectDatabase = require('./config/database')


dotenv.config({path:'server/config/config.env'});

connectDatabase()

app.listen(process.env.PORT,()=>{
    console.log(`server started on "http://localhost:${process.env.PORT}"`)
})