const express = require('express');
const connectDB = require('./db/connect');
require('dotenv').config();
const customerRouter = require('./routes/customers')
const genresRouter = require('./routes/genres')
const movies = require('./routes/movies')
const app = express();


app.use(express.json());
app.use('/api', customerRouter)
app.use('/api', genresRouter)
app.use('api', moviesRouter)
app.use('api',rentalRouter)


// deufault route
// app.get('/', (req, res) =>{
//     res.json({
//         message: 'Welcome to VID_APP'
//     });
// })

const PORT = process.env.PORT || 5000;


const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`server started at PORT ${PORT}`)
        })
    }
    catch(error){
        console.log(error);
    }
}

start();
