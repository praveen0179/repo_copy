const express = require('express');

const userModel = require('../mongo');

const jwt = require('jsonwebtoken');

const jwt_key = 'jdsflkj38833';

module.exports.signUp = async function signup(req, res)
{
    try
    {
        let dataObj = req.body;
        let user = await userModel.create(dataObj);

        if(user)
        {
            return res.json(
                {
                    message:'user signed up',
                    data:user
                }
            );
        }
        else
        {
            res.json({
                message:'error while signup'
            });
        }
    }
    catch(err)
    {
        res.json(
            {
                message:err.message
            }
        )
    }
}

module.exports.login = async function login(req, res)
{
    try
    {
        let data = req.body;
        if(data.email)
        {
            let user = await userModel.findOne({email:data.email});
            if(user)
            {
                if(user.password==data.password)
                {
                    //let uid = user['_id'];
                    //let token = jwt.sign()
                    req.cookies.login = true;
                    res.json(
                        {
                            message:'You are logged in'
                        }
                    );
                }
                else
                {
                    res.json({
                        message:'Invalid Credentials'
                    })
                }
            }
            else
            {
                //user exist or not
                res.json(
                    {
                        message:'No record Found'
                    }
                )
            }
        }
        else
        {
            //email not entered
            res.json(
                {
                    message:'please enter details'
                }
            )
        }
    }
    catch(err)
    {
        res.json(
            {
                message:err.message
            }
        )
    }
}

//To check what kind of user{like admin or worker or normal user} is currently trying to access the web, we will use the authorize function

module.exports.Authorize = function authorize(roles)
{
    return function(req, res, next)
    {
        if(roles.include(req.role)==true)
        {
            next();
        }
        else
        {
            res.status(401).json(
                {
                    message:'operation not allowed'
                }
            );
        }
    }
}

module.exports.protectRoute = async function protectRoute(req, res, next)
{
    let token;
    if(req.cookies.login)
    {
        console.log(req.cookies);
        token = req.cookies.login;
        let payload = jwt.verify(token, jwt_key);

        req.role = user.role;
        req.id = user.id;
        next();
    }
    else
    {
        return res.json(
            {
                message:'user not logged in'
            }
        )
    }
}


