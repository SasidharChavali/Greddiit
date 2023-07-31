import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: {
      type: String,
      default: "",
    },
    text: String,
    picturePath: String,
    //userPicturePath: String,
    postedIn: {
      type: String,
      required: true,
    },
    upvotes: [String],
    downvotes: [String],
    comments: [
      {
        username:String,
        userid: String,
        comment: String,
      },
    ],
    isblocked:{
      type:Boolean,
      default:false
    },
    date: {
      type: String,
      default: Date.now,
    },
    creationdate:{
      type:String
    }
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
