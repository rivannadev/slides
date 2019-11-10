const Post = require("../models/post");
const validationHandler = require("../validations/validationHandler");

exports.index = async (req, res) => { //this will show the posts
    try {
        const posts = await Post.find().populate("user").sort({ createdAt: -1 }); //newer will come first
        res.send(posts)
    }catch(err){
        next(err);
    }
};

exports.show = async (req, res) => { //shows a post based in one id
    try{
      const post = await Post.findOne({
          _id: req.params.id
       }).populate("user");

       res.send(post);
      
    }catch(err){
      next(err);
    }
}

exports.store = async (req, res, next) => { //stores the post in our DB
    try{
        validationHandler(req);

        let post = new Post();
        post.description = req.body.description;
        post.image = req.file.filename;
        post.user = req.user;
        post = await post.save();

        res.send(post);
    }catch(err){
        next(err);
    }
};

exports.update = async (req, res, next) => { //changes values from a post, commonly if is text is a JSON but if it is an image its a form 
    try{
        validationHandler(req);

        let post = await Post.findById(req.params.id);
        if (!post || post.user != req.user.id) {
            const error = new Error("Wrong request");
            error.statusCode = 400;
            throw error;
        }
        post.description = req.body.description;
        post = await post.save();

        res.send(post);
    }catch(err){
        next(err);
    }
};

exports.delete = async (req, res, next) => { //deletes a post, commonly if is text is a JSON but if it is an image its a form 
    try{

        let post = await Post.findById(req.params.id);
        if (!post || post.user != req.user.id) {
            const error = new Error("Wrong request");
            error.statusCode = 400;
            throw error;
        }
        await post.delete();

        res.send({ message: "success" });
    }catch(err){
        next(err);
    }
};