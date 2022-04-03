const express = require('express');

const fs = require('fs');

const app = express();

app.listen(3000);

app.get('/', (req, res)=>
{
    res.send('<h2>Hello World</h2>');
    /*
        We don't have to set Header for the content send.
        Sometimes we don't even need to write statusCode.
    */
});

app.get('/about', (req, res)=>
{
    //res.send("<h1>About me</h1>");

    /*
    res.sendFile(__dirname+'/internalFiles/about.html');//1st way of sending with adding current directory name(__dirname) with the relative path .
    res.sendFile('./internalFiles/about.html', {root: __dirname});//2nd way of passing current directory name as an second argument to function so that it combines with first argument which is the relative path of the file.
    */

    res.sendFile('./internalFiles/about.html', {root: __dirname});
})

app.get('/about-company', (req, res)=>
{
    res.redirect('/about');
})

//This function is Special kind of dafault case when no app.get path take.
//That time this function executes.404 pages(not available on server);

app.use((req, res)=>
{
    /*
    res.statusCode = 404;
    res.sendFile('./internalFiles/404.html', {root: __dirname});*/

    //or 

    res.status(404).sendFile('./internalFiles/404.html', {root: __dirname});
});


//POST Request 
//     This one used for sending data from frontend to backend.


