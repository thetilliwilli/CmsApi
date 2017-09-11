//INCLUDES--------------------------------------------------------------------------------------------
const configFiles = [
    "./serverConfig.js",
];
//SETUP--------------------------------------------------------------------------------------------
//LOGIC--------------------------------------------------------------------------------------------
class ConfigManager
{
    constructor(pConfig){
        this.storage = {};
        this.safeMode = pConfig.safeMode || true;
    }

    Setup(pConfig){
        for(let prop in pConfig)
        {
            if(!this.storage[prop])
                throw new Error(`[${this.constructor.name}]:(Setup): Ошибка при попытке настройки - нет такого свойства`);
            else
                this.storage[prop] = pConfig[prop];
        }
    }

    LoadFileSafe(pFileName){

    }

    AddSafe(){
        
    }
}

var cm = new ConfigManager();
for(let file of configFiles)
    cm.LoadFile(file);



module.exports = new ConfigManager();