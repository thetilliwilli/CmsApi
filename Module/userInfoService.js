"use strict";

const UserModel = require("../Model/user.js");

const userStorage = []; 

function InitializeUserCollection(){
    UserModel.find({}).select("login password name readOnly").exec()
        .then(users => {
            if(users.length === 0)
                throw new Error("Database doesn't have any users. Add some users to database");
            users.forEach(user => userStorage.push(user));
        })
        .catch(error => console.error(error));
}

function UpdateUserCollection(){
    UserModel.find({}).select("login password name readOnly").exec()
        .then(users => users.forEach(user => {
            const curUser = userStorage.find(u => u.login === user.login);
            if(curUser)
                Object.assign(curUser, user);
            else
                userStorage.push(user);
        }))
        .catch(error => console.error(error));
}


global.setInterval(UpdateUserCollection, 5*1000);//каждые 5 сек обновлять коллекцию пользователей

class UserInfoService
{
    constructor(){
        InitializeUserCollection();
    }

    GetUserInfo(login){
        return userStorage.find(u=>u.login === login);
    }
    GetUserInfoById(id){
        return userStorage.find(u=>u.id === id);
    }

    /**
     * 
     * @param {User} user 
     */
    CreateUser(user){
        UserModel.create(user);
    }
}
const singleton = new UserInfoService(); //singleton.CreateUser({login:"1",password:"1"});
module.exports = singleton;

/**
 * @typedef User
 * @property {String} login
 * @property {String} password
 */