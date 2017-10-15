//Общий формат для всех сообщений:
//
//    hostname:port/api/golo/{applicationPersistentUuid}/{subject}/{entityId}/
//
//          applicationPersistentUuid - это uuid version 4 или ему подобное.
//              Должен генерироваться один раз для апликейшена и не меняться больше: например IMEI планшета или что то подобное.
//              Запрос должен всегда содержать applicationPersistentUuid, по которому будет происходить регистрация новых приложений, и ослеживаеться аптайм приложений
//          subject - это тип задаваемого вопроса к серверу из списка: [ meta, entity, all, ping]
//          entityId - это уникальный номер сущности
//*********************************************************************************************************************** */

//1.    Subject: meta
//      Пример: GET localhost:8080/api/golo/59e0c7228ebaa2ac3fd88c22/meta/
//      Описание: Получение времени последнего обновления по всем экспонатам
RESPONSE:
{
    entities:[
        {id: "a0dbf8a9-5980-4e01-8793-74690f7f4b93", mt: "2017-10-14T14:44:28.611Z"},//id - уникальный номер сущности. mt - last Modified Time in UTC format (Zulu time zone ;)
        {id: "8bb28bd9-1ced-4120-b3f1-6c6369e9353f", mt: "2017-19-15T14:49:34.427Z"},
    ]
}


//2.    Subject: entity
//      Пример: GET localhost:8080/api/golo/59e0c7228ebaa2ac3fd88c22/entity/a0dbf8a9-5980-4e01-8793-74690f7f4b93/
//      Описание: Получение полной инфы по конкретному эскпонату
RESPONSE:
{
    id: "a0dbf8a9-5980-4e01-8793-74690f7f4b93",
    mt: "2017-10-14T14:44:28.611Z",
    coverImage: "/Static/img/defaultExhibitAvatar.jpg",
    description : {
        en : "Подбробное описание этикетки на английском",
        ru : "Подбробное описание этикетки на русском"
    },
    subtitle : {
        en : "Субтитл на английском",
        ru : "Субтитл русский"
    },
    title : {
        en : "титл на английском",
        ru : "титл русский"
    },
    name : {
        en : "Голографическая этикетка номер 1",
        ru : "Голографическая этикетка номер 1"
    },
    fields:[
        {
            value : {
                en : "",
                ru : "4214214"
            },
            name : {
                en : "eneneneen",
                ru : "чччччч"
            }
        }
    ],
    imageGallery: [
        {
            id: "758ade3f-38f5-476a-8703-4edb75b3b43a",
            image: "/Static/img/defaultExhibitAvatar.jpg",
            description: {
                en : "eneneneen",
                ru : "русский"
            }
        }
    ],
    video: "Static/video/video1.mp4"
}
    
//3.    Subject: all
//      Пример: GET localhost:8080/api/golo/59e0c7228ebaa2ac3fd88c22/all/
//      Описание: Тоже самое что при {subject} = entity, но только массив всех экспонатов загружаеться
RESPONSE:
{
    entities:[
        {id: "a0dbf8a9-5980-4e01-8793-74690f7f4b93", mt: "2017-10-14T14:44:28.611Z", .../* остальные данные по экспонату */},
        {id: "8bb28bd9-1ced-4120-b3f1-6c6369e9353f", mt: "2017-19-15T14:49:34.427Z", .../* остальные данные по экспонату */},
    ]
}


//4.    Subject: ping
//      Пример: GET localhost:8080/api/golo/59e0c7228ebaa2ac3fd88c22/ping/
//      Описание: Переодически посылая такой запрос на сервер, приложение будет сообщать о своей активности
RESPONSE: "\"ok\""; // "\"ok\"" - это JSON.stringify("ok")