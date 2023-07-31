import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    userName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      max: 20,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
      min: 10,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    date:{
      type:String,
       default:Date.now
    },
    verified:{
      type:Boolean
    },
    picturePath: {
      type: String,
      default: "",
    },
    followers: {
      type:[String],
      required:true
    },
    following: {
      type:[String],
      required:true
    },
    joinedSubs: [
      {
        id:String,
        status:String,
        date: {
          type: String,
          default: Date.now,
        },
      }
    ],
    savedposts:[String]
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
