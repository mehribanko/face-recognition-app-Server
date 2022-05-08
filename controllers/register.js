const regHandler=(req,res, database, bcrypt)=>{
    
    const {email,name, password}=req.body;

    if(!name||!email||!password){
        return res.status(400).json('wrong form submission')
    }
    
    const hash=bcrypt.hashSync(password);
    database.transaction(trx=>{
        trx.insert({
            hash:hash,
            email:email
        }).into('login')
        .returning('email')
       .then(regEmail=>{
            return trx('users')
            .returning('*')
            .insert({
                email: regEmail[0].email,
                name: name,
                joined: new Date()

        }).then(user=>{
            res.json(user[0]);
        })
})
    .then(trx.commit)
    .catch(trx.rollback)  
})
    .catch(err=> res.status(404).json('failed to register'))
}

module.exports={
    regHandler: regHandler
}