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
        
        if(req.headers["blob"])
        {
            const {login, password} = jwt.Decode(req.headers["blob"]);
            if (login && password)
            {

                var userInfo = userInfoService.GetUserInfo(login);

                //проверить что пользователь существует
                if ((userInfo.login !== login) || (userInfo.password !== password))
                    return this._Result(false, "Вы не авторизированы");

                //проверить доступ на изменение данных
                var isWriteAccessRequested = req.method.toUpperCase() !== "GET";
                if (isWriteAccessRequested && userInfo.readOnly)
                    return this._Result(false, "Вы обладаете правами только на просмотр данных");
            }
            
            return this._Result(true);
        }

        return this._Result(false, "Вы не авторизированы");
    }

    AuthFirewall(req, res, next){

        var authResult = this.IsAuth(req);

        if(authResult.success)
            next();
        else
            return res.send({error:authResult.error});
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

    _Result(success, error){
        return { success, error};
    }
}

module.exports = new Auth({
    redirectUrl: "/auth/login"
});