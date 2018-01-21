"use strict";
var userInfoService = require("./userInfoService.js");
const jwt = require("./jwt.js");


class Auth
{
    constructor(core){
        this.redirectUrl = core.redirectUrl;
        this.AuthFirewall = this.AuthFirewall.bind(this);
    }

    IsAuth(req){
        var isAuth = false;
        
        if(req.headers["blob"])
        {
            const {login, password} = jwt.Decode(req.headers["blob"]);
        
            if(login && password)
            {
                var userInfo = userInfoService.GetUserInfo(login);
                if((userInfo.login === login) && (userInfo.password === password))
                    isAuth = true;
            }
        }

        return isAuth;
    }

    AuthFirewall(req, res, next){
        if(this.IsAuth(req))
            next();
        else
            return res.send({error:"Вы не авторизированны"});
    }

    TryLogin(res, user){

        var userInfo = userInfoService.GetUserInfo(user.login);
        if(userInfo && (user.login === userInfo.login) && (user.password === userInfo.password))
        {
            const token = jwt.Encode({login: userInfo.login, password: userInfo.password});
            res.cookie("blob", token, { maxAge: 14400 * 1000});
            return true;
        }
        else
            return false;
    }

    TryLogout(res){
        res.clearCookie("blob");
        return true;
    }
}

module.exports = new Auth({
    redirectUrl: "/auth/login"
});