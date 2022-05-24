const jwt = require('jsonwebtoken')
const Post = require('../models/posts.model');
const Comments = require('../models/comments.model');
const Likes = require('../models/likes.model');



module.exports  = {

    createPost:(async (req,res) => {
        console.log('outside API')
        console.log(req.file)

        try{
            
            const postTitle = req.body.postTitle
            const postBody = req.body.postBody
            const postPicture =req.file.filename
            const newPost = {
                postTitle,
                postBody,
                postPicture
            }

            console.log(newPost,'after post')


            newPost.postedBy = '62871acf6fcafcfee9a676f7'
            const  post = new Post(newPost)
            const savePost = await post.save()
            console.log(" after save")
            console.log('Post Added',savePost)
            return res.json(savePost)
        }
        catch(err){
            res.status(400).json(err)
        }
    }),
    // createPost:(async (req,res) => {
    //     try{
    //         const newPost = new Post(req.body)
    //         console.log(req.body)
    //         const decodedJWT = jwt.decode(req.cookies.usertoken,{complete:true})
    //         console.log(decodedJWT)
    //         newPost.postedBy = decodedJWT.payload.id
    //         console.log(newPost)

    //         const savePost = await newPost.save()
    //         console.log('Post Added',savePost)
    //         return res.json(savePost)
    //     }
    //     catch(err){
    //         res.status(400).json(err)
    //     }
    // }),
    getUserPosts: (async (req,res) => {
        try{
            const decodedJWT = jwt.decode(req.cookies.usertoken,{complete:true})
            const userPosts =  await Post.find({postedBy:decodedJWT.payload.id})
            console.log(userPosts);
            res.json(userPosts)
    }
    catch(err){
        console.log({message:'Something went wrong with getting user posts',error:err})
        return res.status(400).json(err)
    }
    }),
    getAllPosts: (async (req,res) => {
        try{
            const allPosts = await Post.find()
            console.log(allPosts)
            return res.json(allPosts)
        }
        catch(err){
            console.log(err)
            return res.json({message:'Something went wrong with finding all posts',error:err})
        }
    }) ,

    getPostComments: (async (req,res) => {
        try{
            const postComments =  await Comments.find({commentOnPost:req.params.id})
            console.log(postComments);
            res.json(postComments)
    }
    catch(err){
        console.log({message:'Something went wrong with getting comments on a posts',error:err})
        return res.status(400).json(err)
    }
    }),

    getLikes: (async (req,res) => {
        try{
            const postLike =  await Likes.find({likeOnPost:req.params.id})
            console.log(postLike);
            res.json(postLike)
    }
    catch(err){
        console.log({message:'Something went wrong with getting comments on a post Like',error:err})
        return res.status(400).json(err)
    }
    }),
}
