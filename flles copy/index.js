const express= require('express');
const cors = require('cors');

const app=express();

app.use(cors());

app.get('/api',(req,res)=>{
    res.send("hello world");
})

app.listen(8080,(e)=>{
    if(e){
        console.log("error in startup");
    }
    else{
        console.log("listning.......")
    }
})