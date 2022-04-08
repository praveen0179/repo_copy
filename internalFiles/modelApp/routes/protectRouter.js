const userModel = require('../mongo.js');

async function loginUser(req, res)
{
    try{
        let data = req.body;

        let user = await userModel.findOne({email:data.email});

        if(data.email)
        {
            if(user)
            {
                //brcypt password will be used to match the stored and entered password (comparision)
                console.log("We are reaching");
                if(user.password==data.password)
                {
                    let payLoad = user['_id'];
                    
                    res.cookie('isLoggedIn', true);
                    return res.json({
                        message: "User logged in",
                        userDetails: user
                    })
                }
                else
                {
                    res.json({
                        message: "Invalid Credentials"
                    });
                }
            }
            else
            {
                res.json(
                    {
                        message: "user not found"
                    }
                );
            }
        }
        else
        {
            res.json(
                {
                    message: "user not fount"
                }
            );
        }
    }
    catch(err)
    {
        return res.json({
            message: err.message
        });
    }
}

module.exports = loginUser;