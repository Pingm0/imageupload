const Like = require('../models/likes.model')
const jwt = require('jsonwebtoken')

module.exports  = {
    like:  (async (req,res) => {
        try{
            const liked = new Like (req.body)
            const decodedJWT = jwt.decode(req.cookies.usertoken,{complete:true})
            liked.likeOnPost = req.params.id
            liked.likedByUser = decodedJWT.payload.id

            const saveLike = await liked.save()
            console.log('Post Added',saveLike)
            return res.json(saveLike)
    }
    catch(err){
        console.log({message:'Something went wrong with creating a like',error:err})
        return res.status(400).json(err)
    }
    }),

    getLikes: (async (req,res) => {
        try{
            const getLikes =  await Like.find({likeOnPost:req.params.id})
            console.log(getLikes);
            res.json(getLikes);
    }
    catch(err){
        console.log({message:'Something went wrong with getting comments on a posts',error:err})
        return res.status(400).json(err)
    }
    }),

    


}