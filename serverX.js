const { replaceWith } = require('cheerio/lib/api/manipulation');
const express = require('express');

const app = express();

app.use(express.json());//MiddleWare function used for reading data from POST in json format from frontend.
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

app.get('/users', (req, res)=>
{
    console.log(req.query);
    res.send(users);
});


//Data from front end body will come to this server that i have created through this POST method.
app.post('/users', (req, res)=>
{
    res.json({
        message: "data Received Successfully",
        user: req.body
    });
    console.log(req.body);
    users = req.body;
});

app.patch('/user', (req, res)=>
{
    console.log(req.body);

    let dataToUpd = req.body;
    for(key in dataToUpd)
    {
        users[key] = dataToUpd[key];
    }

    res.json({
        message: 'data-updated successfully'
    });
});

app.delete('/user', (req, res)=>
{
    users = {};
    res.json(
        {
            message: "Data Has been removed"
        }
    );
});

app.get('/user/:username', (req, res)=>
{
    res.send("user id received");

    console.log(req.params);

    console.log(req.params.username);
});


