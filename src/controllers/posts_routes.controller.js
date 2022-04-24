const controller = {};
const postsModel = require('../models/postModel.js');


controller.getPosts = async (req, res) => {
    try {
        if (!req.query.post_id) {
            const posts = await postsModel.findById(req.query.post_id)
            console.log("user posts: ",posts)
            res.status(200).json(posts)
        } else {
            const posts = await postsModel.find({owner_id: req.query.user_id})
            console.log("post with id: ", posts)
            res.status(200).json(posts)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ data: "Server internal error" })
    }
}




controller.getRecentPosts = async (req, res) => {
    try {
        const posts = await postsModel.find()

        posts.forEach((element) => {
            delete element["created_at"]
            delete element["updatedAt"]
        })
        res.status(201).json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({ data: "Server internal error" })
    }
}

controller.createPost = async (req, res) => {
    try {
        const newPost = await postsModel.create(req.body)
        res.status(201).json(newPost)

    } catch (error) {
        console.log(error)
        res.status(500).json({ data: "Server internal error" })
    }
}

module.exports = controller