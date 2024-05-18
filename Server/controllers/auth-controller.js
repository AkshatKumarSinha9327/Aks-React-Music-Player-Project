const User = require('../models/use-modelr');
const databaseFunction = require('../utils/db')
const fs = require('fs')

var music_data={};

fs.readdir('./resource/music', (eror,files)=>{
    if(eror){
        console.log(eror);
    }
    else{
        let i=0;
        files.forEach(file => {
            let tExt = file.replace('.mp3', '.jpeg');
            let songPath = `http://localhost/resource/music/${file}`; // URL path for song
            let imgPath = `http://localhost/resource/img/${tExt}`; // URL path for image

            music_data[i++] = {
                title: file,
                song: songPath,
                img: imgPath
            };
        });
    }
});



const getSongs = async (req,res)=>{
    try{

        res.json(music_data);
    }catch(error ){
        console.log(error);
    }
}

const authLogin = async (req,res)=>{
    try {
        const {name,email,password} = req.body;
        const connectionSucces = databaseFunction.connectDB();
        const userExist = await User.findOne({userEmail:email});
        if(userExist && userExist.userPassword == password){
            res.json({msg:"Login Success",name:userExist.userName,email:userExist.userEmail,number:userExist.userNumber});
        }
        else if(userExist){
            res.json({msg:"Invalid Credentials"})
        }
        else{
            res.json({msg:"User not found"})
        }
    } catch (error) {
        console.log(error)
    }
}

const authSignUp = async(req,res)=>{
    try {
        const {name,email,number,password} = req.body;
        const connectionSucces = databaseFunction.connectDB();
        const emailExists = await User.findOne({userEmail:email});
        const numberExists = await User.findOne({userNumber:number});
        if(emailExists || numberExists){
            res.json({msg:"User Already Exists"})
        }
        else{
            await User.create({
                userName:name,
                userEmail:email,
                userNumber:number,
                userPassword:password
            })
            res.json({msg:"Success",name:name,email:email,number:number})
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = {getSongs,music_data,authLogin,authSignUp};