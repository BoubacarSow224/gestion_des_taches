const mongoose= require("mongoose");

const connectDB=async()=>{
    try{
        // la connexion a mongoDB avec MONGO_URL depuis .env
        const conn= await mongoose.connect(process.env.MONGO_URL,{
           useNewUrlParser: true,
           useUnifiedTopology: true
        });
        console.log(`mongoDB connecté : ${conn.connection.host}:`);
    }catch(error){
        console.log(`erreur de connexion MongoDB :${error.message}`)
        process.exit(1);// c'est pour stopper le serveur si erreur

    }
};
module.exports = connectDB;