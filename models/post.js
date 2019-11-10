const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({ //the structure that will be retrieved from mongoDB using mongoose instructions
    image: { type: String, required: true},
    description: { type: String, required: true},
    user: { type: Schema.Types.ObjectId, ref: "user"},
    createdAt: { type: Date, default: Date.now() },

});

module.exports = mongoose.model('post', PostSchema);