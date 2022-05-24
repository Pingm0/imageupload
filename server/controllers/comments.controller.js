const Comment = require('../models/comments.model')
const jwt = require('jsonwebtoken')

module.exports  = {
    addComment:  (async (req,res) => {
        try{
                const newComment = new Comment(req.body)
            const decodedJWT = jwt.decode(req.cookies.usertoken,{complete:true})
                newComment.commentByUser = decodedJWT.payload.id

                newComment.commentOnPost = req.params.id

            const saveComment = await newComment.save()
            console.log(saveComment)
            return res.json(saveComment)

    }
    catch(err){
        console.log({message:'Something went wrong with creating a comment',error:err})
        return res.status(400).json(err)
    }
    }),

    getPostComments: (async (req,res) => {
        try{
            const postComments =  await Comment.find({commentOnPost:req.params.id})
            console.log(postComments);
            res.json(postComments);
    }
    catch(err){
        console.log({message:'Something went wrong with getting comments on a posts',error:err})
        return res.status(400).json(err)
    }
    }),

    


}