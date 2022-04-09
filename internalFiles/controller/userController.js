const userModel = require('../modelApp/mongo');

module.exports.getUser = async function getUser(req, res)
{
    let id = req.params.id;
    let users = await await userModel.findById(id);
    //let allUsers = await userModel.find();

    if(users)
    {
        return res.json(users);
    }
    else
    {
        res.json(
            {
                message: 'user not found'
            }
        );
    }
}

module.exports.postUser = function postUser(req, res)
{
    console.log(req.body);

    users = req.body;

    res.json({
        message: "Received Successfully",
        user: req.body
    });
}

module.exports.updateUser = async function updateUser(req, res)
{
    try
    {
        let id = req.params.id;

        let user = await userModel.findById(id);
        
        let dataToUpd = req.body;
        if(user)
        {
            const keys = [];
            for(let key in req.body)
            {
                keys.push(key);
            }

            for(let i = 0; i<keys.length; i++)
            {
                user[keys[i]] = dataToUpd[keys[i]];
            }
            const updatedData = await user.save();

            res.json({
                message:"Updated your Information"
            });
        }
        else
        {
            res.json(
                {
                    message:"Can't access Your profile",
                    data:user
                }
            )
        }
    }
    catch(err)
    {
        res.json(
            {
                message: err.message
            }
        )
    }
    
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

module.exports.deleteUser = async function deleteUser(req, res)
{
    try
    {
        let id = req.params.id;

        let user = await userModel.findByIdAndDelete(id);

        if(!user)
        {
            res.json(
                {
                    message:"User not found"
                }
            )
        }
        res.json(
            {
                message:'Deleted Successfully',
                data:user
            }
        );
    }
    catch(err)
    {
        res.json(
            {
                message:err.message
            }
        )
    };
    /*let dataTodel= req.body;
    let user = await userModel.findOneAndDelete(dataTodel);
    res.json(
    {
        message: "Deleted-Successfully",
        data: user
    });*/
}

module.exports.getAllUser = async function getAllUser(req, res)
{
    let users = await userModel.find();

    res.send(
        {
            message: 'users retrived',
            data: users
        }
    )
}

module.exports.getUserById = function getUserById(req, res)
{
    res.send(users[req.params.id]);

    res.send(users[req.params.id]);

    res.json(
        {
            message: "Id received successfully",
        }
    );
}

// function setCookies(req, res)
// {
//     res.cookie('isLoggedIn', true, {maxAge:1000*60*60*24, secure:true, httpOnly:true});
//     res.send('Cookies has been set');
// }

// function getCookies(req, res)
// {
//     let cookie = req.cookies;
//     console.log(cookie);

//     res.send("Cookies received");
// }

// function protectRoute(req, res, next)
// {
//     console.log(req.cookies.isLoggedIn);
//     if(req.cookies.isLoggedIn)
//     {
//         console.log("here");
//         next();
//     }
//     else
//     {
//         return res.json(
//             {
//                 message: "Operation not allowed"
//             }
//         );
//     }
// }

