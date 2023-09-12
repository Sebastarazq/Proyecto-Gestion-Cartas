// ./config/db.js

import mongoose from "mongoose";

const DB_URI = "mongodb://nexusbattles2:foaQ52f1ESUBeq7Ml5QoKOQYHezlF1tdSiKP3sKdBpUYJK2gB52iIL92Sb78hQsr1ZxWIdVvoPUQACDbqDTSNg==@nexusbattles2.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@nexusbattles2@";

const connect = async () => {
    try {
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Conexion correcta a la DB');
    } catch (error) {
        console.error('DB: ERROR', error);
    }
};

export default connect;
