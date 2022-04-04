const userModel = require('./internalFiles/modelApp/mongo.js');

const express = require('express');

const app = express();

const mongo = require('mongoose');

app.use(express.json());

app.listen(3200);

let users = [
    {
        'id': 1,
        'name': 'Abhi',
        'address':{
            city: 'Udaipur',
            Pincode: 1222
        }
    },
    {
        'id': 2,
        'name':'Rohit',
        address:
        {
            city: 'Jaipur',
            Pincode: 12555
        }
    },
    {
        'id': 3,
        'name': 'Kartik',
        address:
        {
            city: 'Hamirpur',
            Pincode: 12745
        }
    }
];

const userRouter = express.Router();
const authRouter = express.Router();

app.use('/user', userRouter);
app.use('/Auth', authRouter);

userRouter.route('/').get(getUser).post(postUser).patch(updateUser).delete(deleteUser);

userRouter.route('/:id').get(getUserById);
    
authRouter.route('/signUp').get(middleWare, getSignUp, middleWareX).post(postSignUp);

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

async function getUser(req, res)
{
    let allUsers = await userModel.find();

    res.json({
        message: "list of all users",
        data: allUsers
    });
}

function postUser(req, res)
{
    console.log(req.body);

    users = req.body;

    res.json({
        message: "Received Successfully",
        user: req.body
    });
}

async function updateUser(req, res)
{
    let dataToUpd = req.body;

    let user = await userModel.findOneAndUpdate({email:'jk2@ff.com'}, dataToUpd);

    res.json(
        {
            message: "Updated successfully"
        }
    );
    /*console.log(req.body);

    let dataToUpd = req.body;

    for(key in dataToUpd)
    {
        users[key] = dataToUpd[key];
    }

    res.json({
        message: "Updated-successfully",
        user: req.body
    });*/
}

async function deleteUser(req, res)
{
    //users = {};

    let dataTodel= req.body;
    let user = await userModel.findOneAndDelete(dataTodel);
    res.json(
    {
        message: "Deleted-Successfully",
        data: user
    });
}

function getUserById(req, res)
{
    res.send(users[req.params.id]);

    res.send(users[req.params.id]);

    res.json(
    {
        message: "Id received successfully",
    }
    );
}

function getSignUp(req, res, next)
{
    //console.log("On get SignUP"); 
    next();
}

async function postSignUp(req, res)
{
    //let obj = req.body;
    //console.log();
    //console.log("on postSignUp");
    //console.log("obj ", obj);
    let dataObj = req.body;
    let data = await userModel.create(dataObj);

    res.json({
        message: "user signed up",
        user: data
    });
}
