"use strict";
const jwt = require("jsonwebtoken");
const secret = require("../Private/secret.json").secret;

class JWT
{

    Encode(message){
        return jwt.sign(message, secret);
    }

    Decode(token){
        return new Promise((RS,RJ)=>{
            jwt.verify(token, secret, (error, decoded)=>{
                if(error) RJ(error);
                else RS(decoded);
            });
        });
    }

}


const singleton = new JWT();
module.exports = singleton;

