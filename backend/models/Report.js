import mongoose from "mongoose";

const reportSchema = mongoose.Schema(
    {
      reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        //required: true,
      },
      reportedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        //required: true,
      },
      Concern: String,
      postid:{
        type:String,
      },
      //reportedText: String,
      gredditid:{
        type:String,
      },
      date:{
        type:String,
         default:Date.now
      },
      ignored:{
        type:Boolean,
        default:false
      },
      isblocked:{
        type:Boolean,
        default:false
      }
    },
    { timestamps: true }
  );
  
  const Report = mongoose.model("Report", reportSchema);
  
  export default Report;