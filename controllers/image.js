const Clarifai=require('clarifai');
const { response } = require('express');

const app=new Clarifai.App({
    apiKey: "535d004c66304fb3a7003867ec248cc5"
  })


const apiCallHandler=(req,res)=>{
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input) 
    .then(data=>{
        res.json(data)
    })
    .catch(err=> res.status(400).json('unable to fetch the api'))
  }
 

const entryHandler=(req,res, database)=>{
    const {id}=req.body;
    database('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries=> {
        res.json(entries[0].entries);
    })
    .catch(err=>res.status(404).json('unable to read the file'))
}

module.exports={
    entryHandler,
    apiCallHandler
}