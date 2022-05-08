const profileHandler=(req,res,database)=>{
    const {id}=req.params;
    database.select('*').from('users').where({id})
    .then(user => {
        console.log(user);
        if(user.length){
            res.json(user[0]);
        }else{
          res.status(404).json('Not found')
        }
    })
    .catch(err=> res.json('Not found'))   

}

module.exports={
    profileHandler: profileHandler
}