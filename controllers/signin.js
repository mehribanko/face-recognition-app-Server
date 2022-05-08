
const signinHandler =(req,res, database, bcrypt)=>{
    const {password, email}=req.body;
    if(!email||!password){
        return res.status(400).json('wrong form submission')
    }
    database.select('hash', 'email').from('login')
    .where('email', '=', email)
    .then(data=>{
        const isTrue=bcrypt.compareSync(password, data[0].hash)
        if(isTrue){
           return  database.select('*').from('users').where('email', '=', email)
            .then(user=>{
                res.json(user[0])
            })
            .catch(err=> res.json('unable to get the user'))
        }else{
            res.status(404).json('wrong user information')
        }
    })
    .catch(err=> res.status(404).json('unable to find the user'))
}

    module.exports={
        signinHandler: signinHandler
    }