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
    console.log("middleWare x reached");
}

function getUser(req, res)
{
    res.send(users);
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

function updateUser(req, res)
{
    console.log(req.body);

    let dataToUpd = req.body;

    for(key in dataToUpd)
    {
        users[key] = dataToUpd[key];
    }

    res.json({
        message: "Updated-successfully",
        user: req.body
    });
}

function deleteUser(req, res)
{
    users = {};

    res.json(
    {
        message: "Deleted-Successfully"
    });
}

function getUserById(req, res)
{
    res.send(users[req.params.id]);

//    users[req.params.id] = ;
    res.send(users[req.params.id]);

    res.json(
    {
        message: "Id received successfully",
    }
    )
}

function getSignUp(req, res, next)
{
    console.log("On get SignUP");
    res.sendFile('./public/index.html', {root:__dirname});
    next();
}

function postSignUp(req, res)
{
    let obj = req.body;
    //console.log();
    //console.log("on postSignUp");
    console.log("obj ", obj);

    res.json({
        message: "user signed up",
        data: obj
    });
}

const url = 'mongodb+srv://user_31:N69OQzrpgctyr9E0@cluster0.jsm79.mongodb.net/thisShit?retryWrites=true&w=majority';

//console.log(url);

mongo.connect(url).then((db)=>
{
    console.log("connected to the server");
    console.log(db);
}).catch(
    function(err)
    {
        console.log(err);
    }
);

//UserSchema
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    confirm_password:{
        type: string,
        required: true
    }
});

//model