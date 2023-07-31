import mongoose from "mongoose"

const subGredSchema = mongoose.Schema(
    {
        moderatorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    
        Name: {
            type: String,
            required: true,
            //trim: true,
            unique: true,
        },
        Description: {
            type: String,
            required: true,
            //trim: true,
          },
        picturePath: String,
        //userPicturePath: String,
        Tags: {
            type: Array,
            required: true,
            default: [],
        },
        Banned: {
            type: Array,
            required: true,
            default: [],
        },
        Followers: [
            {
              id: String,
              status: String,
              accepteddate: {
                type: String,
                default: "NA",
              },
              exiteddate: {
                type: String,
                default: "NA",
              },
              date: {
                type: String,
                default: Date.now,
              },
            },
        ],
        Posts: {
          type: [String],
          required: true,
        },
        creationDate: {
          type: String,
        },
        visitors: [
            {
              date: {
                type: String,
                default: Date.now,
              },
            },
          ],
        date: {
            type: String,
            default: Date.now,
        },
        reportcreations: [String],
        reportdeletions: [String],
    },
    { timestamps: true }

);

const SubGreddiit = mongoose.model("SubGreddiit", subGredSchema)

export default SubGreddiit