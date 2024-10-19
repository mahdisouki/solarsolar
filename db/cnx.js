const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://solar:solar1234@cluster0.tisc9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>console.log('data base is connected')).catch((err)=>console.log(err.message))