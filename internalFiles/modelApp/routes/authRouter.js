const express = require('express');

const app = express();


const authRouter = express.Router();

app.use(express.json());

const userModel = require('../mongo.js');

const loginUser = require('./protectRouter');

authRouter.route('/signUp').get(getSignUp).post(postSignUp);
authRouter.route('/login').post(loginUser);

function getSignUp(req, res, next)
{
    //console.log("On get SignUP"); 
    res.json(
        {
            message: "not available"
        }
    )
}

function middleWare(req, res, next)
{
    console.log("Middle ware reached");
    next();
}

function middleWareX(req, res)
{
    res.sendFile('./public/index.html', {root:__dirname});
    console.log("middleWare x reached");
}

async function postSignUp(req, res)
{
    //let obj = req.body;
    //console.log();
    //console.log("on postSignUp");
    //console.log("obj ", obj);
    let dataObj = req.body;
    console.log(dataObj);

    let data = await userModel.create(dataObj);

    res.json({
        message: "user signed up",
        user: data
    });
}

module.exports = authRouter;
