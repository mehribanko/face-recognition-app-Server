const express =require('express');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex= require("knex");
const app=express();
const signin=require('./controllers/signin')
const register=require('./controllers/register');
const profile = require('./controllers/profile');
const image= require('./controllers/image');

const port=3001

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());


const database=knex({
      client: 'pg',
      connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'posmeh22*',
      database : 'facedetec'
    }
  });



app.get("/",(req, res)=>{
    res.json('success')
})

app.post('/signin', (req,res)=> {signin.signinHandler(req,res, database, bcrypt)})

app.post('/register', (req,res)=>{register.regHandler(req,res,database,bcrypt)})

app.get('/profile/:id', (req,res)=>{profile.profileHandler(req,res,database)})

app.put('/image', (req,res)=>{image.entryHandler(req,res, database)})

app.post('/getImageUrl', (req,res)=>{image.apiCallHandler(req,res)})

app.listen(port, ()=>{
    console.log(`server listening on port ${port}`)
});

