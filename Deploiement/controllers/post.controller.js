import Post from "../models/post.model.js"
import postValidation from "../validations/post.validation.js"

const createPost = async(req,res)=>{
    try {
        const {body} = req
        if(!body){
            return res.status(400).json({message: "no data in the request"})
        }
        const {error} = postValidation(body).postCreate
        if(error){
            return res.status(401).json(error.details[0].message)
        }
        const post = new Post(body)
        const newPost = await post.save()
        return res.status(201).json(newPost)        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const getAllPosts = async(req, res) => {
    try {
        const posts = await Post.find()
        return res.status(200).json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server Error", error: error})
    }
}

const getPostById = async(req,res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({message: "post doesn't exist"})
        }
        return res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const updatePost = async(req,res) => {
    try {
        const {body} = req
        if(!body){
            return res.status(400).json({message: "No data in the request"})
        }

        const {error} = postValidation(body).postUpdate
        if(error){
            return res.status(401).json(error.details[0].message)
        }
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, body, {new: true})
        if(!updatedPost){
            res.status(404).json({message: "post doesn't exist"})
        }
        return res.status(200).json(updatedPost)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const deletePost = async(req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        if(!post){
            return res.status(404).json({message: "post doesn't exist"})
        }
        return res.status(200).json({message: "post has been deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

export { createPost, getAllPosts, getPostById, updatePost, deletePost }