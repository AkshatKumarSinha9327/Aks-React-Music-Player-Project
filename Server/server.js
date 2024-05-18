
const express = require('express');
const router = require('./router/auth_router')
const cors = require('cors')
const path = require('path')
const server = express();


server.use(cors());
server.use(express.json());
server.use('/api/auth',router)
server.use('/resource/music', express.static(path.join(__dirname, 'resource/music')));
server.use('/resource/img', express.static(path.join(__dirname, 'resource/img')));


server.listen(80,()=>{
    console.log('server listening on port 80')
})
