
import express from 'express';
import mongoose from 'mongoose';

import dotent from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
dotent.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected");
}).catch((err) => {
    console.log(err);
});


const app = express()

//Allow json from client/postman
app.use(express.json());
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World! s1s')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//Register Routes
app.use("/api/user", userRouter);
app.use('/api/auth', authRouter);

///Error middleware
app.use((err, req, res, next) => {

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message
    });
})