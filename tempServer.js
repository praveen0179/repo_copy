const express = require('express');

const app = express();

app.use(express.json());

app.listen(3200);

let users = [
    {
        'id': 1,
        'name': 'Abhi'
    },
    {
        'id': 2,
        'name':'rohit'
    },
    {
        'id': 3,
        'name': 'kartik'
    }
];

const userRouter = express.Router();
app.use('/user', userRouter);

const authRouter = express.Router();
app.use('/Auth', authRouter);

userRouter.route('/').get(getUser).post(postUser).patch(updateUser).delete(deleteUser);

userRouter.route('/:id').get(getUserById);

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


