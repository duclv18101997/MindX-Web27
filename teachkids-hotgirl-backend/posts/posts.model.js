const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const PostSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId, //luu tru _id
        ref: 'User',
        required: true,
    },
    imgUrl: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    view:{
        type:Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    lastModifiedAt: {
        type: Date,
    }

})

const PostModel = mongoose.model('Post', PostSchema);
module.exports = PostModel;