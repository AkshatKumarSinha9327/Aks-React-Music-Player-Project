const mongoose = require('mongoose')

const URI = "mongodb+srv://kumarsinhaakshat8:Akshat1904@cluster0.rep7xci.mongodb.net/MusicDatabase?retryWrites=true&w=majority&appName=Cluster0"


const connectDB = async()=>{
    try{
        await mongoose.connect(URI);
        console.log("conection succed");
    }
    catch(error){
        console.log("Database connection failed");
    }
}

module.exports = {connectDB};