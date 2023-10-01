const jwt = require('jsonwebtoken');

//before performing any CRUD operation authentication must be done

function checkAuth(req, res, next) {
    // 1. get auth and refresh token from cookies if not exist return an error
    // 2. check expiry of auth token if not expired then evrything fine exit function
    //3. check expiry of refresh token, if refresh token is expired then ask for re-login
    //4. if refresh token is not expired but auth token is expired then regenrate both tokens

    const authToken = req.cookies.authToken;
    const refreshToken = req.cookies.refreshToken;
    console.log("check Auth token middleware called");
    // console.log("authToken: ",authToken);
    // console.log("refreshToken: ",refreshToken);
    if(!authToken || !refreshToken){
        return res.status(401).json({
            success: false,
            message: "Authentication failed: needed authToken and refreshToken"
        });
    }

    jwt.verify(authToken,process.env.JWT_SECRET_KEY,(err,decoder)=>{
        if(err){
            jwt.verify(refreshToken,process.env.JWT_SECRET_KEY,(refreshErr,refreshDecoder)=>{
                //refresh token is expired & auth token is expired
                if(refreshErr){
                    return res.status(401).json({
                        success: false,
                        message: "Authentication failed: refresh & auth token expired"
                    });
                }
                else{
                    //refresh token is not expired but auth token is expired
                    const newAuthToken = jwt.sign({userId:refreshDecoder.userId},process.env.JWT_SECRET_KEY,{expiresIn:'10m'});

                    const newRefreshToken = jwt.sign({userId:refreshDecoder.userId},process.env.JWT_REFRESH_SECRET_KEY,{expiresIn:'40m'});
                
                    res.cookie('authToken',newAuthToken,{httpOnly:true});
                    res.cookie('refreshToken',newRefreshToken,{httpOnly:true});
                    req.userId = refreshDecoder.userId;
                    next();
                }
                
            })
        }
        else{
            req.userId = decoder.userId;
            next();
        }
    })


}

module.exports = checkAuth;