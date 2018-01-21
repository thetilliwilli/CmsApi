"use strict";
const jwt = require("jsonwebtoken");
const secret = require("../Private/secret.json").secret;

class JWT
{

    Encode(message){
        return jwt.sign(message, secret);
    }

    Decode(token){
        return jwt.decode(token);
    }

}


const singleton = new JWT();
module.exports = singleton;

