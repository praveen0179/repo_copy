const userModel = require('./internalFiles/modelApp/mongo.js');

const express = require('express');

const app = express();

const cookieParser = require('cookie-parser');
const userRouter = require('./internalFiles/modelApp/routes/userRouter.js');
const authRouter = require('./internalFiles/modelApp/routes/authRouter.js');

app.use(express.json());    

app.listen(3200);

app.use(cookieParser());


const userRouter1 = require('./internalFiles/modelApp/routes/userRouter.js');
const authRouter1 = require('./internalFiles/modelApp/routes/authRouter.js');

app.use('/user', userRouter1);
app.use('/Auth', authRouter1);

