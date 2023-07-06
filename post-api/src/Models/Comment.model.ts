import mongoose ,{ Schema } from "mongoose";

const CommentSchema = new Schema({
       user_id : {
              type : Schema.Types.ObjectId,
              ref:'User',
              required:true
       },
       post_id:{
              type : Schema.Types.ObjectId,
              ref:'Post',
              required:true 
       },
       datetime:{
              type:Date,
              required:true 
       },
       title:{
              type:String,
              trim:true,
              required:true   
       }
})

const Comment = mongoose.model('Comment' , CommentSchema)

export default Comment