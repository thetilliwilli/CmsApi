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

        var self = this;
        var blob = req.headers["blob"];

        if(!blob)
            return this._Result(false, "Вы не авторизированы");

        

        return Promise.resolve()
            .then(() => jwt.Decode(blob))
            .catch(error => self._Result(false, error))
            .then((ctx) => {

                if(ctx.success !== undefined && !ctx.success)
                    return self._Result(false, ctx.error);

                var {login, password} = ctx;

                if (login && password)
                {
                    var userInfo = userInfoService.GetUserInfo(login);

                    //проверить что пользователь существует
                    if ((userInfo.login !== login) || (userInfo.password !== password))
                        return self._Result(false, "Вы не авторизированы");

                    //проверить доступ на изменение данных
                    var isWriteAccessRequested = req.method.toUpperCase() !== "GET";
                    if (isWriteAccessRequested && userInfo.readOnly)
                        return self._Result(false, "Вы обладаете правами только на просмотр данных");

                    //должно быть последним
                    return self._Result(true);
                }
                else
                    return self._Result(false, "Вы не авторизированы");
            });
        
    }

    AuthFirewall(req, res, next){
        this.IsAuth(req)
            .then(result => {
                if(result.success) return next();
                else return res.send({error:result.error});
            })
            .catch(error => res.send({error:error}));
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
        return Promise.resolve({ success, error});
    }
}

module.exports = new Auth({
    redirectUrl: "/auth/login"
});